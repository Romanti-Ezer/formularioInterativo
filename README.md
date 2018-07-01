# Formulário Interativo
Este é um formulário interativo desenvolvido com HTML, CSS e Javascript.
O objetivo da utilização de um formulário assim é tornar o processo de entrar em contato mais agradável ao usuário.
Cada etapa consiste de apenas um campo a ser preenchido e botões de navegação (voltar ou avançar). Foi implementado também uma guia de progresso.

![Preview do formulário](/preview.png)

## Regras e comportamentos do formulário, definidas no Javascript:
* É possível navegar entre as etapas pelo guia
    * No caso de estar tentando acessar a próxima etapa, o valor da página atual precisa estar preenchido
    * Caso esteja tentando acessar uma etapa mais adiante, é necessário que a etapa anterior a esta esteja preenchida.
* É possível navegar entre as etapas pelos ícones 
* Ao pressionar "Enter" dentro de um input, o evento para ir à próxima fase é acionado
    * Caso o input atual esteja vazio (para qualquer forma de navegação), uma animação acontece e o campo fica rapidamente com bordas vermelhas
* Na 2ª etapa (e-mail) é utilizado o nome informado na 1ª etapa (nome) para se dirigir ao usuário
* As guias de progresso tem suas cores indicando o progresso gerenciadas pelo Javascript, nos diferentes modos de navegação
* Ao passar o mouse (hover) nos input ou textarea, o foco é retido no campo