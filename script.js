let bakiye = 1000;
let toplamTutar = 0;
let saatStok = 3;
let kulaklikStok = 2;
let indirimKullanildi = false;

function urunSatinal(fiyat, urunAdi) {
    const bakiyeGosterge = document.getElementById("userBalance");
    const toplamGosterge = document.getElementById("toplamTutarAlani");
    const mesaj = document.getElementById("mesajAlani");

    if (bakiye >= fiyat) {
        // Stok Kontrolü
        if (urunAdi === 'Premium Saat') {
            if (saatStok > 0) { saatStok--; document.getElementById("saatStok").innerText = "Kalan: " + saatStok + " Adet"; }
            else { mesaj.innerText = "Saat bitti Mert hocam! ⌚"; return; }
        }
        if (urunAdi === 'Oyun Kulaklığı') {
            if (kulaklikStok > 0) { kulaklikStok--; document.getElementById("kulaklikStok").innerText = "Kalan: " + kulaklikStok + " Adet"; }
            else { mesaj.innerText = "Kulaklık bitti Mert hocam! 🎧"; return; }
        }

        bakiye -= fiyat;
        toplamTutar += fiyat;
        
        bakiyeGosterge.innerText = bakiye;
        toplamGosterge.innerText = "Toplam: " + toplamTutar + " TL";
        
        mesaj.innerText = urunAdi + " başarıyla alındı! 👌";
        mesaj.style.color = "#2ecc71";
        confetti(); // KONFETİ!
        
        setTimeout(() => { mesaj.innerText = ""; }, 3000);
    } else {
        mesaj.innerText = "Yetersiz bakiye hocam! ❌";
        mesaj.style.color = "#e74c3c";
    }
}

function kuponUygula() {
    const kupon = document.getElementById("kuponKodu").value;
    const mesaj = document.getElementById("mesajAlani");
    const toplamGosterge = document.getElementById("toplamTutarAlani");

    if (kupon === "MERT20" && !indirimKullanildi) {
        if (toplamTutar > 0) {
            let indirim = toplamTutar * 0.20;
            toplamTutar -= indirim;
            toplamGosterge.innerText = "Toplam: " + toplamTutar + " TL (İndirimli!)";
            indirimKullanildi = true;
            mesaj.innerText = "Kupon kabul edildi! %20 indirim yapıldı 💸";
            mesaj.style.color = "#2ecc71";
            confetti();
        } else {
            mesaj.innerText = "Önce ürün almalısın hocam! 🛒";
        }
    } else if (indirimKullanildi) {
        mesaj.innerText = "Kupon zaten kullanıldı! 🛑";
    } else {
        mesaj.innerText = "Geçersiz kupon! ❌";
    }
}

function sepetiSifirla() {
    location.reload(); // En temizi sayfayı yenilemek
}

function moduDegistir() {
    document.body.classList.toggle("dark-mode");
}