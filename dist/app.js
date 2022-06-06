const howManyElevators = document.querySelector("#howManyElevators");
const floor1 = document.querySelector("#floor1");
const floor2 = document.querySelector("#floor2");
const confirmButton = document.querySelector("#confirmButton");
const box1Div = document.querySelector("#box1");
const btnToggleStatus = document.querySelector("#btnShowStatus");
const divStatus = document.querySelector("#divStatus");
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
const printElevatorsButtons = (floor1, floor2) => {
    var j = 0;
    ElevatorsArrayOfObjects.forEach(element => {
        divStatus.innerHTML += `id windy: ${element.id}
        | Obecne piętro: ${element.floorCurrent} 
        | Docelowe piętro: ${element.floorTarget} <br>`;
    });
    ElevatorsArrayOfObjects.forEach(element => {
        let objectElevator = element;
        j = j + 1;
        let div4 = document.createElement("div");
        box1Div.appendChild(div4);
        div4.innerHTML += "<br>";
        div4.innerHTML += `Winda-${j} <br>`;
        //let DivShowFloor: HTMLDivElement = document.createElement("div");
        //DivShowFloor.setAttribute("id", `divShowFloorEl${j}`);
        //DivShowFloor.setAttribute("class", `divShowFloorElevator${j}`);
        //DivShowFloor.style.width = "25px";
        //DivShowFloor.style.height = "20px";
        //div4.appendChild(DivShowFloor);
        let div = document.createElement("div");
        box1Div.appendChild(div);
        let div2 = document.createElement("div");
        div.appendChild(div2);
        for (var i = floor2; i >= floor1; i--) {
            let numI = i;
            let button = document.createElement("button");
            button.setAttribute("id", `buttonElevator${j}Floor${numI}`);
            button.setAttribute("class", `buttonElevator${j}`);
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
                update(objectElevator);
                console.log(ElevatorsArrayOfObjects);
            });
            div2.appendChild(button);
        }
        let div3 = document.createElement("div");
        div.appendChild(div3);
        for (var i = floor2; i >= floor1; i--) {
            let numI = i;
            let buttonUp = document.createElement("button");
            buttonUp.setAttribute("id", `buttonUpElevator${numI}floor${numI}`);
            buttonUp.setAttribute("class", `buttonUp`);
            buttonUp.setAttribute("value", `up`);
            buttonUp.style.background = "yellow";
            buttonUp.innerHTML = `w górę`;
            buttonUp.addEventListener("click", () => {
                let FromWhereAndDirection = new CreateQueueDirectionAndFrom(numI, buttonUp.value);
                element.queuedirectionAndFrom.push(FromWhereAndDirection);
                update(objectElevator);
            });
            div3.appendChild(buttonUp);
            let buttonDown = document.createElement("button");
            buttonDown.setAttribute("id", `buttonDownElevator${j}floor${numI}`);
            buttonDown.setAttribute("class", `buttonDown`);
            buttonDown.setAttribute("value", `down`);
            buttonDown.style.background = "orange";
            buttonDown.innerHTML = `w dół`;
            buttonDown.addEventListener("click", () => {
                let FromWhereAndDirection = new CreateQueueDirectionAndFrom(numI, buttonDown.value);
                element.queuedirectionAndFrom.push(FromWhereAndDirection);
                update(objectElevator);
            });
            div3.appendChild(buttonDown);
        }
    });
};
const update = (objectElevator) => {
    // //button.style.background = "green";
    //     for(let i=0; i<Number(objectElevator.queueWhereArray.length); i++){
    //         if(Number(objectElevator.queueWhereArray[i])>=Number(objectElevator.floorCurrent)){
    //             objectElevator.floorTarget=objectElevator.queueWhereArray[i];
    //             step(Number(objectElevator.floorCurrent), Number(objectElevator.floorTarget));
    //         };
    //     };
};
let optionalStop = (element, direction) => {
    let elementToRemove = [];
    element.queuedirectionAndFrom.forEach(el => {
        if (element.floorCurrent === el.floor && el.upDown === direction) {
            elementToRemove.push(el);
        }
    });
    elementToRemove.forEach(elRemove => {
        element.queuedirectionAndFrom = element.queuedirectionAndFrom.filter(obj => { return obj !== elRemove; });
        console.log("ding!");
    });
};
const step = () => {
    ElevatorsArrayOfObjects.forEach(element => {
        if ((element.queuedirectionAndFrom.length > 0) && (element.floorTarget === null)) {
            element.floorTarget = element.queuedirectionAndFrom.shift().floor;
        }
        if (element.floorTarget !== null) {
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
            console.log(ElevatorsArrayOfObjects);
            if (element.floorCurrent === element.floorTarget) {
                element.floorTarget = null;
                console.log("ding!");
            }
        }
        updateUI(element);
    });
};
let updateUI = (element) => {
    let buttonsAll = document.querySelectorAll(`.buttonElevator${element.id}`);
    buttonsAll.forEach(buttonElement => {
        buttonElement.style.background = "yellow";
    });
    let button = document.querySelector(`#buttonElevator${element.id}Floor${element.floorCurrent}`);
    button.style.background = "green";
};
