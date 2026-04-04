let toplamTutar = 0;
// Başlangıç Stokları
let saatStok = 3;
let kulaklikStok = 2;

function sepeteUrunEkle(fiyat, urunAdi) {
    let isim = document.getElementById("kullaniciAdi").value;
    let mesaj = document.getElementById("mesajAlani");

    if (isim === "") {
        mesaj.innerText = "Lütfen önce isminizi yazın! ⚠️";
        mesaj.style.color = "#ffc107";
        return;
    }

    // BÜTÇE KONTROLÜ
    if (toplamTutar + fiyat > 1500) {
        mesaj.innerText = "Bütçeyi aştın Mert hocam! 🛑";
        mesaj.style.color = "#dc3545";
        return;
    }

    // STOK KONTROLÜ VE GÜNCELLEME
    if (urunAdi === 'Saat' && saatStok > 0) {
        saatStok--;
        toplamTutar += fiyat;
        document.getElementById("saatStok").innerText = "Kalan: " + saatStok + " Adet";
        if (saatStok === 0) {
            document.getElementById("saatButon").disabled = true;
            document.getElementById("saatButon").innerText = "Tükendi";
        }
    } 
    else if (urunAdi === 'Kulaklık' && kulaklikStok > 0) {
        kulaklikStok--;
        toplamTutar += fiyat;
        document.getElementById("kulaklikStok").innerText = "Kalan: " + kulaklikStok + " Adet";
        if (kulaklikStok === 0) {
            document.getElementById("kulaklikButon").disabled = true;
            document.getElementById("kulaklikButon").innerText = "Tükendi";
        }
    }

    // EKRAN GÜNCELLEME
    document.getElementById("toplamTutarAlani").innerText = "Toplam: " + toplamTutar + " TL";
    mesaj.innerText = "Harika " + isim + "! " + urunAdi + " eklendi. ✅";
    mesaj.style.color = "#28a745";
    confetti();
}

function sepetiSifirla() {
    toplamTutar = 0;
    saatStok = 3;
    kulaklikStok = 2;
    
    // Her şeyi eski haline getir
    document.getElementById("toplamTutarAlani").innerText = "Toplam: 0 TL";
    document.getElementById("saatStok").innerText = "Kalan: 3 Adet";
    document.getElementById("kulaklikStok").innerText = "Kalan: 2 Adet";
    document.getElementById("saatButon").disabled = false;
    document.getElementById("saatButon").innerText = "Ekle";
    document.getElementById("kulaklikButon").disabled = false;
    document.getElementById("kulaklikButon").innerText = "Ekle";
    document.getElementById("mesajAlani").innerText = "Dükkan sıfırlandı! 🧹";
}function kuponuUygula() {
    let kupon = document.getElementById("kuponKodu").value;
    let mesaj = document.getElementById("mesajAlani");

    // "MERT20" kuponu kontrolü
    if (kupon === "MERT20") {
        if (toplamTutar > 0) {
            let indirimMiktari = toplamTutar * 0.20; // %20 hesapla
            toplamTutar = toplamTutar - indirimMiktari; // Yeni tutarı belirle
            
            // Ekranı güncelle
            document.getElementById("toplamTutarAlani").innerText = "Toplam: " + toplamTutar + " TL";
            mesaj.innerText = "Kupon Kabul Edildi! %20 İndirim Uygulandı. 💸";
            mesaj.style.color = "#28a745";
            confetti(); // Başarıyı kutla!
        } else {
            mesaj.innerText = "Önce sepete bir şeyler ekle Mert hocam!";
            mesaj.style.color = "#ffc107";
        }
    } else {
        mesaj.innerText = "Geçersiz Kupon! ❌";
        mesaj.style.color = "#dc3545";
    }
}function moduDegistir() {
    // Sayfanın gövdesine (body) 'light-mode' özelliğini ekle veya çıkar
    document.body.classList.toggle("light-mode");
    
    // Mesaj alanına bilgi verelim
    let mesaj = document.getElementById("mesajAlani");
    if (document.body.classList.contains("light-mode")) {
        mesaj.innerText = "Gündüz modu aktif! ☀️";
        mesaj.style.color = "#212529";
    } else {
        mesaj.innerText = "Gece modu aktif! 🌙";
        mesaj.style.color = "#28a745";
    }
}