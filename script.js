let laporan = JSON.parse(localStorage.getItem("laporan")) || [];
let dana = JSON.parse(localStorage.getItem("dana")) || [];
let isLogin = false;

/* SAVE */
function saveData(){
localStorage.setItem("laporan", JSON.stringify(laporan));
localStorage.setItem("dana", JSON.stringify(dana));
}

/* NAV */
function showPage(page, event){

["home","dashboard","lapor","data","dana","login"].forEach(id=>{
document.getElementById(id).classList.add("hidden");
});

document.getElementById(page).classList.remove("hidden");

/* active menu */
if(event){
document.querySelectorAll(".menu").forEach(m=>m.classList.remove("active"));
event.target.classList.add("active");
}
}

/* LOGIN */
function login(){
let u = username.value;
let p = password.value;

if(u==="admin" && p==="123"){
isLogin = true;
showToast("Login berhasil");
showPage("home");
}else{
showToast("Login gagal");
}
}

/* LAPOR */
function kirimLaporan(){

let file = foto.files[0];
let reader = new FileReader();

reader.onload = function(){

laporan.push({
nama:nama.value,
jenis:jenis.value,
alamat:alamat.value,
deskripsi:deskripsi.value,
foto:reader.result,
status:"Pending"
});

saveData();
renderLaporan();
updateDashboard();
showToast("Laporan terkirim");
};

reader.readAsDataURL(file);
}

/* RENDER LAPOR */
function renderLaporan(){

listLaporan.innerHTML="";

laporan.forEach((l,i)=>{

listLaporan.innerHTML += `
<div class="card">
<h3>${l.jenis}</h3>
<p>${l.deskripsi}</p>

<span onclick="gantiStatus(${i})">
${l.status}
</span>

<img src="${l.foto}">

<button onclick="hapusLaporan(${i})">Hapus</button>
<button onclick="editLaporan(${i})">Edit</button>
</div>
`;
});

}

/* STATUS */
function gantiStatus(i){

if(laporan[i].status==="Pending") laporan[i].status="Diproses";
else if(laporan[i].status==="Diproses") laporan[i].status="Selesai";
else laporan[i].status="Pending";

saveData();
renderLaporan();
updateDashboard();
}

/* HAPUS */
function hapusLaporan(i){
laporan.splice(i,1);
saveData();
renderLaporan();
updateDashboard();
}

/* EDIT */
function editLaporan(i){
let newText = prompt("Edit deskripsi:", laporan[i].deskripsi);
if(newText){
laporan[i].deskripsi=newText;
saveData();
renderLaporan();
}
}

/* DANA */
function tambahDana(){

let file = buktiDana.files[0];
let reader = new FileReader();

reader.onload = function(){

dana.push({
judul:judulDana.value,
jumlah:jumlahDana.value,
bukti:reader.result
});

saveData();
renderDana();
updateDashboard();
showToast("Dana masuk");
};

reader.readAsDataURL(file);
}

/* RENDER DANA */
function renderDana(){

listDana.innerHTML="";

dana.forEach((d,i)=>{

listDana.innerHTML += `
<div class="card">
<h3>${d.judul}</h3>
<p>Rp ${Number(d.jumlah).toLocaleString()}</p>
<img src="${d.bukti}">

<button onclick="hapusDana(${i})">Hapus</button>

</div>
`;
});
}

/* DASHBOARD */
function updateDashboard(){

totalLaporan.innerText = laporan.length;

pendingCount.innerText = laporan.filter(l=>l.status==="Pending").length;
prosesCount.innerText = laporan.filter(l=>l.status==="Diproses").length;
selesaiCount.innerText = laporan.filter(l=>l.status==="Selesai").length;

let totalDana = dana.reduce((a,b)=>a + Number(b.jumlah),0);
totalDana.innerText = totalDana.toLocaleString();
}

/* TOAST */
function showToast(msg){
let t=document.getElementById("toast");
t.innerText=msg;
t.style.display="block";
setTimeout(()=>t.style.display="none",2000);
}

/* INIT */
renderLaporan();
renderDana();
updateDashboard();
function showPage(page, event){

["home","dashboard","lapor","data","dana","login","help"].forEach(id=>{
document.getElementById(id).classList.add("hidden");
});

document.getElementById(page).classList.remove("hidden");

if(event){
document.querySelectorAll(".menu").forEach(m=>{
m.classList.remove("active");
});
event.target.classList.add("active");
}

window.scrollTo({top:0, behavior:"smooth"});
} 

function revealOnScroll(){
    let reveals = document.querySelectorAll(".reveal");

    reveals.forEach(el=>{
        let windowHeight = window.innerHeight;
        let elementTop = el.getBoundingClientRect().top;

        if(elementTop < windowHeight - 100){
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);

function hapusDana(i){
    dana.splice(i,1);
    saveData();
    renderDana();
    updateDashboard();
    showToast("Dana dihapus");
}