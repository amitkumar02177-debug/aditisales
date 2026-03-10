const DATA_URL =
"https://raw.githubusercontent.com/amitkumar02177-debug/aditisales/main/stock_web1/stocks.json";

let lastDataHash = "";

async function loadStocks(){

    try{

        let response = await fetch(DATA_URL + "?t=" + Date.now());
        let data = await response.json();

        let newHash = JSON.stringify(data);

        // Only update table if data changed
        if(newHash !== lastDataHash){

            lastDataHash = newHash;

            let table = document.querySelector("#stockTable tbody");

            table.innerHTML="";

            data.forEach(item=>{

                let row=`
                <tr>
                <td>${item.name}</td>
                <td>${item.qty}</td>
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

        console.log("Error loading data",err);

    }

}


// First load
loadStocks();

// Check every 5 minutes
setInterval(loadStocks,300000);
