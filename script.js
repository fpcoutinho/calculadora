//variaveis para armazenar os valores
let numAtual = '';
let numAnterior = '';
let valorTotal = 0.0;
let operador = '';


//Query de todos os botões pelas classes
const operadores = document.querySelectorAll('.botao-operador');
const numeros = document.querySelectorAll('.botao-numero');
const igualdade = document.querySelector('.botao-igualdade');

//Queries dos botões de função por id
const ce = document.querySelector('#CE');
const c = document.querySelector('#C');
const porcentagem = document.querySelector('#porcentagem');
const backspace = document.querySelector('#backspace');

//Query de divs do visor
const numeroAtual = document.querySelector('.numero-atual');
const numeroAnterior = document.querySelector('.numero-anterior');

//eventlistener dos números
numeros.forEach(botao => {
    botao.addEventListener('click', () => {
        if (botao.innerHTML === '.' && numAtual.includes('.')) return;
        numAtual += botao.value;
        numeroAtual.innerHTML = numAtual;
    })
})

//eventlistener dos operadores
operadores.forEach(botao => {
    botao.addEventListener('click', () => {
        if (numAtual === '') return;
        if (operador === '='){
            operador = botao.value;
            numAnterior = valorTotal;
            numeroAnterior.innerHTML = valorTotal + ' ' + operador;
            limparNumAtual();
        }
        else{
            if (numAnterior !== '') {
                valorTotal = calcular(valorTotal, parseFloat(numAtual), operador);
                operador = botao.value;
                numeroAnterior.innerHTML = valorTotal + ' ' + operador;
                numAtual = '';
                limparNumAtual();
            }else{
                numAnterior = numAtual;
                valorTotal = parseFloat(numAtual);
                operador = botao.value;
                numeroAnterior.innerHTML = valorTotal + ' ' + operador;
                limparNumAtual();
            }
        }
    })
})

//eventlisteners dos botões individuais

igualdade.addEventListener('click', () => {
    if (numAnterior === '') return;
    if (numAtual === '') numAtual = '0';
    valorTotal = calcular(valorTotal, parseFloat(numAtual), operador);
    numeroAnterior.innerHTML = numAnterior + ' ' + operador + ' ' + numAtual + ' =';
    numAnterior = valorTotal;
    numeroAtual.innerHTML = valorTotal;
    numAtual = valorTotal;
    operador = '=';
})

porcentagem.addEventListener('click', () => {
    if (numAnterior === '') {
        console.log('teste');
        return;
    }
    numAtual = valorTotal = parseFloat(numAtual) / 100;
    numeroAtual.innerHTML = valorTotal;
    numeroAnterior.innerHTML = '';
})

ce.addEventListener('click', () => {
    if(operador === '=') return;
    limparNumAtual();
})

c.addEventListener('click', () => {
    limparNumAtual();
    limparNumAnterior();
    valorTotal = 0.0;
    operador = '';
})

backspace.addEventListener('click', () => {
    if (numAtual === '') return;
    numAtual = numAtual.slice(0, -1);
    numeroAtual.innerHTML = numAtual;
})

limparNumAnterior = () => {
    numAnterior = '';
    numeroAnterior.innerHTML = '';
}

limparNumAtual = () => {
    numAtual = '';
    numeroAtual.innerHTML = 0;
}

function calcular(num1, num2, operador) {
    switch (operador) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '×':
            return num1 * num2;
        case '÷':
            return num1 / num2;
    }
}

window.onload = () => {
    numeroAtual.innerHTML = '0';
    numeroAnterior.innerHTML = '';
}