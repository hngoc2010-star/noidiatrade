function format(num){
return Number(num).toLocaleString("en-US")
}

function calculate(row){

let qty=row.querySelector(".qty").value
let exw=row.querySelector(".exw").value
let logistics=row.querySelector(".logistics").value
let sell=row.querySelector(".sell").value

qty=Number(qty)
exw=Number(exw)
logistics=Number(logistics)
sell=Number(sell)

let totalExw=qty*exw
let sellAmount=qty*sell
let profit=sellAmount-totalExw-logistics

row.querySelector(".totalExw").innerText=format(totalExw)
row.querySelector(".sellAmount").innerText=format(sellAmount)
row.querySelector(".profit").innerText=format(profit)

}

document.addEventListener("input",function(e){

let row=e.target.closest("tr")

if(row){
calculate(row)
}

})

function addRow(){

let tbody=document.getElementById("tbody")

let newRow=tbody.rows[0].cloneNode(true)

newRow.querySelectorAll("input").forEach(i=>i.value="")

newRow.querySelectorAll(".totalExw,.sellAmount,.profit").forEach(i=>i.innerText="0")

tbody.appendChild(newRow)

}
