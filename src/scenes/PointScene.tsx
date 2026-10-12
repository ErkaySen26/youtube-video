import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Scene } from "../video";
import { fontFamily } from "./theme";

export const PointScene: React.FC<{ scene: Extract<Scene, { type: "point" }>; accent: string }> = ({
  scene,
  accent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const badge = spring({ frame, fps, config: { damping: 12 } });
  const headingX = interpolate(frame, [5, 25], [-80, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const headingOpacity = interpolate(frame, [5, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bodyOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", padding: "0 180px", gap: 90, fontFamily, color: "white" }}>
      <div
        style={{
          width: 260,
          height: 260,
          borderRadius: 130,
          backgroundColor: accent,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 150,
          fontWeight: 800,
          transform: `scale(${badge})`,
          flexShrink: 0,
        }}
      >
        {scene.number}
      </div>
      <div>
        <div style={{ fontSize: 96, fontWeight: 800, opacity: headingOpacity, transform: `translateX(${headingX}px)` }}>
          {scene.heading}
        </div>
        <div style={{ fontSize: 52, marginTop: 30, color: "#c9ced8", opacity: bodyOpacity, lineHeight: 1.3 }}>
          {scene.body}
        </div>
      </div>
    </AbsoluteFill>
  );
};
