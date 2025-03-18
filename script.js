const display = document.querySelector(".display");
const clearButton = document.querySelector(".clear");
const digitButtons = document.querySelectorAll(".digit");

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operator(a, b, op) {
    if (op === "+") {
        return add(a, b);
    } else if (op === "-") {
        return subtract(a, b);
    } else if (op === "x") {
        return multiply(a, b);
    } else if (op === "/") {
        return divide(a, b);
    } else {
        return "INVALID OPERATOR";
    }
}

clearButton.addEventListener("click", () => {
    display.textContent = "";
})

for (let i = 0; i < digitButtons.length; i++) {
    digitButtons[i].addEventListener("click", (e) => {
        display.textContent += e.target.closest("button").textContent;
    })
}
