const display = document.querySelector(".display");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector(".equals");
const operatorButtons = document.querySelectorAll(".operator");
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
        display.textContent = "INVALID OPERATOR";
        return;
    }
}

function evaluate() {
    // If display is empty or has hanging operator, do nothing
    if (display.textContent.length === 0 || display.textContent.slice(-1) === " ") {
        return;
    }

    // Split display into array of form ["a", "<operator>", "b", ...]
    let expr = display.textContent.split(" ");

    while (expr.length > 1) {
        // Evaluate display expression by BODMAS
        if (expr.includes("/")) {
            // Find index of operator then use to find a, b to evaluate expression
            const opIdx = expr.indexOf("/");
            const result = operator(Number(expr[opIdx - 1]), Number(expr[opIdx + 1]), "/");
            // Then replace ["a", "<operator>", "c"] with ["<result>"]
            expr.splice(opIdx - 1, 3, result);
        } else if (expr.includes("x")) {
            const opIdx = expr.indexOf("x");
            const result = operator(Number(expr[opIdx - 1]), Number(expr[opIdx + 1]), "x");
            expr.splice(opIdx - 1, 3, result);
        } else if (expr.includes("+")) {
            const opIdx = expr.indexOf("+");
            const result = operator(Number(expr[opIdx - 1]), Number(expr[opIdx + 1]), "+");
            expr.splice(opIdx - 1, 3, result);
        } else if (expr.includes("-")) {
            const opIdx = expr.indexOf("-");
            const result = operator(Number(expr[opIdx - 1]), Number(expr[opIdx + 1]), "-");
            expr.splice(opIdx - 1, 3, result);
        } else {
            display.textContent("ERROR");
            return;
        }
    }

    // Display result rounded to 2 d.p
    display.textContent = Math.round(expr[0] * 100) / 100;    

}

clearButton.addEventListener("click", () => {
    display.textContent = "";
})

equalsButton.addEventListener("click", evaluate);

for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener("click", (e) => {
        // Only add operator to display if there isn't already an operator added
        if (display.textContent.length !== 0 && display.textContent.slice(-1) !== " ") {
            display.textContent += ` ${e.target.closest("button").textContent} `;
        } 
    })
}

for (let i = 0; i < digitButtons.length; i++) {
    digitButtons[i].addEventListener("click", (e) => {
        display.textContent += e.target.closest("button").textContent;
    })
}
