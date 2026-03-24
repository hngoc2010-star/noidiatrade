function numberFormat(x){

if(!x) return ""

return Number(x).toLocaleString("en-US")

}

function cleanNumber(x){

return Number(x.replace(/,/g,''))

}

function calculate(row){

let qty=cleanNumber(row.querySelector(".qty").value)

let exw=cleanNumber(row.querySelector(".exw").value)

let logistics=cleanNumber(row.querySelector(".logistics").value)

let sell=cleanNumber(row.querySelector(".sell").value)

let totalExw=qty*exw

let sellAmount=qty*sell

let profit=sellAmount-totalExw-logistics

row.querySelector(".totalExw").innerText=numberFormat(totalExw)

row.querySelector(".sellAmount").innerText=numberFormat(sellAmount)

row.querySelector(".profit").innerText=numberFormat(profit)

}

document.addEventListener("input",function(e){

if(e.target.classList.contains("number")){

let value=e.target.value.replace(/,/g,'')

if(!isNaN(value) && value!==""){

e.target.value=numberFormat(value)

}

}

let row=e.target.closest("tr")

if(row){

calculate(row)

}

})

function addRow(){

let tbody=document.getElementById("tbody")

let newRow=tbody.rows[0].cloneNode(true)

newRow.querySelectorAll("input").forEach(i=>i.value="")

newRow.querySelectorAll(".totalExw,.sellAmount,.profit")
.forEach(i=>i.innerText="0")

tbody.appendChild(newRow)

}
