// Ürün sayfaları (römork, tapan …) ortak betiği.
// - Fiyat tablosu: assets/fiyatlar.js doluysa tablo, boşsa "WhatsApp'tan fiyat isteyin" kutusu
// - Fiyat formu: cevaplardan hazır WhatsApp mesajı
// - Kaynak etiketi: ?k=ig gibi açılırsa mesaj "(Instagram)" ile başlar (oturum boyunca hatırlanır)
// - Fotoğraf büyütme
(function () {
  var TEL = '905324803051';
  var ADLAR = { instagram: 'Instagram', ig: 'Instagram', facebook: 'Facebook', fb: 'Facebook', marketplace: 'Marketplace', mp: 'Marketplace', tiktok: 'TikTok', tt: 'TikTok', whatsapp: 'WhatsApp', wa: 'WhatsApp', qr: 'QR', site: 'Site' };
  var kaynak = null;
  try {
    var k = new URLSearchParams(location.search).get('k');
    if (k) sessionStorage.setItem('k', k); else k = sessionStorage.getItem('k');
    kaynak = k && ADLAR[k.toLowerCase()];
  } catch (e) {}
  function waAdres(mesaj) { return 'https://wa.me/' + TEL + '?text=' + encodeURIComponent((kaynak ? '(' + kaynak + ') ' : '') + mesaj); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  // Bütün WhatsApp bağlantıları: data-msg varsa o, yoksa bağlantıdaki hazır metin, o da yoksa genel karşılama; başına kaynak etiketi
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(function (a) {
    if (a.closest('.mobile-bar')) return;
    var mesaj = a.getAttribute('data-msg');
    if (!mesaj) { try { mesaj = new URL(a.href).searchParams.get('text'); } catch (e) {} }
    a.href = waAdres(mesaj || 'Merhaba, Üçel Tarım Aletleri sitenizden yazıyorum.');
  });
  document.querySelectorAll('.mobile-bar a[href^="https://wa.me/"]').forEach(function (a) {
    var ad = document.body.getAttribute('data-urun-ad');
    a.href = waAdres(ad ? 'Merhaba, sitenizdeki ' + ad + ' için fiyat almak istiyorum.' : 'Merhaba, Üçel Tarım Aletleri sitenizden yazıyorum.');
  });

  // Fiyat tablosu
  var kutu = document.getElementById('fiyatTablo');
  var F = window.UCEL_FIYAT || {};
  if (kutu) {
    var urun = kutu.getAttribute('data-urun'), ad = kutu.getAttribute('data-ad');
    var satir = (F[urun] || []).filter(function (m) { return m && m.model; });
    if (satir.length) {
      var d = function (v) { return v ? esc(v) : '—'; };
      kutu.innerHTML = '<div class="us-tablo-kap"><table class="us-tablo"><thead><tr><th>Model</th><th>Kapasite</th><th>Ölçü</th><th>Fiyat</th><th></th></tr></thead><tbody>' +
        satir.map(function (m) {
          return '<tr><th>' + esc(m.model) + '</th><td>' + d(m.kapasite) + '</td><td>' + d(m.olcu) + '</td><td class="us-fiyat">' + d(m.fiyat) + '</td><td><a class="us-sor" target="_blank" rel="noopener" href="' +
            waAdres('Merhaba, sitenizdeki ' + ad + ' — ' + m.model + (m.fiyat ? ' (' + m.fiyat + ')' : '') + ' hakkında bilgi almak istiyorum.') + '">Bu modeli sor</a></td></tr>';
        }).join('') + '</tbody></table></div>' +
        '<p class="us-kucuk">' + (F.guncelleme ? esc(F.guncelleme) + ' tarihinde güncellendi. ' : '') + (F.not ? esc(F.not) : '') + '</p>';
      kutu.hidden = false;
      var bos = document.getElementById('fiyatBos');
      if (bos) bos.hidden = true;
    }
  }

  // Fiyat formu → hazır WhatsApp mesajı
  document.querySelectorAll('form.us-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ad = document.body.getAttribute('data-urun-ad') || 'ürün';
      var satirlar = [form.getAttribute('data-giris') || 'Merhaba, sitenizdeki ' + ad + ' için fiyat almak istiyorum.'];
      // Her soru kendi etiketiyle mesaja eklenir: <fieldset data-etiket> (çoklu seçim) ve <input data-etiket>
      form.querySelectorAll('fieldset[data-etiket], input[data-etiket]').forEach(function (alan) {
        var deger;
        if (alan.tagName === 'FIELDSET') deger = [].map.call(alan.querySelectorAll('input:checked'), function (i) { return i.value; }).join(', ');
        else deger = alan.value.trim() + (alan.getAttribute('data-birim') && /^\d+$/.test(alan.value.trim()) ? ' ' + alan.getAttribute('data-birim') : '');
        if (deger.trim()) satirlar.push(alan.getAttribute('data-etiket') + ': ' + deger);
      });
      window.open(waAdres(satirlar.join('\n')), '_blank', 'noopener');
    });
  });

  // Fotoğraf büyütme
  var dlg = document.getElementById('usKutu');
  if (dlg && dlg.showModal) {
    document.querySelectorAll('button.us-buyut').forEach(function (b) {
      b.addEventListener('click', function () {
        var alt = b.querySelector('img').alt;
        dlg.querySelector('img').src = b.getAttribute('data-buyuk');
        dlg.querySelector('img').alt = alt;
        dlg.querySelector('p').textContent = alt;
        dlg.showModal();
      });
    });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  }
})();
