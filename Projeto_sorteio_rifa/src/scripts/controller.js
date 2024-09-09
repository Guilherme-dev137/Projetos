// Lugar onde os nomes serão armazenados
var lista_participantes = [];

// Variáveis:
// Variável que acrescenta o número dos nomes na lista
var numero = 1;

// Variável que colocar o visor dos nomes em uma variável
const visor = document.getElementById("visor");

// Variáveis para animação das mensagens
var mensagens = {
    success: "ok",
    warning: "atencao",
    warning_participante: "atencao_participantes",
    warning_quantidade: "atencao_quantidade",
    warning_vazio: "atencao_vazio",
    danger: "perigo"
};

// Variáveis para controlar o slice
var valor_inicio = 0;
var valor_fim = 1;

// Variáveis para armazenar o nome e o nome que irá para a lista
var nome = "";
var nome_para_lista = "";

// Variável para validar a lista (0 = lista escondida // 1 = lista exibida)
var valida_lista = 0;

// Variável para enumerar os participantes cadastrados (utilizada na função "atualizaLista")
let numero_atualiza = 1;

// Função da animação das mensagens
function msg_animation(status){
    switch(status){
        case "ok":
            $("#msg").removeClass("alert alert-warning").removeClass("alert alert-danger");
            $("#msg").addClass("alert alert-success").text("Participante Registrado!!").fadeIn(1000).fadeOut(1500);
            break;
        case "atencao":
            $("#msg").removeClass("alert alert-warning").removeClass("alert alert-danger").removeClass("alert alert-success");
            $("#msg").addClass("alert alert-warning").text("Nenhuma pessoa cadastrada!!").fadeIn(1000).fadeOut(1500);
            break;
        case "atencao_participantes":
            $("#msg").removeClass("alert alert-warning").removeClass("alert alert-danger").removeClass("alert alert-success");
            $("#msg").addClass("alert alert-warning").text("Sem participantes para o sorteio!!").fadeIn(1000).fadeOut(1500);
            break;
        case "atencao_quantidade":
            $("#msg").removeClass("alert alert-warning").removeClass("alert alert-danger").removeClass("alert alert-success");
            $("#msg").addClass("alert alert-warning").text("Não é possível sortear apenas uma pessoa!!").fadeIn(1000).fadeOut(1500);
            break;
        case "atencao_vazio":
            $("#msg").removeClass("alert alert-warning").removeClass("alert alert-danger").removeClass("alert alert-success");
            $("#msg").addClass("alert alert-warning").text("Lista encontra-se vazia!!").fadeIn(1000).fadeOut(1500);
            break;
        case "perigo":
            $("#msg").removeClass("alert alert-warning").removeClass("alert alert-success");
            $("#msg").addClass("alert alert-danger").text("Nome não contem caracter especial!!").fadeIn(1000).fadeOut(1500);
            break;
    }
};

// Função para validar nomes inseridos
function validateName(nome){
    let re = /[a-zA-Zá-úÁ-Ú]/
    return re.test(nome);
};

// Função para separar o nome
function separacaoNome(nome_total){
    nome_total += " ";
    for(let i = 0; i <= nome_total.length; i++){
        nome += nome_total.slice(valor_inicio, valor_fim);
        if(nome !== " "){
            nome_para_lista += nome;
            nome = "";
        } else{
            nome = "";
            validarEspaco(nome_para_lista);
        };
        valor_inicio++;
        valor_fim++;
        resetarValores(i - nome_total.length);
    };
}

// Função para validar o espaço
function validarEspaco (space){
    if(space === ""){
        console.log("nome para lista está vazio")
    }else{
        addLista(nome_para_lista);
        nome_para_lista = "";
    }
};

// Função para resetar os valores das variáveis valor_inicio e valor_fim
function resetarValores(subtracao){
    if(subtracao === 0){
        valor_inicio = 0;
        valor_fim = 1;
    };
};

// Função para mostrar a lista
function mostarLista(lista){
    if(lista === 0){
        msg_animation(mensagens.warning_vazio);
    }else{
        valida_lista = 1;
        visor.innerHTML = ``;
        visor.innerHTML = `<h2 id="texto_topo_lista">Lista de Participantes:</h2>`;
        visor.innerHTML += `<button id="botao_esconde_lista" fechaLista class="btn btn-primary m-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg></button>`;
        visor.innerHTML += `<button id="botao_limpa_lista" limpaLista class="btn btn-primary m-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser" viewBox="0 0 16 16"><path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"/></svg></button>`;
        setTimeout(()=>{
            $("[fechaLista]").click(()=>{
                $("#quadro_visor").fadeOut();
                numero = 1;
                valida_lista = 0;
            })
        }, 1000)
        setTimeout(()=>{
            $("[limpaLista]").click(()=>{
                visor.innerHTML = ``;
                visor.innerHTML = `<h2 id="texto_topo_lista">Lista de Participantes:</h2>`;
                visor.innerHTML += `<button id="botao_esconde_lista" fechaLista class="btn btn-primary m-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg></button>`;
                visor.innerHTML += `<button id="botao_limpa_lista" limpaLista class="btn btn-primary m-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser" viewBox="0 0 16 16"><path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"/></svg></button>`;
                setTimeout(()=>{
                    $("[fechaLista]").click(()=>{
                        $("#quadro_visor").fadeOut();
                        numero = 1;
                        valida_lista = 0;
                    })
                }, 1000)
                lista_participantes = [];
                numero = 1;
            })
        }, 1000);
        $("#quadro_visor").fadeIn();
        lista_participantes.forEach((element)=>{
            if(numero === 1){
                visor.innerHTML += `<p style="display:inline; margin-right:20px;">${numero}. ${element}</p>`;
                numero++;
            }else{
                visor.innerHTML += `<p>${numero}. ${element}</p>`;
                numero++;
            }
        });
    }
};

