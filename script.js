// Verileri Tarayıcıdan Çek
let bakiye = localStorage.getItem("mertiX_bakiye") ? parseInt(localStorage.getItem("mertiX_bakiye")) : 2000;
let envanter = localStorage.getItem("mertiX_envanter") ? JSON.parse(localStorage.getItem("mertiX_envanter")) : [];

const urunler = [
    { id: 1, ad: "Basketbol Topu", fiyat: 250, resim: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Basketball.png/200px-Basketball.png" },
    { id: 2, ad: "Premium Saat", fiyat: 500, resim: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200" },
    { id: 3, ad: "Kulaklık", fiyat: 750, resim: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200" },
    { id: 4, ad: "Gamer Kulaklık", fiyat: 1500, resim: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200" },
{ id: 5, ad: "Gaming Mouse", fiyat: 250, resim: "https://img.icons8.com/fluency/96/mouse.png" }
];
function bakiyeGuncelle() {
    document.getElementById("bakiye-miktari").innerText = bakiye;
    localStorage.setItem("mertiX_bakiye", bakiye);
}

function envanterGuncelle() {
    const envanterAlani = document.getElementById("envanter-listesi");
    if (!envanterAlani) return;

    envanterAlani.innerHTML = ""; // Çantayı tazelemeden önce içini boşalt

    envanter.forEach((urunAd, index) => {
        const urun = urunler.find(u => u.ad === urunAd);
        
        if (urun) {
            envanterAlani.innerHTML += `
                <div style="background: white; padding: 10px; border-radius: 8px; border: 1px solid #ddd; text-align: center; width: 85px; position: relative;">
                    <img src="${urun.resim}" width="45" height="45" style="object-fit: contain;"><br>
                    <small style="color: #333; font-weight: bold; font-size: 10px; display: block; margin-top: 5px;">${urun.ad}</small>
                    
                    <button onclick="esyaSat(${index})" style="background: #ff4757; color: white; border: none; padding: 2px 5px; font-size: 9px; border-radius: 4px; cursor: pointer; margin-top: 5px; width: 100%;">Sat</button>
                </div>
            `;
        }
    });

    localStorage.setItem("mertiX_envanter", JSON.stringify(envanter));
};

    // Alışveriş listesini tarayıcı hafızasına kaydet
    localStorage.setItem("mertiX_envanter", JSON.stringify(envanter));


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
        dukkaniYukle(); // Her satın almadan sonra dükkanı ve butonları tazele
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
    // Paranın yetip yetmediğini kontrol edip değişkenlere atayalım
    const yetersizBakiye = bakiye < urun.fiyat;
    const butonOzellikleri = yetersizBakiye ? 'disabled style="background-color: #ccc; cursor: not-allowed;"' : '';
    const butonYazisi = yetersizBakiye ? 'Yetersiz Bakiye' : 'Satın Al';

    marketAlani.innerHTML += `
        <div class="urun-kart">
            <img src="${urun.resim}" width="50" height="50" style="object-fit:contain;"><br>
            <h3>${urun.ad}</h3>
            <p>Fiyat: ${urun.fiyat} TL</p>
            <button class="btn-satinal" onclick="satinAl(${urun.id})" ${butonOzellikleri}>${butonYazisi}</button>
        </div>
    `;
});  };


// Sayfa açıldığında her şeyi başlat
bakiyeGuncelle();
envanterGuncelle();
dukkaniYukle();
function esyaSat(index) {
    const satilanUrunAd = envanter[index];
    const urun = urunler.find(u => u.ad === satilanUrunAd);

    if (urun) {
        bakiye += urun.fiat || urun.fiyat; // Parayı geri iade et
        envanter.splice(index, 1); // Ürünü çantadan çıkar
        
        // Her şeyi güncelle
document.getElementById("bakiye-miktari").innerText = bakiye;
        envanterGuncelle();
        dukkaniYukle();
        
        const mesaj = document.getElementById("mesajAlani");
        if(mesaj) mesaj.innerText = `${satilanUrunAd} satıldı, paran iade edildi! 💸`;
    }
}