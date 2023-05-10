const DEFAULT_COLOR = "black";

const container = document.getElementById("container");
const clearButton = document.getElementById("clear-button");
const colorPicker = document.getElementById("pick-color-button");

let currentColor = DEFAULT_COLOR;
let mouseDown = false;

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

colorPicker.oninput = (e) => changeCurrentColor(e.target.value);
clearButton.onClick = () => clearGrid();

function changeCurrentColor(newColor) {
    currentColor = newColor;
}

function clearGrid() {
    makeGrids(16, 16);
}

function makeGrids(row, column)
{
    container.style.setProperty("--grid-row", row);
    container.style.setProperty("--grid-column", column);
    for (let i = 0; i < (row * column); i++)
    {
        const grid = document.createElement("div");
        grid.addEventListener("mouseover", changeColor);
        grid.addEventListener("mousedown", changeColor);
        container.appendChild(grid).className = "grid";
    };
};

makeGrids(16, 16);

function changeColor(e) {
    if (e.type === "mouseover" && !mouseDown) return;
    e.target.style.backgroundColor = currentColor;
}