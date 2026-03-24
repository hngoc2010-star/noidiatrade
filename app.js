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

let hoaDon=qty*exw
let vat=hoaDon*0.08
let tongVAT=hoaDon+vat

let doanhThu=qty*ban
let loiNhuan=doanhThu-hoaDon-log

box.querySelector(".hoadon").innerText=dinhDangSo(hoaDon)
box.querySelector(".vat").innerText=dinhDangSo(vat)
box.querySelector(".tongvat").innerText=dinhDangSo(tongVAT)

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
<input placeholder="Độ dày ván (mm)" class="vanmm">
<input placeholder="Số lượng" class="soluong">
</div>

<div class="row">
<input placeholder="Giá EXW" class="exw">
<input placeholder="Chi phí Log" class="log">
</div>

<div class="row">
<input placeholder="Giá bán" class="ban">
</div>

<div class="ketqua">

Hóa đơn: <span class="hoadon">0</span> |
VAT 8%: <span class="vat">0</span> |
Tổng VAT: <span class="tongvat">0</span>

<br>

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

})

div.addEventListener("input",(e)=>{

if(e.target.tagName==="INPUT"){
dinhDangInput(e.target)
}

tinh(div)

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

Hóa đơn: ${div.querySelector(".hoadon").innerText}
VAT 8%: ${div.querySelector(".vat").innerText}
Tổng hóa đơn VAT: ${div.querySelector(".tongvat").innerText}

`

navigator.clipboard.writeText(text)

alert("Đã copy")

}

document.getElementById("orders").appendChild(div)

}

function themDon(){
taoDon()
}

themDon()
