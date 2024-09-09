// Botão para realizar o sorteio
$("#btn_sorteio").click(()=>{
    var tamanho_lista = lista_participantes.length;
    var sorteio = parseInt(Math.random() * tamanho_lista);
    if(tamanho_lista === 0){
        $("#msg").removeClass("alert alert-warning").removeClass("alert alert-danger").removeClass("alert alert-success");
        $("#msg").addClass("alert alert-warning").text("Sem participantes para o sorteio!!").fadeIn(1000).fadeOut(1500);
    }else if(tamanho_lista === 1){
        $("#msg").removeClass("alert alert-warning").removeClass("alert alert-danger").removeClass("alert alert-success");
        $("#msg").addClass("alert alert-warning").text("Não é possível sortear apenas uma pessoa!!").fadeIn(1000).fadeOut(1500);
    }else{
        animacao_sorteio(sorteio);
    }
});

// Função da animação
function animacao_sorteio(valor_sorteio){
    let ganhador = lista_participantes[valor_sorteio];
    $("#visor").html("");
    $("#quadro_visor").fadeIn(1000);
    setTimeout(()=>{
        visor.innerHTML = `<p>Nosso sorteio será realizado em instantes....</p>`
    }, 1000);
    setTimeout(()=>{
        visor.innerHTML += `<p>Agradecemos a participação de todos!!!</p>`
    }, 3000);
    let animacao1 = setInterval(()=>{
            visor.innerHTML += `<img src="./src/images/flor-de-cerejeira.png" width="50px" height="50px">`;
        }, 3000);
    setTimeout(()=> clearInterval(animacao1), 15000);
    setTimeout(()=> visor.innerHTML = ``, 16000);
    setTimeout(()=> visor.innerHTML = `<p>Nosso sorteado foi...</p>`, 17000);
    let animacao2 = setInterval(()=>{
        visor.innerHTML += `<img src="./src/images/flor-de-cerejeira.png" width="50px" height="50px">`;
    }, 3000);
    setTimeout(()=> clearInterval(animacao2), 26000);
    setTimeout(()=> visor.innerHTML = ``, 27000);
    setTimeout(()=> visor.innerHTML = `<p>Parabéns.....</p>`, 29000);
    setTimeout(()=> visor.innerHTML += `<p>${ganhador}</p>`, 30000);
    let animacao3 = setInterval(()=>{
        visor.innerHTML += `<img src="./src/images/flor-de-cerejeira.png" width="50px" height="50px">`;
    }, 2000);
    setTimeout(()=> clearInterval(animacao3), 38000);
}