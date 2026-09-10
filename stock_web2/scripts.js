<script>

let lastDataHash = "";

const DATA_URL =
"https://raw.githubusercontent.com/amitkumar02177-debug/aditisales/main/stock_web1/stocks.json";


async function loadStocks(){

    try{

        let response = await fetch(DATA_URL + "?t=" + Date.now(), {
            cache: "no-store"
        });

        let data = await response.json();

        let newHash = JSON.stringify(data);

        if(newHash !== lastDataHash){

            lastDataHash = newHash;

            let table = document.querySelector("#stockTable tbody");

            table.innerHTML="";

            data.forEach(item=>{

                let qtyText = item.qty == 0 ? "Out of Stock" : item.qty;

                let row=`
                <tr>
                    <td>${item.name}</td>
                    <td>${qtyText}</td>
                </tr>
                `;

                table.innerHTML+=row;

            });

            document.getElementById("time").innerText =
            new Date().toLocaleString();

            console.log("Inventory updated");

        }else{

            console.log("No change in inventory");

        }

    }catch(err){

        console.log("Error loading data:",err);

    }

}


function searchProduct(){

let input=document.getElementById("searchBox").value.toLowerCase();

let rows=document.querySelectorAll("#stockTable tbody tr");

rows.forEach(row=>{

let product=row.children[0].textContent.toLowerCase();

row.style.display = product.includes(input) ? "" : "none";

});

}


loadStocks();

/* auto refresh every 5 minutes */
setInterval(loadStocks,300000);

</script>
