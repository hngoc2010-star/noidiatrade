let orders=[]

function format(n){

return Number(n).toLocaleString("en-US")

}

function clean(v){

return Number(String(v).replace(/,/g,''))||0

}

function save(){

localStorage.setItem("plywood_orders",JSON.stringify(orders))

}

function load(){

let data=localStorage.getItem("plywood_orders")

if(data){

orders=JSON.parse(data)

orders.forEach(o=>createOrder(o))

}else{

addOrder()

}

}

function updateTotal(){

let total=0

document.querySelectorAll(".profit").forEach(p=>{

total+=clean(p.innerText)

})

document.getElementById("totalProfit").innerText=format(total)

}

function calculate(box){

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

updateTotal()

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

div.addEventListener("input",()=>{

calculate(div)
saveCurrent()

})

div.querySelector(".copyBtn").onclick=function(){

let text=`

Order Date: ${div.querySelector(".orderDate").value}
Delivery: ${div.querySelector(".deliveryDate").value}

Supplier: ${div.querySelector(".supplier").value}
Logo: ${div.querySelector(".logo").value}

Qty: ${div.querySelector(".qty").value}
EXW: ${div.querySelector(".exw").value}
Log: ${div.querySelector(".log").value}
Sell: ${div.querySelector(".sell").value}

Total: ${div.querySelector(".total").innerText}
Amount: ${div.querySelector(".amount").innerText}
Profit: ${div.querySelector(".profit").innerText}

`

navigator.clipboard.writeText(text)

alert("Copied")

}

document.getElementById("orders").appendChild(div)

calculate(div)

}

function saveCurrent(){

orders=[]

document.querySelectorAll(".order").forEach(o=>{

orders.push({

orderDate:o.querySelector(".orderDate").value,
deliveryDate:o.querySelector(".deliveryDate").value,
supplier:o.querySelector(".supplier").value,
logo:o.querySelector(".logo").value,
qty:o.querySelector(".qty").value,
exw:o.querySelector(".exw").value,
log:o.querySelector(".log").value,
sell:o.querySelector(".sell").value

})

})

save()

}

function addOrder(){

createOrder()

saveCurrent()

}

function exportExcel(){

let rows=[[
"OrderDate",
"DeliveryDate",
"Supplier",
"Logo",
"Qty",
"EXW",
"Log",
"Sell",
"Total",
"Amount",
"Profit"
]]

document.querySelectorAll(".order").forEach(o=>{

rows.push([

o.querySelector(".orderDate").value,
o.querySelector(".deliveryDate").value,
o.querySelector(".supplier").value,
o.querySelector(".logo").value,
o.querySelector(".qty").value,
o.querySelector(".exw").value,
o.querySelector(".log").value,
o.querySelector(".sell").value,
o.querySelector(".total").innerText,
o.querySelector(".amount").innerText,
o.querySelector(".profit").innerText

])

})

let csv=rows.map(r=>r.join(",")).join("\n")

let blob=new Blob([csv],{type:"text/csv"})

let a=document.createElement("a")

a.href=URL.createObjectURL(blob)

a.download="plywood_orders.csv"

a.click()

}

load()
