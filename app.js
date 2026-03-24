function clean(x){

return Number(x.replace(/,/g,'')) || 0

}

function format(x){

return Number(x).toLocaleString("en-US")

}

function calc(row){

let qty=clean(row.querySelector(".qty").value)

let exw=clean(row.querySelector(".exw").value)

let log=clean(row.querySelector(".log").value)

let sell=clean(row.querySelector(".sell").value)

let total=qty*exw

let amount=qty*sell

let profit=amount-total-log

row.querySelector(".total").innerText=format(total)

row.querySelector(".amount").innerText=format(amount)

row.querySelector(".profit").innerText=format(profit)

}

document.addEventListener("input",function(e){

if(e.target.classList.contains("num")){

let v=e.target.value.replace(/,/g,'')

if(!isNaN(v)&&v!=""){

e.target.value=format(v)

}

}

let row=e.target.closest("tr")

if(row) calc(row)

})

document.addEventListener("change",function(e){

if(e.target.classList.contains("supplier")){

let td=e.target.closest("td")

let input=td.querySelector(".supplierInput")

if(e.target.value==="custom"){

input.style.display="block"

}else{

input.style.display="none"

}

}

})

function addRow(){

let tbody=document.getElementById("tbody")

let r=tbody.rows[0].cloneNode(true)

r.querySelectorAll("input").forEach(i=>i.value="")

r.querySelectorAll(".supplierInput").forEach(i=>i.style.display="none")

r.querySelectorAll(".total,.amount,.profit").forEach(i=>i.innerText="0")

tbody.appendChild(r)

}