// Função para atualizar a lista quando a lista estiver sendo exibida
function atualizaLista(val_lista){
    if(val_lista === 1){
        numero_atualiza = 1;
        visor.innerHTML = ``;
        visor.innerHTML = `<h2 id="texto_topo_lista">Lista de Participantes:</h2>`;
        visor.innerHTML += `<button id="botao_esconde_lista" fechaLista class="btn btn-primary m-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg></button>`;
        visor.innerHTML += `<button id="botao_limpa_lista" limpaLista class="btn btn-primary m-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser" viewBox="0 0 16 16"><path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"/></svg></button>`;
        setTimeout(()=>{
            $("[fechaLista]").click(()=>{
                $("#quadro_visor").fadeOut();
                numero = 1;
                valida_lista = 0;
            })
        }, 1000);
        setTimeout(()=>{
            $("[limpaLista]").click(()=>{
                visor.innerHTML = ``;
                visor.innerHTML = `<h2 id="texto_topo_lista">Lista de Participantes:</h2>`;
                visor.innerHTML += `<button id="botao_esconde_lista" fechaLista class="btn btn-primary m-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg></button>`;
                visor.innerHTML += `<button id="botao_limpa_lista" limpaLista class="btn btn-primary m-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser" viewBox="0 0 16 16"><path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"/></svg></button>`;
                setTimeout(()=>{
                    $("[fechaLista]").click(()=>{
                        $("#quadro_visor").fadeOut();
                        numero = 1;
                        valida_lista = 0;
                    })
                }, 1000)
                lista_participantes = [];
                numero = 1;
            })
        }, 1000);
        $("#quadro_visor").fadeIn();
        lista_participantes.forEach((element)=>{
            if(numero_atualiza === 1){
                visor.innerHTML += `<p style="display:inline; margin-right:20px;">${numero_atualiza}. ${element}</p>`;
                numero_atualiza++;
            }else{
                visor.innerHTML += `<p>${numero_atualiza}. ${element}</p>`;
                numero_atualiza++;
                console.log(numero_atualiza);
            }
        });
    }else{
        console.log("lista não está sendo exibida");
    };
}

// Funções da página (função adiciona o participanete ao array, para depois ser sorteado)
function addLista(nome_participante){
    lista_participantes.push(nome_participante);
    return lista_participantes;
};

// Função da animação
function animacao_sorteio(valor_sorteio){
    let ganhador = lista_participantes[valor_sorteio];
    $("#visor").html("");
    $("#quadro_visor").fadeIn(1000);
    estrelasAnimacao();
    visor.innerHTML += `<h1 style="position: absolute; top: 80px; left: 50px;">Realização do sortei em instantes...</h1>`;
    setTimeout(()=>{
        estrelasAnimacao();
        visor.innerHTML += `<h1 style="position: absolute; top: 80px; left: 30px;">Agradecemos a participação de todos!!!</h1>`;
    }, 3000);
    setTimeout(()=>{
        estrelasAnimacao();
        visor.innerHTML += `<h1 style="position: absolute; top: 80px; left: 120px;">Nosso sorteado foi...</h1>`;
    }, 6000);
    setTimeout(()=>{
        estrelasAnimacao();
        visor.innerHTML += `<h1 style="position: absolute; top: 80px; left: 180px;">Parabéns....</h1>`;
    }, 9000);
    setTimeout(()=>{
        estrelasAnimacao();
        visor.innerHTML += `<h1 style="position: absolute; top: 80px; left:190px; font-weight: bold; text-transform: capitalize;">${ganhador}</h1>`;
        visor.innerHTML += `<button id="reboot" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/></svg></button>`;
    }, 12000);
    setTimeout(()=>{
        $("#reboot").click(()=>{
            location.reload();
        })
    }, 13000);
}

// Função com as animações das estrelas
function estrelasAnimacao(){
    visor.innerHTML = `<div style="max-width: 100%;" class="d-flex justify-content-between"><img class="estrelaCima" src="./src/images/estrela.png" width="50px" height="50px"><img class="estrelaCima" src="./src/images/estrela.png" width="50px" height="50px"></div>`;
    visor.innerHTML += `<div style="max-width: 100%;" class="d-flex justify-content-between"><img class="estrelaBaixo" src="./src/images/estrela.png" width="50px" height="50px"><img class="estrelaBaixo" src="./src/images/estrela.png" width="50px" height="50px"></div>`;
}
