let bakiye = 1000;
let indirimKullanildi = false;
let envanter = []; // Boş çantamız burada duracak
const urunler = [
    { id: 1, ad: "Basketbol Topu", fiyat: 250, stok: 5 },
    { id: 2, ad: "Premium Saat", fiyat: 500, stok: 3 },
    { id: 3, ad: "Kulaklık", fiyat: 750, stok: 2 }
];

function bakiyeGuncelle() {
    document.getElementById("bakiye-miktari").innerText = bakiye;
}

function satinAl(urunId) {
    const urun = urunler.find(u => u.id === urunId);
    const mesaj = document.getElementById("mesajAlani");

    if (urun.stok > 0 && bakiye >= urun.fiyat) {
        bakiye -= urun.fiyat;
        urun.stok -= 1;
        
        // --- ÇANTA MANTIĞI BURADA ---
        envanter.push(urun.ad); // Ürünü listeye ekler
        envanterGuncelle();     // Listeyi ekranda tazeler
        // ----------------------------

        mesaj.innerText = `${urun.ad} alındı! Çantana eklendi. 👌`;
        mesaj.style.color = "#27ae60";
        bakiyeGuncelle();
    } else {
        alert("Ya para bitti ya stok!");
    }
}
function kuponUygula() {
    const kupon = document.getElementById("kuponKodu").value;
    const mesaj = document.getElementById("mesajAlani");

    if (kupon === "MERT20" && !indirimKullanildi) {
        bakiye += 200; // Mert kıyağı: İndirim yerine hediye para verelim (daha kolay)
        bakiyeGuncelle();
        indirimKullanildi = true;
        mesaj.innerText = "Kupon Kabul! 200 TL bakiye eklendi! 💸";
        mesaj.style.color = "#2ecc71";
    } else {
        mesaj.innerText = "Kupon geçersiz veya zaten kullanıldı! ❌";
        mesaj.style.color = "#e74c3c";
    }
}

function sansZari() {
    const sansliSayi = Math.floor(Math.random() * 10) + 1;
    if (sansliSayi >= 7) {
        bakiye += 100;
        bakiyeGuncelle();
        alert("BÜYÜK ŞANS! Zar: " + sansliSayi + ". 100 TL hediye kazandın! 🎯");
    } else {
        alert("Zar: " + sansliSayi + ". Şansına küs hocam! 🎲");
    }
}

function sepetiSifirla() {
    const mesaj = document.getElementById("mesajAlani");
    
    mesaj.innerText = "🧹 Dükkan temizlendi, raflar yenileniyor...";
    mesaj.style.color = "#e67e22";

    setTimeout(function() {
        location.reload();
    }, 1000);
}
function moduDegistir() { document.body.classList.toggle("dark-mode"); }

function envanterGuncelle() {
    const liste = document.getElementById("envanter-listesi");
    liste.innerHTML = ""; // Önce eski listeyi bir süpürelim

    envanter.forEach(esya => {
        let yeniEsya = document.createElement("li");
        yeniEsya.innerText = "🔹 " + esya;
        yeniEsya.style.background = "#ecf0f1";
        yeniEsya.style.padding = "5px 10px";
        yeniEsya.style.borderRadius = "5px";
        yeniEsya.style.border = "1px solid #bdc3c7";
        liste.appendChild(yeniEsya);
    });
}