const DEFAULT_COLOR = "black";
const DEFAULT_MODE = "single";
const DEFAULT_SIZE = 16;
const opacityStep = 0.1;
const maxOpacity = 0.9;
const minOpacity = 0.1;

let currentMode = DEFAULT_MODE;
let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_SIZE;
let mouseDown = false;


function changeCurrentColor(newColor) {
    currentColor = newColor;
}

const sketchpad = document.getElementById("sketchpad");
const colorPicker = document.getElementById("pick-color-button");
const singleBTN = document.getElementById("single-color-button");
const rainbowBTN = document.getElementById("rainbow-color-button");
const eraserBTN = document.getElementById("eraser-button");
const clearBTN = document.getElementById("clear-button");
const textInput = document.getElementById("textInput");
const slider = document.getElementById("slider");
const shadeBTN = document.getElementById("shadeBTN");

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

colorPicker.oninput = (e) => changeCurrentColor(e.target.value);
singleBTN.onclick = () => changeCurrentMode("single");
rainbowBTN.onclick = () => changeCurrentMode("rainbow");
eraserBTN.onclick = () => changeCurrentMode("eraser");
clearBTN.onclick = () => newGrid();
shadeBTN.onclick = () => changeCurrentMode("shade");

let update = () => textInput.innerHTML = `${slider.value} x ${slider.value}`;

slider.addEventListener("input", update);
update();

slider.addEventListener("change", (event) => {
    currentSize = slider.value;
    newGrid();
})

function clearGrid() {
    sketchpad.innerHTML = "";
}

function newGrid() {
    clearGrid();
    makeGrids(currentSize);
}

function makeGrids(row)
{
    sketchpad.style.setProperty("--grid-row", row);
    sketchpad.style.setProperty("--grid-column", row);
    for (let i = 0; i < (row * row); i++)
    {
        const grid = document.createElement("div");
        grid.classList.add("grid");
        grid.addEventListener("mouseover", changeColor);
        grid.addEventListener("mousedown", changeColor);
        sketchpad.appendChild(grid);
    };
};

function changeColor(e) {
    if (e.type === "mouseover" && !mouseDown) return;
    if (currentMode === "rainbow")
    {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    }
    else if (currentMode === "single")
    {
        e.target.style.backgroundColor = currentColor;
    }
    else if (currentMode === "eraser")
    {
        e.target.style.backgroundColor = "#dbd4db8e";
    }
    else if (currentMode === "shade") {
        const currentOpacity = parseFloat(this.style.backgroundColor.slice(-4, -1));
        if (currentOpacity < maxOpacity) 
        {
            const newOpacity = Math.min(currentOpacity + opacityStep, maxOpacity);
            this.style.backgroundColor = `rgba(0, 0, 0, ${newOpacity})`;
            this.classList.add('active');
        } 
        else if (this.classList.contains('active') && this.style.backgroundColor === 'rgb(0, 0, 0)') 
        {
            return;
        } 
        else if (!this.classList.contains('active')) 
        {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        }
    }
}

function activeButton(newMode) {

    if (currentMode === "single")
    {
        singleBTN.classList.remove("active");
    }
    else if (currentMode === "rainbow")
    {
        rainbowBTN.classList.remove("active");
    }
    else if (currentMode === "eraser")
    {
        eraserBTN.classList.remove("active");
    }
    else if (currentMode === "shade")
    {
        shadeBTN.classList.remove("active");
    }

    if (newMode === "single")
    {
        singleBTN.classList.add("active");
    }
    else if (newMode === "rainbow")
    {
        rainbowBTN.classList.add("active");
    }
    else if (newMode === "eraser")
    {
        eraserBTN.classList.add("active");
    }
    else if (newMode === "shade")
    {
        shadeBTN.classList.add("active");
    }

}

function changeCurrentMode(newMode) {
    activeButton(newMode);
    currentMode = newMode;
}


window.onload = () => {
    makeGrids(currentSize);
    activeButton(DEFAULT_MODE);
}