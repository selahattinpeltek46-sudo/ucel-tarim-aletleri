// Üçel — ürün sayfalarındaki FİYAT TABLOSU bu dosyadan okunur. Fiyatlar yalnızca burada güncellenir.
//
// Nasıl doldurulur:
//   guncelleme: tablonun altında "… tarihinde güncellendi" olarak görünür, ör. '11 Ekim 2026'
//   not: isteğe bağlı kısa not, ör. 'KDV dahil, atölye teslim'
//   romork: her model için bir satır:
//     { model: '3 Ton Tek Dingil', kapasite: '3 ton', olcu: '... × ... cm', fiyat: '... TL' }
//
// Bir ürünün listesi boşsa ( [] ) sayfada fiyat tablosu yerine "fiyatı WhatsApp'tan iletelim" kutusu görünür.
// Uydurma değer yazılmaz: bilinmeyen alan '' bırakılır, tabloda "—" görünür.
window.UCEL_FIYAT = {
  guncelleme: '',
  not: '',
  romork: [],
  tapan: [],
  kultivator: [],
  loader: [],
  pulluk: [],
  gubre: [],
  tanker: [],
};
