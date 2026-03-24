let orders=[]

function format(n){

return Number(n).toLocaleString("en-US")

}

function clean(n){

return Number(n.replace(/,/g,'')) || 0

}

function save(){

localStorage.setItem("orders",JSON.stringify(orders))

}

function load(){

let data=localStorage.getItem("orders")

if(data){

orders=JSON.parse(data)

orders.forEach(o=>createOrder(o))

}else{

addOrder()

}

}

function updateTotalProfit(){

let total=0

document.querySelectorAll(".profit").forEach(p=>{

total+=clean(p.innerText)

})

document.getElementById("totalProfit").innerText=format(total)

}

function calc(box){

let qty=clean(box.querySelector(".qty").value)

let exw=clean(box.querySelector(".exw").value)

let log=clean(box.querySelector(".log").value)

let sell=clean(box.querySelector(".sell").value)

let total=qty*exw

let amount=qty*sell

let profit=amount-total-log

box.querySelector(".total").innerText=format(total)
box.querySelector(".amount").innerText=format(amount)
box.querySelector(".profit").innerText=format(profit)

updateTotalProfit()

}

function formatInput(input){

let v=input.value.replace(/,/g,'')

if(!isNaN(v)&&v!=""){

input.value=format(v)

}

}

function createOrder(data={}){

let div=document.createElement("div")

div.className="order"

div.innerHTML=`

<div class="row">
<input type="date" class="orderDate" value="${data.orderDate||""}">
<input type="date" class="deliveryDate" value="${data.deliveryDate||""}">
</div>

<div class="row">

<select class="supplier">

<option>Cường Vỹ</option>
<option>Phúc Tiến</option>
<option>Quang Tuệ</option>
<option>Việt Long</option>
<option>Hải Hoài</option>
<option>Hồng Ngọc</option>
<option>Vân Long</option>
<option>Phú Hưng</option>
<option>Thập Hùng</option>

</select>

<select class="logo">

<option>VNPL</option>
<option>PhuCau</option>
<option>Trơn</option>

</select>

</div>

<div class="row">
<input placeholder="Qty" class="qty" value="${data.qty||""}">
<input placeholder="EXW" class="exw" value="${data.exw||""}">
</div>

<div class="row">
<input placeholder="Log" class="log" value="${data.log||""}">
<input placeholder="Sell" class="sell" value="${data.sell||""}">
</div>

<div class="result">
Total: <span class="total">0</span> |
Amount: <span class="amount">0</span> |
Profit: <span class="profit">0</span>
</div>

<button class="copyBtn">Copy Order</button>

`

div.addEventListener("input",(e)=>{

if(e.target.classList.contains("qty")||
e.target.classList.contains("exw")||
e.target.classList.contains("log")||
e.target.classList.contains("sell")){

formatInput(e.target)

}

calc(div)

save()

})

div.querySelector(".copyBtn").onclick=function(){

let text=div.innerText

navigator.clipboard.writeText(text)

alert("Copied")

}

document.getElementById("orders").appendChild(div)

calc(div)

}

function addOrder(){

createOrder()

}

function exportCSV(){

let rows=[["OrderDate","DeliveryDate","Supplier","Qty","EXW","Log","Sell","Profit"]]

document.querySelectorAll(".order").forEach(o=>{

rows.push([

o.querySelector(".orderDate").value,
o.querySelector(".deliveryDate").value,
o.querySelector(".supplier").value,
o.querySelector(".qty").value,
o.querySelector(".exw").value,
o.querySelector(".log").value,
o.querySelector(".sell").value,
o.querySelector(".profit").innerText

])

})

let csv=rows.map(r=>r.join(",")).join("\n")

let blob=new Blob([csv])

let a=document.createElement("a")

a.href=URL.createObjectURL(blob)

a.download="orders.csv"

a.click()

}

load()
