// Verileri Tarayıcıdan Çek
let bakiye = localStorage.getItem("mertiX_bakiye") ? parseInt(localStorage.getItem("mertiX_bakiye")) : 2000;
let envanter = localStorage.getItem("mertiX_envanter") ? JSON.parse(localStorage.getItem("mertiX_envanter")) : [];

const urunler = [
    { id: 1, ad: "Basketbol Topu", fiyat: 250, resim: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Basketball.png/200px-Basketball.png" },
    { id: 2, ad: "Premium Saat", fiyat: 500, resim: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200" },
    { id: 3, ad: "Kulaklık", fiyat: 750, resim: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200" },
    { id: 4, ad: "Gamer Kulaklık", fiyat: 1500, resim: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200" },
    { id: 5, ad: "Gaming Mouse", fiyat: 400, resim: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200" }
];
function bakiyeGuncelle() {
    document.getElementById("bakiye-miktari").innerText = bakiye;
    localStorage.setItem("mertiX_bakiye", bakiye);
}

function envanterGuncelle() {
    const liste = document.getElementById("envanter-listesi");
    liste.innerHTML = "";

    envanter.forEach((urunAd, index) => {
        const urunBilgi = urunler.find(u => u.ad === urunAd);
        const div = document.createElement("div");
        div.style.border = "1px solid #ddd";
        div.style.padding = "10px";
        div.style.borderRadius = "8px";
        div.style.textAlign = "center";
        div.style.background = "#fff";
        div.style.color = "#333";

        div.innerHTML = `
            <img src="${urunBilgi.resim}" width="40" height="40" style="object-fit:contain;"><br>
            <small>${urunAd}</small><br>
            <button onclick="esyaSat(${index})" style="background:#ff4757; color:white; padding:2px 8px; font-size:10px; width:auto;">Sat</button>
        `;
        liste.appendChild(div);
    });
    localStorage.setItem("mertiX_envanter", JSON.stringify(envanter));
}

function satinAl(id) {
    const urun = urunler.find(u => u.id === id);
    const mesaj = document.getElementById("mesajAlani");

    if (bakiye >= urun.fiyat) {
        bakiye -= urun.fiyat;
        envanter.push(urun.ad);
        mesaj.innerText = `${urun.ad} alındı! 👌`;
        mesaj.style.color = "#27ae60";
        bakiyeGuncelle();
        envanterGuncelle();
    } else {
        mesaj.innerText = "Para yetmedi hocam! ❌";
        mesaj.style.color = "#e74c3c";
    }
}

function esyaSat(index) {
    const urunAd = envanter[index];
    const urunBilgi = urunler.find(u => u.ad === urunAd);
    bakiye += urunBilgi.fiyat;
    envanter.splice(index, 1);
    bakiyeGuncelle();
    envanterGuncelle();
}

function moduDegistir() {
    document.body.classList.toggle("dark-mode");
}

function sepetiSifirla() {
    localStorage.clear();
    location.reload();
}

// Sayfa açıldığında verileri bas
function dukkaniYukle() {
    const marketAlani = document.getElementById("market-konteynir");
    if(!marketAlani) return;

    marketAlani.innerHTML = "";

    urunler.forEach(urun => {
        marketAlani.innerHTML += `
            <div class="urun-kart">
                <img src="${urun.resim}" width="50" height="50" style="object-fit:contain;"><br>
                <h3>${urun.ad}</h3>
                <p>Fiyat: ${urun.fiyat} TL</p>
                <button class="btn-satinal" onclick="satinAl(${urun.id})">Satın Al</button>
            </div>
        `;
    });
}

// Sayfa açıldığında her şeyi başlat
bakiyeGuncelle();
envanterGuncelle();
dukkaniYukle();