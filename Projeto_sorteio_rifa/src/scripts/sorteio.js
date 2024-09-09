// Botão para realizar o sorteio
$("#btn_sorteio").click(()=>{
    var tamanho_lista = lista_participantes.length;
    var sorteio = parseInt(Math.random() * tamanho_lista);
    if(tamanho_lista === 0){
        msg_animation(mensagens.warning_participante);
    }else if(tamanho_lista === 1){
        msg_animation(mensagens.warning_quantidade);
    }else{
        animacao_sorteio(sorteio);
    }
});

// Botão para validação do nome
$(document).ready(function(){
    $("#btn_add_participante").click(function(){
        var name = $("#nome_participante").val();
        if(validateName(name)){
            msg_animation(mensagens.success);
            $("#nome_participante").val("");
            separacaoNome(name);
            atualizaLista(valida_lista);
        }else if(name === ""){
            msg_animation(mensagens.warning);
            $("#nome_participante").val("");
        }else{
            msg_animation(mensagens.danger);
            $("#nome_participante").val("");
        }
    });
});

// Botão para mostrar a lista
// criar uma função para a animação da lista
// estudar uma forma de colocar uma texto nos botões fecha lista e limpa lista, quando colocar o mouse sobre os botões aparecer essa mensagem
// quando tudo estiver pronto realizar os testes!!
$("#btn_view_participante").click(()=>{
    let tamanho_lista = lista_participantes.length;
    mostarLista(tamanho_lista);
});
