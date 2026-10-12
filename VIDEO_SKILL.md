---
name: youtube-video
description: Kullanıcı bir YouTube videosu istediğinde (konu, süre, maddeler) bu Remotion projesinde videoyu hazırlayıp out/video.mp4 olarak render et.
---

# YouTube videosu üretme (Remotion, 16:9)

Bu proje 1920x1080, 30 fps YouTube videoları üretir. Kullanıcı Türkçe yazar; ekrandaki metinler ve cevapların da Türkçe olsun.

## Akış

1. **İsteği netleştir.** Konu, toplam süre ve anlatılacak maddeler belli değilse makul bir varsayım seç (ör. 30-60 sn, 3 madde) ve bunu kullanıcıya bir cümleyle söyle. Gereksiz soru sorma.
2. **İçeriği sahnelere böl** ve `src/video.ts` dosyasındaki `video` nesnesini güncelle:
   - Bir `title` sahnesiyle başla, her madde için bir `point` sahnesi, sonda bir `outro`.
   - Her sahnenin `seconds` değerini, okunacak metnin uzunluğuna göre ver (kabaca 2.5 kelime/sn, en az 3 sn).
   - Her sahneye kısa bir `caption` (altyazı) yaz.
   - Sahnelerin süreleri toplamı, istenen süre + (sahne sayısı - 1) × 0.5 sn olmalı (geçişler üst üste biner).
   - İstenirse `accentColor` ve `backgroundColor` ile renkleri değiştir.
3. **Yeni bir sahne türü gerekiyorsa** (grafik, liste, görsel, video klip) `src/scenes/` altına yeni bir bileşen yaz, `Scene` tipine ekle ve `src/YoutubeVideo.tsx` içindeki `renderScene` fonksiyonuna bağla. Animasyonlar için yalnızca `useCurrentFrame`, `interpolate` ve `spring` kullan; CSS animasyonu kullanma (render'da çalışmaz).
4. **Kullanıcının dosyaları:** Görsel, müzik veya video klipleri `public/` klasörüne koy ve `staticFile("dosya.mp4")` ile kullan (`<Img>`, `<Audio>`, `<OffthreadVideo>`).
5. **Kontrol et:** `npx tsc` hatasız geçmeli. Sonra `npm run render` çalıştır.
6. **Gözle kontrol:** Render'dan sonra birkaç kare çıkar (ör. `npx remotion still src/index.ts YoutubeVideo out/kare.png --frame=60`) ve taşan ya da üst üste binen yazı var mı bak. Sorun varsa düzelt ve tekrar render et.
7. **Teslim:** Kullanıcıya `out/video.mp4` dosyasının hazır olduğunu ve videonun kısa bir özetini söyle (sahne sayısı, süre).

## Kurallar

- Ekran metinleri kısa olsun: başlık en fazla ~6 kelime, açıklama en fazla ~12 kelime.
- Bu kit konuşmayı otomatik yazıya dökmez. Kullanıcı kendi sesli anlatımını eklemek ve konuşmaya senkron altyazı isterse, bunun için ayrıca Whisper (`@remotion/install-whisper-cpp`) kurulması gerektiğini söyle ve onay iste.
- Telif hakkı olan müzik veya görselleri internetten indirip videoya koyma; kullanıcının verdiği dosyaları kullan.
