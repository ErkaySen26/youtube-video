import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Scene } from "../video";
import { fontFamily } from "./theme";

export const TitleScene: React.FC<{ scene: Extract<Scene, { type: "title" }>; accent: string }> = ({
  scene,
  accent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 14 } });
  const lineWidth = interpolate(frame, [10, 35], [0, 360], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", fontFamily, color: "white" }}>
      <div style={{ fontSize: 110, fontWeight: 800, transform: `scale(${0.8 + 0.2 * pop})`, opacity: pop, textAlign: "center", padding: "0 120px" }}>
        {scene.title}
      </div>
      <div style={{ height: 10, width: lineWidth, backgroundColor: accent, borderRadius: 5, margin: "40px 0" }} />
      {scene.subtitle ? (
        <div style={{ fontSize: 52, opacity: subOpacity, color: "#c9ced8" }}>{scene.subtitle}</div>
      ) : null}
    </AbsoluteFill>
  );
};
