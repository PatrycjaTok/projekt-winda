const howManyElevators: HTMLInputElement = document.querySelector("#howManyElevators");
const confirmButton: HTMLButtonElement = document.querySelector("#confirmButton");
const box1Div: HTMLElement = document.querySelector("#box1");
let doSymulation: boolean = false;

confirmButton.addEventListener("click",(event: Event)=>{
    event.preventDefault();
    box1Div.textContent="";
    const howManyElevatorsValue: number =Number(howManyElevators.value);

    if(howManyElevatorsValue%1===0){
        if(howManyElevatorsValue ===0){
            box1Div.textContent="wprowadź ilość wind"
        }else if(howManyElevatorsValue <0){
            box1Div.textContent="ujemna ilość wind - uciekły nam jakieś? :)"
        }else if(howManyElevatorsValue >16){
            box1Div.textContent="system może obsługiwać do 16 wind"
        }else{
            doSymulation=true;
            elevatorSystem(howManyElevatorsValue, doSymulation);
        }

    }else{
        box1Div.textContent = "wprowadź liczbę całkowitą";
    }

});
 
const elevatorSystem = (howManyElevators: number, doSymulation: boolean) => {
    if(doSymulation===true){
        console.log("co dalej");
    }
}
