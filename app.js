function dinhDangSo(n){

return Number(n).toLocaleString("en-US")

}

function boDauPhay(n){

return Number(String(n).replace(/,/g,''))||0

}

function dinhDangInput(o){

let v=o.value.replace(/,/g,'')

if(!isNaN(v)&&v!=""){

o.value=dinhDangSo(v)

}

}

function formatDateVN(date){

if(!date) return ""

let d=new Date(date)

let day=String(d.getDate()).padStart(2,'0')
let month=String(d.getMonth()+1).padStart(2,'0')
let year=d.getFullYear()

return `${day}/${month}/${year}`

}

function tinh(box){

let qty=boDauPhay(box.querySelector(".soluong").value)
let exw=boDauPhay(box.querySelector(".exw").value)
let log=boDauPhay(box.querySelector(".log").value)
let ban=boDauPhay(box.querySelector(".ban").value)

let tong=qty*exw
let doanhThu=qty*ban
let loiNhuan=doanhThu-tong-log

box.querySelector(".tong").innerText=dinhDangSo(tong)
box.querySelector(".doanhthu").innerText=dinhDangSo(doanhThu)
box.querySelector(".loinhuan").innerText=dinhDangSo(loiNhuan)

capNhatTong()

}

function capNhatTong(){

let tong=0

document.querySelectorAll(".loinhuan").forEach(e=>{

tong+=boDauPhay(e.innerText)

})

document.getElementById("tongLoiNhuan").innerText=dinhDangSo(tong)

}

function taoDon(data={}){

let div=document.createElement("div")
div.className="order"

div.innerHTML=`

<div class="row">
<input type="date" class="ngaydat" value="${data.ngaydat||""}">
<input type="date" class="ngaygiao" value="${data.ngaygiao||""}">
</div>

<div class="row">

<select class="nccSelect">

<option value="">Chọn NCC</option>
<option>Cường Vỹ</option>
<option>Phúc Tiến</option>
<option>Quang Tuệ</option>
<option>Việt Long</option>
<option>Hải Hoài</option>
<option>Hồng Ngọc</option>
<option>Vân Long</option>
<option>Phú Hưng</option>
<option>Thập Hùng</option>
<option value="khac">Khác...</option>

</select>

<input placeholder="Nhập NCC" class="nccInput" style="display:none">

<select class="logo">

<option>VNPL</option>
<option>PhuCau</option>
<option>Trơn</option>

</select>

</div>

<div class="row">

<input placeholder="Độ dày ván (mm)" class="vanmm" value="${data.vanmm||""}">

<input placeholder="Số lượng" class="soluong" value="${data.soluong||""}">

</div>

<div class="row">

<input placeholder="Giá EXW" class="exw" value="${data.exw||""}">

<input placeholder="Chi phí Log" class="log" value="${data.log||""}">

</div>

<div class="row">

<input placeholder="Giá bán" class="ban" value="${data.ban||""}">

</div>

<div class="ketqua">

Tổng: <span class="tong">0</span> |
Doanh thu: <span class="doanhthu">0</span> |
Lợi nhuận: <span class="loinhuan">0</span>

</div>

<button class="copy">Copy đơn</button>

`

let select=div.querySelector(".nccSelect")
let input=div.querySelector(".nccInput")

select.addEventListener("change",()=>{

if(select.value==="khac"){

input.style.display="block"

}else{

input.style.display="none"
input.value=""

}

luu()

})

div.addEventListener("input",(e)=>{

if(e.target.tagName==="INPUT"){

dinhDangInput(e.target)

}

tinh(div)
luu()

})

div.querySelector(".copy").onclick=function(){

let ncc=select.value

if(ncc==="khac"){
ncc=input.value
}

let text=`

Ngày đặt: ${formatDateVN(div.querySelector(".ngaydat").value)}
Ngày giao: ${formatDateVN(div.querySelector(".ngaygiao").value)}

Nhà cung cấp: ${ncc}
Logo: ${div.querySelector(".logo").value}

Độ dày ván: ${div.querySelector(".vanmm").value} mm
Số lượng: ${div.querySelector(".soluong").value}

Giá EXW: ${div.querySelector(".exw").value}
Chi phí Log: ${div.querySelector(".log").value}
Giá bán: ${div.querySelector(".ban").value}

Tổng: ${div.querySelector(".tong").innerText}
Doanh thu: ${div.querySelector(".doanhthu").innerText}
Lợi nhuận: ${div.querySelector(".loinhuan").innerText}

`

navigator.clipboard.writeText(text)

alert("Đã copy")

}

document.getElementById("orders").appendChild(div)

tinh(div)

}

function luu(){

let arr=[]

document.querySelectorAll(".order").forEach(o=>{

let select=o.querySelector(".nccSelect")
let input=o.querySelector(".nccInput")

let ncc=select.value

if(ncc==="khac"){
ncc=input.value
}

arr.push({

ngaydat:o.querySelector(".ngaydat").value,
ngaygiao:o.querySelector(".ngaygiao").value,
vanmm:o.querySelector(".vanmm").value,
soluong:o.querySelector(".soluong").value,
exw:o.querySelector(".exw").value,
log:o.querySelector(".log").value,
ban:o.querySelector(".ban").value

})

})

localStorage.setItem("donvan",JSON.stringify(arr))

}

function load(){

let data=localStorage.getItem("donvan")

if(data){

JSON.parse(data).forEach(d=>taoDon(d))

}else{

themDon()

}

}

function themDon(){

taoDon()

}

function xuatExcel(){

let rows=[["Ngày đặt","Ngày giao","Nhà cung cấp","Ván mm","Số lượng","EXW","Log","Giá bán","Lợi nhuận"]]

document.querySelectorAll(".order").forEach(o=>{

let select=o.querySelector(".nccSelect")
let input=o.querySelector(".nccInput")

let ncc=select.value

if(ncc==="khac"){
ncc=input.value
}

rows.push([

formatDateVN(o.querySelector(".ngaydat").value),
formatDateVN(o.querySelector(".ngaygiao").value),
ncc,
o.querySelector(".vanmm").value,
o.querySelector(".soluong").value,
o.querySelector(".exw").value,
o.querySelector(".log").value,
o.querySelector(".ban").value,
o.querySelector(".loinhuan").innerText

])

})

let csv=rows.map(r=>r.join(",")).join("\n")

let blob=new Blob([csv])

let a=document.createElement("a")

a.href=URL.createObjectURL(blob)

a.download="don_van.csv"

a.click()

}

load()
