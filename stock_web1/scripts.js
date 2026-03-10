<script>

const DATA_URL =
"https://raw.githubusercontent.com/amitkumar02177-debug/aditisales/main/stock_web1/stocks.json";

let lastDataHash = "";

async function loadStocks(){

    try{

        const API_URL =
        "https://api.github.com/repos/amitkumar02177-debug/aditisales/contents/stock_web1/stocks.json";

        let response = await fetch(API_URL);

        let data = await response.json();

        // GitHub API returns base64 content
        let decoded = atob(data.content);

        let stocks = JSON.parse(decoded);

        let newHash = JSON.stringify(stocks);

        if(newHash !== lastDataHash){

            lastDataHash = newHash;

            let table = document.querySelector("#stockTable tbody");

            table.innerHTML="";

            stocks.forEach(item=>{

                let qtyText = item.qty == 0 ? "Out of Stock" : item.qty;

                let row = `
                <tr>
                    <td>${item.name}</td>
                    <td>${qtyText}</td>
                </tr>
                `;

                table.innerHTML += row;

            });

            document.getElementById("time").innerText =
            new Date().toLocaleString();

            console.log("Inventory updated");

        }else{

            console.log("No change in inventory");

        }

    }catch(err){

        console.log("Error loading data:", err);

    }

}

// First load when page opens
loadStocks();

// Check every 5 minutes
setInterval(loadStocks,300000);



function searchProduct(){

let input = document.getElementById("searchBox").value.toLowerCase();

let rows = document.querySelectorAll("#stockTable tbody tr");

rows.forEach(row=>{

let product=row.children[0].textContent.toLowerCase();

row.style.display = product.includes(input) ? "" : "none";

});

}

</script>

