const howManyElevators = document.querySelector("#howManyElevators");
const confirmButton = document.querySelector("#confirmButton");
const box1Div = document.querySelector("#box1");
let doSymulation = false;
confirmButton.addEventListener("click", (event) => {
    event.preventDefault();
    box1Div.textContent = "";
    const howManyElevatorsValue = Number(howManyElevators.value);
    if (howManyElevatorsValue % 1 === 0) {
        if (howManyElevatorsValue === 0) {
            box1Div.textContent = "wprowadź ilość wind";
        }
        else if (howManyElevatorsValue < 0) {
            box1Div.textContent = "ujemna ilość wind - uciekły nam jakieś? :)";
        }
        else if (howManyElevatorsValue > 16) {
            box1Div.textContent = "system może obsługiwać do 16 wind";
        }
        else {
            doSymulation = true;
            elevatorSystem(howManyElevatorsValue, doSymulation);
        }
    }
    else {
        box1Div.textContent = "wprowadź liczbę całkowitą";
    }
});
const elevatorSystem = (howManyElevators, doSymulation) => {
    if (doSymulation === true) {
        console.log("co dalej");
    }
};
