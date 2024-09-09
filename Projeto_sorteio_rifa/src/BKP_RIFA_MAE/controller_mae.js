// Lugar onde os nomes serão armazenados
var lista_participantes = [];

// Variáveis
var numero = 1;
const visor = document.getElementById("visor");

// Botão para validação do nome
$(document).ready(function(){
    $("#btn_add_participante").click(function(){
        var name = $("#nome_participante").val();
        if(validateName(name)){
            $("#msg").removeClass("alert alert-warning").removeClass("alert alert-danger");
            $("#msg").addClass("alert alert-success").text("Participante Registrado!!").fadeIn(1000).fadeOut(1500);
            $("#nome_participante").val("");
            add_lista(name);
        }else if(name === ""){
            $("#msg").removeClass("alert alert-danger").removeClass("alert alert-success");
            $("#msg").addClass("alert alert-warning").text("Informe o nome do participante!!").fadeIn(1000).fadeOut(1500);
            $("#nome_participante").val("");
        }else{
            $("#msg").removeClass("alert alert-warning").removeClass("alert alert-success");
            $("#msg").addClass("alert alert-danger").text("Nome não contem caracter especial!!").fadeIn(1000).fadeOut(1500);
            $("#nome_participante").val("");
        }
    });
    function validateName(nome){
        let re = /[a-zA-Zá-úÁ-Ú]/
        return re.test(nome);
    }
});

// Botão para mostrar a lista
$("#btn_view_participante").click(()=>{
    let tamanho_lista = lista_participantes.length;
    if(tamanho_lista === 0){
        $("#msg").removeClass("alert alert-warning").removeClass("alert alert-danger").removeClass("alert alert-success");
        $("#msg").addClass("alert alert-warning").text("Lista encontra-se vazia!!").fadeIn(1000).fadeOut(1500);
    }else{
        $("#visor").html("");
        $("#visor").html(`<button id="fecha_lista" class="btn btn-primary position-absolute top-0 end-0 m-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg></button>`);
        setTimeout(()=>{
            $("#fecha_lista").click(()=>{
                $("#quadro_visor").fadeOut();
                numero = 1;
            })
        }, 1000)
        $("#quadro_visor").fadeIn();
        lista_participantes.forEach((element)=>{
            visor.innerHTML += `<p>${numero}. ${element}</p>`;
            numero++;
        })
    }
});

// Funções da página
function add_lista(nome_participante){
    lista_participantes.push(nome_participante);
    return lista_participantes;
}
