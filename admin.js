let laporan = JSON.parse(localStorage.getItem("laporan")) || [];
let dana = JSON.parse(localStorage.getItem("dana")) || [];

/* NAV */
function showPage(page){

["dashboard","laporan","dana"].forEach(id=>{
document.getElementById(id).classList.add("hidden");
});

document.getElementById(page).classList.remove("hidden");
}

/* LOAD */
renderLaporan();
renderDana();
updateDashboard();

/* DASHBOARD */
function updateDashboard(){

document.getElementById("totalLaporan").innerText = laporan.length;

document.getElementById("pendingCount").innerText =
laporan.filter(l=>l.status==="Pending").length;

document.getElementById("prosesCount").innerText =
laporan.filter(l=>l.status==="Diproses").length;

document.getElementById("selesaiCount").innerText =
laporan.filter(l=>l.status==="Selesai").length;

let total = dana.reduce((a,b)=>a + Number(b.jumlah),0);
document.getElementById("totalDana").innerText = total.toLocaleString();
}

/* LAPORAN */
function renderLaporan(){

let container = document.getElementById("listLaporan");
container.innerHTML = "";

laporan.forEach((l,i)=>{

container.innerHTML += `
<div class="card">
<h3>${l.jenis}</h3>
<p>${l.deskripsi}</p>

<p><b>${l.status}</b></p>

<button onclick="ubahStatus(${i})">Ubah Status</button>
<button onclick="hapus(${i})">Hapus</button>

<img src="${l.foto}">
</div>
`;
});

updateDashboard();
}

/* STATUS */
function ubahStatus(i){

if(laporan[i].status==="Pending") laporan[i].status="Diproses";
else if(laporan[i].status==="Diproses") laporan[i].status="Selesai";
else laporan[i].status="Pending";

localStorage.setItem("laporan", JSON.stringify(laporan));
renderLaporan();
}

/* HAPUS */
function hapus(i){

laporan.splice(i,1);
localStorage.setItem("laporan", JSON.stringify(laporan));
renderLaporan();
}

/* DANA */
function renderDana(){

let container = document.getElementById("listDana");
container.innerHTML = "";

dana.forEach(d=>{

container.innerHTML += `
<div class="card">
<h3>${d.judul}</h3>
<p>Rp ${Number(d.jumlah).toLocaleString()}</p>
<img src="${d.bukti}">
</div>
`;
});

updateDashboard();
} 