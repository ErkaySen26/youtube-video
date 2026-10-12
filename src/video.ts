// Videonun içeriği burada. Yeni bir video için genelde sadece bu dosyayı değiştirmek yeterli.
// Süreler saniye cinsinden. Video 1920x1080 (YouTube 16:9), 30 fps.

export type Scene =
  | { type: "title"; title: string; subtitle?: string; seconds: number; caption?: string }
  | { type: "point"; number: number; heading: string; body: string; seconds: number; caption?: string }
  | { type: "outro"; text: string; cta?: string; seconds: number; caption?: string }
  | { type: "image"; image: string; title: string; subtitle?: string; number?: number; infoLines?: string[]; seconds: number; caption?: string };

export type VideoContent = {
  accentColor: string;
  backgroundColor: string;
  scenes: Scene[];
};

export const video: VideoContent = {
  accentColor: "#1e90ff",
  backgroundColor: "#050a1e",
  scenes: [
    {
      type: "image",
      image: "k9_title.png",
      title: "Polis Köpeği Nasıl Eğitilir?",
      subtitle: "K9 biriminin sırları",
      infoLines: ["Eğitim süresi: 1-2 yıl", "Başarı oranı: %30'dan az"],
      seconds: 7,
      caption: "Polis köpekleri yıllarca süren özel eğitimden geçer.",
    },
    {
      type: "image",
      image: "k9_selection.png",
      title: "Doğru Köpeği Seçmek",
      subtitle: "Alman Çoban ve Belçika Malinois ırkları seçilir.",
      number: 1,
      infoLines: ["Zeka ve itaat testleri uygulanır", "Çoğu aday elenir"],
      seconds: 8,
      caption: "Her köpek bu eğitimi tamamlayamaz; seçim kriterleri çok serttir.",
    },
    {
      type: "image",
      image: "k9_commands.png",
      title: "Temel Komut Eğitimi",
      subtitle: "Otur, dur, gel, takip et — anında uyum şart.",
      number: 2,
      infoLines: ["Oyun ve ödül tabanlı yöntem", "Ceza asla kullanılmaz"],
      seconds: 8,
      caption: "Eğitim oyun ve ödül tabanlıdır; ceza kullanılmaz.",
    },
    {
      type: "image",
      image: "k9_scent.png",
      title: "Koku Eğitimi",
      subtitle: "Uyuşturucu, patlayıcı, kayıp kişi tespiti.",
      number: 3,
      infoLines: ["Köpek burnu insandan 40x güçlü", "Metrelerce uzaktan algılar"],
      seconds: 8,
      caption: "Köpeğin burnu insanın 40 kat üzerinde koku alır.",
    },
    {
      type: "image",
      image: "k9_protection.png",
      title: "Koruma ve Müdahale",
      subtitle: "Şüpheli takibi ve kontrollü müdahale.",
      number: 4,
      infoLines: ["Komut olmadan asla müdahale etmez", "Bırakma komutu hayati önem taşır"],
      seconds: 8,
      caption: "Köpek, komut olmadan asla müdahale etmez.",
    },
    {
      type: "image",
      image: "k9_outro.png",
      title: "Polis Köpekleri Gerçek Kahramanlardır",
      subtitle: "Abone ol — daha fazlası gelsin 🐾",
      infoLines: ["Beğeni bırakmayı unutma!"],
      seconds: 7,
      caption: "Bu videoyu beğendiysen abone olmayı unutma!",
    },
  ],
};

export const FPS = 30;
export const TRANSITION_SECONDS = 0.6;
