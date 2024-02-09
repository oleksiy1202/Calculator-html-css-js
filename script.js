let display = document.getElementById('display')
let historyContainer = document.getElementById('history')
const clearStorageButton = document.getElementById('clearStorage')
let history = JSON.parse(localStorage.getItem('calculatorHistory')) || []

function clickButton(value) {
    display.value += value
}

function clearButton() {
    display.value = '';
}

function selectOperator(operator) {
    let lastChar = display.value.slice(-1);
    if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
        display.value = display.value.slice(0, -1) + operator;
    } else {
        display.value += operator;
    }
}

function calculate() {
    try {
        const result = Function('"use strict";return (' + display.value + ')')();
        display.value = result;
        history.push({ expression: display.value, result });
        localStorage.setItem('calculatorHistory', JSON.stringify(history));
        displayHistory();
    } catch (error) {
        display.value = 'Error';
    }
}

function displayHistory() {
    historyContainer.innerHTML = '';
    for (let entry of history) {
        let entryElement = document.createElement('div');
        entryElement.textContent = `${entry.expression} = ${entry.result}`;
        historyContainer.appendChild(entryElement);
    }
}

displayHistory()

clearStorageButton.addEventListener('click', function () {
    localStorage.clear()
    location.reload()
})

function createFirework() {
    const fireworksContainer = document.getElementById('fireworks')
    for (let i = 0; i < 100; i++) {
        const firework = document.createElement('button')
        firework.classList.add('firework')
        firework.style.left = `${Math.random() * 100}%`
        firework.style.top = `${Math.random() * 100}%`
        firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`
        firework.style.width = `${Math.random() * 10 + 10}px`
        firework.style.height = firework.style.width
        firework.style.animationDelay = `${i * 1}s`
        fireworksContainer.appendChild(firework)
    }
}

window.onload = createFirework;


