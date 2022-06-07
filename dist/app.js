const howManyElevators = document.querySelector("#howManyElevators");
const floor1 = document.querySelector("#floor1");
const floor2 = document.querySelector("#floor2");
const confirmButton = document.querySelector("#confirmButton");
const box1Div = document.querySelector("#box1");
const btnToggleStatus = document.querySelector("#btnShowStatus");
const divStatus = document.querySelector("#divStatus");
const divStatusDecription = document.querySelector("#statusDescription");
const divStatusValues = document.querySelector("#statusValues");
const divbox2 = document.querySelector("#box2");
let ElevatorsArrayOfObjects = [];
btnToggleStatus.addEventListener("click", () => { divStatus.classList.toggle("visible"); });
class CreatedElevator {
    constructor(id) {
        this.id = id;
        this.floorCurrent = 0;
        this.floorTarget = null;
        this.queuedirectionAndFrom = [];
    }
    ;
}
class CreateQueueDirectionAndFrom {
    constructor(floor, upDown) {
        this.floor = floor,
            this.upDown = upDown;
    }
    ;
}
let changeShowInput = (elShow, val) => {
    elShow.setAttribute("value", `${val}`);
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
                    setInterval(() => {
                        step();
                    }, 1000);
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
const createElevators = (howManyElevators, floor1, floor2) => {
    ElevatorsArrayOfObjects = [];
    for (var i = 1; i <= howManyElevators; i++) {
        let elevator = new CreatedElevator(i);
        ElevatorsArrayOfObjects.push(elevator);
    }
    ;
    printElevatorsButtons(floor1, floor2);
};
let elevatorStatus = () => {
    divStatusDecription.innerHTML += `<b>id windy | Obecne piętro | Docelowe piętro </b>`;
};
elevatorStatus();
const printElevatorsButtons = (floor1, floor2) => {
    var j = 0;
    ElevatorsArrayOfObjects.forEach(element => {
        j = j + 1;
        let div4 = document.createElement("div");
        box1Div.appendChild(div4);
        div4.innerHTML += "<br>";
        div4.innerHTML += `Winda-${j} <br>`;
        let divShowDing = document.createElement("div");
        divShowDing.setAttribute("id", `divShowDing${j}`);
        divShowDing.setAttribute("class", `divShowDing`);
        divShowDing.style.width = "50px";
        divShowDing.style.height = "20px";
        div4.appendChild(divShowDing);
        let div = document.createElement("div");
        div.setAttribute("class", `div2Elevator`);
        box1Div.appendChild(div);
        let div2 = document.createElement("div");
        div2.setAttribute("class", `div2ButtonsElevators`);
        div.appendChild(div2);
        for (var i = floor2; i >= floor1; i--) {
            let numI = i;
            let button = document.createElement("button");
            button.setAttribute("id", `buttonElevator${j}Floor${numI}`);
            button.setAttribute("class", `buttonElevator${j} buttonsElevators`);
            button.setAttribute("value", `${numI}`);
            button.style.background = "yellow";
            button.innerHTML = `${numI}`;
            button.addEventListener("click", () => {
                let upDownDirection;
                if (element.floorCurrent < numI) {
                    upDownDirection = "up";
                }
                else {
                    upDownDirection = "down";
                }
                let FromWhereAndDirection = new CreateQueueDirectionAndFrom(numI, upDownDirection);
                element.queuedirectionAndFrom.push(FromWhereAndDirection);
            });
            div2.appendChild(button);
        }
        let div3 = document.createElement("div");
        div3.setAttribute("class", `div3BtnUpDown`);
        div.appendChild(div3);
        for (var i = floor2; i >= floor1; i--) {
            let numI = i;
            let div5 = document.createElement("div");
            div5.setAttribute("class", `div5UpDownButtons`);
            let buttonUp = document.createElement("button");
            buttonUp.setAttribute("id", `buttonUpElevator${numI}floor${numI}`);
            buttonUp.setAttribute("class", `buttonUp`);
            buttonUp.setAttribute("value", `up`);
            buttonUp.innerHTML = `${numI}-w górę`;
            buttonUp.addEventListener("click", () => {
                let FromWhereAndDirection = new CreateQueueDirectionAndFrom(numI, buttonUp.value);
                element.queuedirectionAndFrom.push(FromWhereAndDirection);
            });
            div5.appendChild(buttonUp);
            let buttonDown = document.createElement("button");
            buttonDown.setAttribute("id", `buttonDownElevator${j}floor${numI}`);
            buttonDown.setAttribute("class", `buttonDown`);
            buttonDown.setAttribute("value", `down`);
            buttonDown.innerHTML = `${numI}-w dół`;
            buttonDown.addEventListener("click", () => {
                let FromWhereAndDirection = new CreateQueueDirectionAndFrom(numI, buttonDown.value);
                element.queuedirectionAndFrom.push(FromWhereAndDirection);
            });
            div5.appendChild(buttonDown);
            div3.appendChild(div5);
        }
    });
};
let optionalStop = (element, direction) => {
    let elementToRemove = [];
    let divShowDing = document.querySelector(`#divShowDing${element.id}`);
    element.queuedirectionAndFrom.forEach(el => {
        if (element.floorCurrent === el.floor && el.upDown === direction) {
            elementToRemove.push(el);
        }
    });
    elementToRemove.forEach(elRemove => {
        divShowDing.innerHTML = '';
        element.queuedirectionAndFrom = element.queuedirectionAndFrom.filter(obj => { return obj !== elRemove; });
        console.log('ding!');
        divShowDing.innerHTML = 'ding!';
    });
};
const step = () => {
    ElevatorsArrayOfObjects.forEach(element => {
        let divShowDing = document.querySelector(`#divShowDing${element.id}`);
        if ((element.queuedirectionAndFrom.length > 0) && (element.floorTarget === null)) {
            element.floorTarget = element.queuedirectionAndFrom.shift().floor;
        }
        if (element.floorTarget !== null) {
            divShowDing.innerHTML = '';
            if (element.floorCurrent < element.floorTarget) {
                element.floorCurrent += 1;
                console.log(element.floorCurrent);
                optionalStop(element, "up");
            }
            else if (element.floorCurrent > element.floorTarget) {
                element.floorCurrent -= 1;
                console.log(element.floorCurrent);
                optionalStop(element, "down");
            }
            if (element.floorCurrent === element.floorTarget) {
                element.floorTarget = null;
                console.log('ding!');
                divShowDing.innerHTML = 'ding!';
            }
        }
        updateElevatorStatus();
        updateUI(element);
    });
};
let updateUI = (element) => {
    let buttonsAll = document.querySelectorAll(`.buttonElevator${element.id}`);
    buttonsAll.forEach(buttonElement => {
        buttonElement.style.background = "yellow";
    });
    if (element.queuedirectionAndFrom.length > 0) {
        element.queuedirectionAndFrom.forEach(el => {
            let btnNum = el.floor;
            let buttonChosen = document.querySelector(`#buttonElevator${element.id}Floor${btnNum}`);
            buttonChosen.style.background = "#51cea4";
        });
    }
    if (element.floorTarget !== null) {
        let buttonDirection = document.querySelector(`#buttonElevator${element.id}Floor${element.floorTarget}`);
        buttonDirection.style.background = "#51cea4";
    }
    let button = document.querySelector(`#buttonElevator${element.id}Floor${element.floorCurrent}`);
    button.style.background = "green";
};
let updateElevatorStatus = () => {
    let toPrint = '';
    ElevatorsArrayOfObjects.forEach(el => {
        let divStatusEl = document.createElement("div");
        divStatusEl.setAttribute("class", `divStatusEl`);
        toPrint += `${el.id} | ${el.floorCurrent} | ${el.floorTarget} <br>`;
    });
    divStatusValues.innerHTML = `${toPrint}`;
};
