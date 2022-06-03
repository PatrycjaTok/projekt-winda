const howManyElevators = document.querySelector("#howManyElevators");
const floor1 = document.querySelector("#floor1");
const floor2 = document.querySelector("#floor2");
const confirmButton = document.querySelector("#confirmButton");
const box1Div = document.querySelector("#box1");
let ElevatorsArrayOfObjects;
class CreatedElevator {
    constructor(id) {
        this.id = id;
        this.floorCurrent = 1;
        this.floorTarget = 0;
    }
    ;
}
//const pickup:any = (currentFloor, floorTarget) =>{
// console.log(`${currentFloor}, ${floorTarget}`);
//};
const printElevators = (floor1, floor2) => {
    var j = 0;
    ElevatorsArrayOfObjects.forEach(element => {
        let currentFloor = element.floorCurrent;
        j = j + 1;
        box1Div.innerHTML += "<br>";
        let div = document.createElement("div");
        box1Div.appendChild(div);
        div.innerHTML += `Winda-${j} <br>`;
        for (var i = floor2; i >= floor1; i--) {
            let button = document.createElement("button");
            button.setAttribute("id", `buttonElevator${j}Floor${i}`);
            button.setAttribute("class", `buttonElevator${j}`);
            button.innerHTML = `${i}`;
            div.appendChild(button);
            //button.addEventListener("click", pickup(currentFloor, i));
        }
    });
};
const createElevators = (howManyElevators, floor1, floor2) => {
    ElevatorsArrayOfObjects = [];
    for (var i = 1; i <= howManyElevators; i++) {
        let elevator = new CreatedElevator(`Elevator-${i}`);
        ElevatorsArrayOfObjects.push(elevator);
    }
    printElevators(floor1, floor2);
};
confirmButton.addEventListener("click", (event) => {
    event.preventDefault();
    box1Div.textContent = "";
    let howManyElevatorsValue = Number(howManyElevators.value);
    let floor1Value = Number(floor1.value);
    let floor2Value = Number(floor2.value);
    if (howManyElevatorsValue % 1 === 0) {
        if (howManyElevatorsValue === 0) {
            box1Div.textContent = "Wprowadź ilość wind";
        }
        else if (howManyElevatorsValue < 0) {
            box1Div.textContent = "Ujemna ilość wind - uciekły nam jakieś? :)";
        }
        else if (howManyElevatorsValue > 16) {
            box1Div.textContent = "System może obsługiwać do 16 wind";
        }
        else {
            if ((floor1Value % 1 === 0) && (floor2Value % 1 === 0)) {
                if (floor1Value < floor2Value) {
                    createElevators(howManyElevatorsValue, floor1Value, floor2Value);
                    howManyElevators.value = null;
                    floor1.value = null;
                    floor2.value = null;
                }
                else {
                    box1Div.textContent = "Wprowadź poprawnie numery pięter";
                }
            }
            else {
                box1Div.textContent = "Najniższe i najwyższe piętro musi być liczbą całkowitą";
            }
        }
    }
    else {
        box1Div.textContent = "Wprowadź liczbę całkowitą";
    }
});
