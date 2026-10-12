# YouTube Video Projesi

Remotion ile, yazılı bir istekten 16:9 YouTube videosu üreten proje.

## Bir kerelik kurulum

1. [Node.js](https://nodejs.org) LTS sürümünü kur.
2. Bu klasörde terminal aç ve çalıştır:
   ```
   npm install
   ```

## Kullanım

- **Önizleme:** `npm run dev` (tarayıcıda Remotion Studio açılır, videoyu kare kare izleyebilirsin)
- **Video çıkar:** `npm run render` (sonuç: `out/video.mp4`)

## Claude ile video üretmek

Bu klasörde Claude Code'u aç ve ne istediğini yaz, örneğin:

> 60 saniyelik, YouTube için, "evde verimli çalışmanın 3 yolu" konulu bir video yap.

Claude, `VIDEO_SKILL.md` dosyasındaki talimatlara (bu talimatlar `CLAUDE.md` üzerinden otomatik okunur) göre `src/video.ts` dosyasını günceller ve videoyu render eder.

Videoyu elle değiştirmek istersen sadece `src/video.ts` dosyasındaki metinleri ve süreleri düzenlemen yeterli.

## Notlar

- Remotion bireyler ve en fazla 3 kişilik ekipler için ücretsiz; daha büyük şirketler için lisans gerekir.
- Kendi görsel, müzik ve videolarını `public/` klasörüne koyabilirsin.
