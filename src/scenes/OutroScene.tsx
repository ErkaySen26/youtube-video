import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Scene } from "../video";
import { fontFamily } from "./theme";

export const OutroScene: React.FC<{ scene: Extract<Scene, { type: "outro" }>; accent: string }> = ({
  scene,
  accent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 14 } });
  const ctaPop = spring({ frame: frame - 20, fps, config: { damping: 10 } });
  const pulse = 1 + 0.04 * Math.sin(frame / 6);
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", fontFamily, color: "white", opacity }}>
      <div style={{ fontSize: 100, fontWeight: 800, transform: `scale(${0.85 + 0.15 * pop})`, textAlign: "center" }}>
        {scene.text}
      </div>
      {scene.cta ? (
        <div
          style={{
            marginTop: 60,
            padding: "28px 64px",
            borderRadius: 18,
            backgroundColor: accent,
            fontSize: 56,
            fontWeight: 700,
            transform: `scale(${ctaPop * pulse})`,
          }}
        >
          {scene.cta}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
