// $("main").hide();
$("#msg_alerta").hide();
var validacao_lista = 0;
var validacao_tamanho_lista = 0;
var validacao_itens = 0;
var validacao_limpa = 0;
var validacao_footer = 0;

// botão registrar
$("#registrar").click(()=>{
    let valor_input = $("#input_lista").val();

    if(valor_input == ""){
        $("#msg_alerta").text("Nenhum item digitado")
        $("#msg_alerta").fadeIn(1000).fadeOut(1000);
        $("#input_lista").val("");
        validacao_footer = 1;
    }
    else{
        $("main").show();
        let lista = $("#lista");
        let itens = lista.html();
        lista.html(itens + `<li class='padrao_item'><div class="checkbox"></div>${valor_input}</li>`);
        switch(validacao_itens){
            case 0:
                $("footer").css("margin", "109px 0 0 0");
                validacao_itens++;
                break;
            case 1:
                $("footer").css("margin", "58px 0 0 0");
                validacao_itens++;
                break;
                
        };
        $("#input_lista").val("");
        validacao_tamanho_lista++;
    }   

    ativador_checkbox();
    if (validacao_footer == 1){
        $("footer").css("position", "absolute");
        validacao_footer--;
    }
    else{
        $("footer").css("position", "relative");
    }
});

// Botão limpar lista
$("#limpa_lista").click(()=>{
    switch(validacao_itens){
        case 0:
            $("#msg_alerta").text("Lista já está vazia");
            $("#msg_alerta").fadeIn(1000).fadeOut(1000);
            break;
        case 1:
            $("footer").css("margin", "15.9% 0 0 0");
            validacao_itens = 0;
            break;
        case 2:
            $("footer").css("margin", "15.9% 0 0 0");
            validacao_itens = 0;
            break;
    }
    $("#lista").find("li").remove();
    $("main").hide();
    $("footer").css("position", "absolute");
    validacao_tamanho_lista = 0;
    validacao_lista = 0;
});

// Botão checkbox
function ativador_checkbox(){
    let elementos = document.querySelectorAll(".checkbox");
    elementos.forEach((elemento)=>{
        elemento.addEventListener("click", ()=>{
            let cor_atual = window.getComputedStyle(elemento, null).getPropertyValue("background-color");
            if (cor_atual == "rgb(255, 255, 255)"){
                elemento.style.background = "rgb(0, 243, 243)";
                elemento.style.border = "1px solid black";
                elemento.closest(".padrao_item").setAttribute("key", 1);
                validacao_lista++;
            }
            else{
                elemento.style.background = "#fff";
                elemento.style.border = "1px solid black";
                elemento.closest(".padrao_item").setAttribute("key", 0);
                validacao_lista--;
            }
        })
    })
}

// Botão limpa:
$("#limpa").click(()=>{
    let verificar_lista = validacao_tamanho_lista - validacao_lista;
    if (validacao_tamanho_lista == 0){
        $("#msg_alerta").text("Lista já está limpa")
        $("#msg_alerta").fadeIn(1000).fadeOut(1000);
    }
    switch(verificar_lista){
        case 0:
            $("#lista").find("[key = 1]").remove();
            $("footer").css("position", "absolute");
            break;
        case 1:
            $("#lista").find("[key = 1]").remove();
            $("footer").css("position", "absolute");
            break;
    }
    $("#lista").find("[key = 1]").remove();
});
