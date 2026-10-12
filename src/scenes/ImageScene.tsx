import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

// Parıldayan parçacık
const Particle: React.FC<{ x: number; y: number; delay: number; size: number; color: string }> = ({
  x, y, delay, size, color,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 20, delay + 60, delay + 90], [0, 1, 0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [delay, delay + 90], [0, -80], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = interpolate(frame, [delay, delay + 20, delay + 90], [0, 1, 0.3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
    />
  );
};

// Çizgi animasyonu
const AnimatedLine: React.FC<{ delay: number; width: number; color: string; y: number }> = ({ delay, width, color, y }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [delay, delay + 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 0, top: y, height: 3, width: progress * width, backgroundColor: color, borderRadius: 2, boxShadow: `0 0 12px ${color}` }} />
  );
};

// Rozet animasyonu
const Badge: React.FC<{ number: number; accent: string; delay: number }> = ({ number, accent, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 10, stiffness: 120 }, delay });
  const glow = interpolate(frame, [delay + 10, delay + 40, delay + 70], [0, 1, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{
      transform: `scale(${s})`,
      width: 100, height: 100, borderRadius: "50%",
      background: `radial-gradient(circle, ${accent}, ${accent}88)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: 44, color: "#fff",
      boxShadow: `0 0 ${30 + glow * 40}px ${accent}, 0 0 ${60 + glow * 80}px ${accent}44`,
      marginBottom: 32,
    }}>
      {number}
    </div>
  );
};

// Harf harf beliren başlık
const AnimatedTitle: React.FC<{ text: string; delay: number; fontSize: number }> = ({ text, delay, fontSize }) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0 16px", maxWidth: 1000 }}>
      {words.map((word, i) => {
        const wordDelay = delay + i * 6;
        const opacity = interpolate(frame, [wordDelay, wordDelay + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const y = interpolate(frame, [wordDelay, wordDelay + 18], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <span
            key={i}
            style={{
              opacity,
              transform: `translateY(${y}px)`,
              display: "inline-block",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              fontSize,
              color: "#fff",
              lineHeight: 1.15,
              textShadow: "0 4px 30px rgba(0,0,0,0.9)",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

// Stat/bilgi kutusu
const InfoBox: React.FC<{ text: string; delay: number; accent: string }> = ({ text, delay, accent }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const x = interpolate(frame, [delay, delay + 20], [-60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{
      opacity, transform: `translateX(${x}px)`,
      display: "flex", alignItems: "center", gap: 16,
      marginTop: 20,
    }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: accent, boxShadow: `0 0 10px ${accent}` }} />
      <span style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 32,
        color: "rgba(255,255,255,0.8)", textShadow: "0 2px 10px rgba(0,0,0,0.8)",
      }}>
        {text}
      </span>
    </div>
  );
};

type Props = {
  image: string;
  title: string;
  subtitle?: string;
  number?: number;
  accent: string;
  infoLines?: string[];
};

export const ImageScene: React.FC<Props> = ({ image, title, subtitle, number, accent, infoLines }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Arkaplan zoom
  const bgScale = interpolate(frame, [0, 180], [1.12, 1.0], { extrapolateRight: "clamp" });
  // Overlay
  const overlay = interpolate(frame, [0, 30], [0.92, 0.68], { extrapolateRight: "clamp" });
  // Köşe ışık efekti
  const cornerGlow = interpolate(frame, [20, 60], [0, 1], { extrapolateRight: "clamp" });

  // Parçacıklar verisi (sabit seed, random gibi görünen)
  const particles = [
    { x: 120, y: 800, delay: 30, size: 8, color: accent },
    { x: 240, y: 700, delay: 45, size: 5, color: "#ffffff" },
    { x: 80, y: 600, delay: 60, size: 10, color: accent },
    { x: 340, y: 900, delay: 20, size: 6, color: "#ffffff" },
    { x: 180, y: 750, delay: 75, size: 7, color: accent },
    { x: 420, y: 680, delay: 35, size: 4, color: "#ffffff" },
  ];

  // Yatay tarama çizgisi (sinematik)
  const scanY = interpolate(frame, [0, 60], [-10, 110], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      {/* Arkaplan görsel */}
      <AbsoluteFill style={{ transform: `scale(${bgScale})`, transformOrigin: "center" }}>
        <Img src={staticFile(image)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>

      {/* Ana karanlık overlay */}
      <AbsoluteFill style={{
        background: `linear-gradient(110deg, rgba(4,8,20,${overlay}) 0%, rgba(4,8,20,0.4) 60%, rgba(4,8,20,0.2) 100%)`,
      }} />

      {/* Sol kenar neon şeridi */}
      <div style={{
        position: "absolute", left: 0, top: 0, width: 6, height: "100%",
        background: `linear-gradient(to bottom, transparent, ${accent}, transparent)`,
        opacity: cornerGlow,
        boxShadow: `0 0 30px ${accent}`,
      }} />

      {/* Alt neon şeridi */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 4,
        background: `linear-gradient(to right, ${accent}, transparent)`,
        opacity: cornerGlow * 0.7,
      }} />

      {/* Sinematik tarama çizgisi (açılışta bir kez geçer) */}
      {frame < 65 && (
        <div style={{
          position: "absolute", left: 0, right: 0, top: `${scanY}%`,
          height: 2, backgroundColor: accent, opacity: 0.6,
          boxShadow: `0 0 20px ${accent}, 0 0 40px ${accent}44`,
        }} />
      )}

      {/* Parçacıklar */}
      {particles.map((p, i) => <Particle key={i} {...p} color={accent} />)}

      {/* Sol içerik paneli */}
      <AbsoluteFill style={{ padding: "80px 110px", justifyContent: "center", alignItems: "flex-start" }}>

        {/* Numara rozeti */}
        {number !== undefined && <Badge number={number} accent={accent} delay={10} />}

        {/* Animasyonlu başlık */}
        <AnimatedTitle text={title} delay={number !== undefined ? 20 : 10} fontSize={number !== undefined ? 76 : 100} />

        {/* Çizgi animasyonu */}
        <div style={{ position: "relative", marginTop: 28, marginBottom: 8 }}>
          <AnimatedLine delay={number !== undefined ? 45 : 35} width={280} color={accent} y={0} />
          <AnimatedLine delay={number !== undefined ? 55 : 45} width={140} color={`${accent}66`} y={10} />
        </div>

        {/* Alt yazı */}
        {subtitle && <InfoBox text={subtitle} delay={number !== undefined ? 55 : 45} accent={accent} />}

        {/* Ek bilgi satırları */}
        {infoLines?.map((line, i) => (
          <InfoBox key={i} text={line} delay={65 + i * 15} accent={accent} />
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
