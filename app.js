function format(n){

return Number(n).toLocaleString("en-US")

}

function clean(n){

return Number(n.replace(/,/g,'')) || 0

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

}

function addOrder(){

let div=document.createElement("div")

div.className="order"

div.innerHTML=`

<div class="row">
<input type="date" class="orderDate">
<input type="date" class="deliveryDate">
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
<input placeholder="Qty" class="qty">
<input placeholder="EXW" class="exw">
</div>

<div class="row">
<input placeholder="Log" class="log">
<input placeholder="Sell" class="sell">
</div>

<div class="result">
Total: <span class="total">0</span> |
Amount: <span class="amount">0</span> |
Profit: <span class="profit">0</span>
</div>

<button class="copyBtn">Copy Result</button>

`

div.addEventListener("input",()=>calc(div))

div.querySelector(".copyBtn").onclick=function(){

let total=div.querySelector(".total").innerText
let amount=div.querySelector(".amount").innerText
let profit=div.querySelector(".profit").innerText

let text=`Total: ${total} | Amount: ${amount} | Profit: ${profit}`

navigator.clipboard.writeText(text)

alert("Copied")

}

document.getElementById("orders").appendChild(div)

}

addOrder()
