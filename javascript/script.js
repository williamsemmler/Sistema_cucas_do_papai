function abrirJanela() {
    document.getElementById('maisInformacoes').style.display = "block";
}
function fecharJanela() {
    document.getElementById('maisInformacoes').style.display = "none";
}

function logoff () {
    window.location.href = "../index.html"
}
function mostrarResultado() {
    let telaSucesso = document.createElement("p");
    telaSucesso.style.backgroundColor = "green";
    telaSucesso.innerText = "Pedido lançado com sucesso!";

    document.getElementById("telaSucesso").appendChild(telaSucesso);

}

function calcularQtdTotal() {
    let cucaSimples = parseInt(document.getElementById("cucaSimples").value) || 0;
    let cucaBanana = parseInt(document.getElementById("cucaBanana").value) || 0;
    let cucaChocolate = parseInt(document.getElementById("cucaChocolate").value) || 0;
    let cucaStikadinho = parseInt(document.getElementById("cucaStikadinho").value) || 0;
    let cucaDoceLeite = parseInt(document.getElementById("cucaDoceLeite").value) || 0;
    let cucaGoiabada = parseInt(document.getElementById("cucaGoiabada").value) || 0;

    let total = cucaSimples + cucaBanana + cucaChocolate + cucaStikadinho + cucaDoceLeite + cucaGoiabada;

    document.getElementById("totalCucas").value = total;

    let precoCucas = new XMLHttpRequest ();
    precoCucas.open('GET', "../php/recuperarBD.php");

    // Evento disparado quando a requisição é concluída
    precoCucas.onload = function() {
        if (precoCucas.status >= 200 && precoCucas.status < 400) {
            let dados = JSON.parse(precoCucas.responseText);
            let precoCucaSimples = dados[0]['preco'];
            let precoCucaBanana= dados[1]['preco'];
            let precoCucaChocolate= dados[2]['preco'];
            let precoCucaStikadinho= dados[3]['preco'];
            let precoCucaDoceLeite= dados[4]['preco'];
            let precoCucaGoiabada= dados[5]['preco'];

            let valorCucaSimples = cucaSimples * precoCucaSimples;
            let valorCucaBanana = cucaBanana * precoCucaBanana;
            let valorCucaChocolate = cucaChocolate * precoCucaChocolate;
            let valorCucaStikadinho = cucaStikadinho * precoCucaStikadinho;
            let valorCucaDoceLeite = cucaDoceLeite * precoCucaDoceLeite;
            let valorCucacucaGoiabada = cucaGoiabada * precoCucaGoiabada;

            let valorTotal = valorCucaSimples + valorCucaBanana + valorCucaChocolate + valorCucaStikadinho + valorCucaDoceLeite + valorCucacucaGoiabada;

            document.getElementById("valorTotal").value = valorTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});


        } else {
            console.log("erro")
        }
    };
    
    precoCucas.send();
}

function requisitarPagina (url) {
    if (document.getElementById("mensagemSucesso")) {
        document.getElementById ("mensagemSucesso").style.display = "none";
    }

    let pagina = new XMLHttpRequest ();
    pagina.open('GET', url);

    // Evento disparado quando a requisição é concluída
    pagina.onload = function() {
        if (pagina.status >= 200 && pagina.status < 400) {
            document.getElementById("telaOpcoes").innerHTML = pagina.responseText;
        } else {
            document.getElementById("telaOpcoes").innerText = 'Erro na requisição: ' + pagina.statusText;
        }
    };
    
    pagina.onerror = function() {
        console.error('Erro de conexão.');
    };
    
    pagina.send();

}