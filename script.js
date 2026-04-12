
let bakiye = localStorage.getItem("mertiX_bakiye") ? parseInt(localStorage.getItem("mertiX_bakiye")) : 1000;
let envanter = localStorage.getItem("mertiX_envanter") ? JSON.parse(localStorage.getItem("mertiX_envanter")) : [];
let indirimKullanildi = false;
const urunler = [
    { id: 1, ad: "Basketbol Topu", fiyat: 250, stok: 10 },
    { id: 2, ad: "Premium Saat", fiyat: 500, stok: 5 },
    { id: 3, ad: "Kulaklık", fiyat: 750, stok: 3 }
];


function bakiyeGuncelle() {
    document.getElementById("bakiye-miktari").innerText = bakiye;
    verileriKaydet(); // Her değişimde "Save" yapar
}


function envanterGuncelle() {
    const liste = document.getElementById("envanter-listesi");
    liste.innerHTML = ""; 

    envanter.forEach(esya => {
        let yeniEsya = document.createElement("li");
        yeniEsya.innerText = "🔹 " + esya;
        // ... (diğer stil kodların burada duruyor zaten)
        liste.appendChild(yeniEsya);
    });
    verileriKaydet(); // Çanta değişince de "Save" yapar
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
    liste.innerHTML = ""; // Listeyi temizle

    envanter.forEach((esya, index) => {
        let yeniEsya = document.createElement("li");
        
        // Şık görünmesi için stil verelim
        yeniEsya.style.display = "flex";
        yeniEsya.style.justifyContent = "space-between";
        yeniEsya.style.alignItems = "center";
        yeniEsya.style.padding = "8px";
        yeniEsya.style.marginBottom = "5px";
        yeniEsya.style.background = "#f9f9f9";
        yeniEsya.style.border = "1px solid #ddd";
        yeniEsya.style.borderRadius = "5px";

        // İÇERİK: Eşya ismi ve Sat butonu
        yeniEsya.innerHTML = `
            <span>🔹 ${esya}</span>
            <button onclick="esyaSat(${index})" style="background-color: #ff4d4d; color: white; border: none; padding: 4px 10px; cursor: pointer; border-radius: 4px;">Sat</button>
        `;
        
        liste.appendChild(yeniEsya);
    });

    verileriKaydet(); // Hafızaya son hali yaz
} 
bakiyeGuncelle();
envanterGuncelle();
function verileriKaydet() {
    localStorage.setItem("mertiX_bakiye", bakiye);
    localStorage.setItem("mertiX_envanter", JSON.stringify(envanter));
}
function esyaSat(sirasi) {
    let satilanEsyaAdi = envanter[sirasi];
    
    // Ürünün fiyatını ana listeden bulalım ki parayı iade edebilelim
    let urunBilgisi = urunler.find(u => u.ad === satilanEsyaAdi);
    
    if (urunBilgisi) {
        bakiye += urunBilgisi.fiyat; // Parayı cüzdana geri koy
        envanter.splice(sirasi, 1);  // Diziden tam o sıradaki elemanı söküp at
        
        bakiyeGuncelle();   // Cüzdanı ekranda tazele
        envanterGuncelle(); // Listeyi ekranda tazele
        
        console.log(satilanEsyaAdi + " başarıyla satıldı ve " + urunBilgisi.fiyat + " TL iade edildi.");
    }
}