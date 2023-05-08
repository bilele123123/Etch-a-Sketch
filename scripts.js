const container = document.getElementById("container");
const clearButton = document.getElementById("clear-button");

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

clearButton.onClick = () => clearGrid();

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
    e.target.style.backgroundColor = "black";
}