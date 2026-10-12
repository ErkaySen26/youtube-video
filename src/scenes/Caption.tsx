import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "./theme";

// Altyazı: kelimeler sahne boyunca sırayla belirir.
export const Caption: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const words = text.split(" ");
  const start = 8;
  const end = Math.max(start + 1, durationInFrames - 20);
  const shown = Math.ceil(interpolate(frame, [start, end], [0, words.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 70 }}>
      <div
        style={{
          fontFamily,
          fontSize: 44,
          fontWeight: 600,
          color: "white",
          backgroundColor: "rgba(0,0,0,0.65)",
          padding: "14px 32px",
          borderRadius: 12,
          maxWidth: 1500,
          textAlign: "center",
        }}
      >
        {words.map((w, i) => (
          <span key={i} style={{ opacity: i < shown ? 1 : 0.25 }}>
            {w}{" "}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};
