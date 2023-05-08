const container = document.getElementById("container");

function makeGrids(row, column)
{
    container.style.setProperty("--grid-row", row);
    container.style.setProperty("--grid-column", column);
    for (let i = 0; i < (row * column); i++)
    {
        let grid = document.createElement("div");
        container.appendChild(grid).className = "grid";
    };
};

makeGrids(16, 16);
