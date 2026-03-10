async function loadStocks() {

const response = await fetch("https://raw.githubusercontent.com/amitkumar02177-debug/aditisales/main/stocks.json");

const data = await response.json();

const table = document.querySelector("#stockTable tbody");

table.innerHTML = "";

data.forEach(item => {

let row = `
<tr>
<td>${item.name}</td>
<td>${item.qty}</td>
</tr>
`;

table.innerHTML += row;

});

}

loadStocks();

setInterval(loadStocks, 30000);

