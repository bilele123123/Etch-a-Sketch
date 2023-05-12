const DEFAULT_COLOR = "black";
const DEFAULT_MODE = "single";

let currentMode = DEFAULT_MODE;
let currentColor = DEFAULT_COLOR;
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

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

colorPicker.oninput = (e) => changeCurrentColor(e.target.value);
singleBTN.onclick = () => changeCurrentMode("single");
rainbowBTN.onclick = () => changeCurrentMode("rainbow");
eraserBTN.onclick = () => changeCurrentMode("eraser");

function makeGrids(row, column)
{
    sketchpad.style.setProperty("--grid-row", row);
    sketchpad.style.setProperty("--grid-column", column);
    for (let i = 0; i < (row * column); i++)
    {
        const grid = document.createElement("div");
        grid.addEventListener("mouseover", changeColor);
        grid.addEventListener("mousedown", changeColor);
        sketchpad.appendChild(grid).className = "grid";
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
        e.target.style.backgroundColor = "aliceblue";
    }
}

function activeButton(newMode) {
    if (currentMode === "rainbow")
    {
        rainbowBTN.classList.remove("active");
    }
    else if (currentMode === "single")
    {
        singleBTN.classList.remove("active");
    }
    else if (currentMode === "eraser")
    {
        eraserBTN.classList.remove("active");
    }

    if (newMode === "rainbow")
    {
        rainbowBTN.classList.add("active");
    }
    else if (newMode === "single")
    {
        singleBTN.classList.add("active");
    }
    else if (newMode === "eraser")
    {
        eraserBTN.classList.add("active");
    }
}

function changeCurrentMode(newMode) {
    activeButton(newMode);
    currentMode = newMode;
}


window.onload = () => {
    makeGrids(16, 16);
    activeButton(DEFAULT_MODE);
}