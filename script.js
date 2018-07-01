window.onload = function() {
    var formFields = document.getElementsByClassName("form-field");
    

    // Mudas o input pelo guia
    function changeField(event) {
        
        var devoAtivar = document.getElementsByClassName("form-field")[event.target.id];
        var ativoAtualmente = document.querySelectorAll(".form-field.active")[0];

        // Se 1 - Não for o último (Pois ele não tem input/textarea) | E | 2 - Se o form não tiver valor(objetivo principal é verificar isso) | E | 3 - O elemento selecionado para trocar é maior que o atual (Pois se for pra voltar não tem problema ficar vazio)
        if (!ativoAtualmente.classList.contains("last") && !ativoAtualmente.querySelectorAll('input, textarea')[0].value && event.target.id > parseInt(ativoAtualmente.id)) {

            ativoAtualmente.querySelectorAll('input, textarea')[0].classList.add("hvr-wobble-horizontal");
            setTimeout(() => { ativoAtualmente.querySelectorAll('input, textarea')[0].classList.remove("hvr-wobble-horizontal") }, 1000);
            return false;
        } 

        // Se 1 - O elemento selecionado para trocar é maior que o atual + 1 (Então tá querendo pular fases) | E | O valor do input/textarea antes desse elemento não está preenchido (Se quer pular, o valor da fase anterior deve estar preenchido!)
        else if (event.target.id > parseInt(ativoAtualmente.id)+1 && !document.getElementsByClassName("form-field")[event.target.id - 1].querySelectorAll('input, textarea')[0].value) {
            ativoAtualmente.querySelectorAll('.nav')[0].classList.add("hvr-wobble-horizontal");
            setTimeout(() => { ativoAtualmente.querySelectorAll('.nav')[0].classList.remove("hvr-wobble-horizontal"); }, 1000);
            return false;
        }

        // Se tudo certo
        else {
            ativoAtualmente.classList.remove("active");

            var inputTarget = event.target.id;
            var proximo = document.querySelectorAll(".form-field")[inputTarget];
            proximo.classList.add("active");    

            if (inputTarget == 1){
                pegarNome();
            } 
            // Dar o submit se for no último passo
            else if (inputTarget == 4) {
                //document.getElementById("formContato").submit();
            }

            controlarGuias(inputTarget);
            pegarOFoco();
        }
    }

    // Ir para o próximo input
    function nextField() {
        var ativoAtualmente = document.querySelectorAll(".form-field.active")[0];
        
        // Se o valor da fase atual estiver vazio
        if (!ativoAtualmente.querySelectorAll('input, textarea')[0].value) {
            ativoAtualmente.querySelectorAll('input, textarea')[0].classList.add("hvr-wobble-horizontal");
            setTimeout(() => { ativoAtualmente.querySelectorAll('input, textarea')[0].classList.remove("hvr-wobble-horizontal") }, 1000);
            return false;
        } 

        // Se estiver preenchido
        else {
            ativoAtualmente.classList.remove("active");

            var posicaoProximo = parseInt(ativoAtualmente.id)+1;
            var proximo = document.querySelectorAll(".form-field")[posicaoProximo];
            proximo.classList.add("active");    

            if (posicaoProximo == 1){
                pegarNome();
            } 
            // Dar o submit se for no último passo
            else if (posicaoProximo == 4) {
                //document.getElementById("formContato").submit();
            }

            controlarGuias(posicaoProximo);
            pegarOFoco();
        }
    }

    // Voltar para o input anteior
    function previousField() {
        var ativoAtualmente = document.querySelectorAll(".form-field.active")[0];
        ativoAtualmente.classList.remove("active");

        // Aqui ele simplemente volta, não precisa ter valor na tela atual!
        var posicaoAnterior = parseInt(ativoAtualmente.id)-1;
        var proximo = document.querySelectorAll(".form-field")[posicaoAnterior];
        proximo.classList.add("active");

        if (posicaoAnterior == 1){
            pegarNome();
        }

        controlarGuias(posicaoAnterior);
        pegarOFoco();
    }

    // Pegar o nome do cliente
    function pegarNome() {
        var ondeMostraONome = document.getElementById("nome-cliente");
        var ondePegaONome = document.getElementById("nome");

        if (ondePegaONome.value) {
            ondeMostraONome.innerText = ondePegaONome.value + ",";
        } else {
            ondeMostraONome.innerText = "Por onde devemos contatar?";
        }
    }

    // Controlar as guias
    function controlarGuias(targetMostrar) {
        var guias = document.querySelectorAll(".container-contato .progressbar li");
        var devoMostrar = guias[targetMostrar];
        devoMostrar.classList.add("active");
        // Desativando todos os guias a frente
        for(let i = parseInt(targetMostrar)+1; guias[i]; i++) {
            if (guias[i].classList.contains("active")) {
                guias[i].classList.remove("active");
            }
        }

        // Ativando todos os guias atrás
        for(let i = parseInt(targetMostrar)-1; guias[i]; i--) {
            if (!guias[i].classList.contains("active")) {
                guias[i].classList.add("active");
            }
        }
    }

    // Controlar os inputs caso enter
    function keyPressOnInput(e) {
        if(e.keyCode == 13) {
            nextField();
        }
    }

    function pegarOFoco() {
        var inputAtual = document.querySelectorAll(".form-field.active input, .form-field.active textarea")[0];
        inputAtual.focus();
    }

    // Ligando a função de click ao guia
    var options = document.querySelectorAll(".container-contato .progressbar li");

    for (let i = 0; i < options.length; i ++) {
        options[i].onclick = changeField;
    }

    // Ligando a função next ao click no next
    var nexts = document.querySelectorAll(".container-contato .fa-chevron-right");

    for (let i = 0; i < nexts.length; i ++) {
        nexts[i].onclick = nextField;
    }

    // Ligando a função next ao click no next
    var previous = document.querySelectorAll(".container-contato .fa-chevron-left");

    for (let i = 0; i < previous.length; i ++) {
        previous[i].onclick = previousField;
    }

    // Ligando a função de next ao keypress == enter no input | E a função de pegar o foco caso passar o mouse
    var input = document.querySelectorAll(".form-field input, .form-field textarea");

    for (let i = 0; i < input.length; i ++) {
        input[i].onkeypress = keyPressOnInput;
        if (input.length - 1 == i) {
            input[i].onkeypress = undefined;    
        }
        input[i].onmouseover = pegarOFoco;
    }

    // Para uma implementação completa, é necessário ainda implementar o submit do dados do formulário
};

