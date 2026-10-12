import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { FPS, TRANSITION_SECONDS, Scene, VideoContent } from "./video";
import { TitleScene } from "./scenes/TitleScene";
import { PointScene } from "./scenes/PointScene";
import { OutroScene } from "./scenes/OutroScene";
import { Caption } from "./scenes/Caption";
import { ImageScene } from "./scenes/ImageScene";

const transitionFrames = Math.round(TRANSITION_SECONDS * FPS);

// Geçişler sahneleri üst üste bindirdiği için toplam süreden geçiş sürelerini düşüyoruz.
export const totalFrames = (content: VideoContent) =>
  content.scenes.reduce((sum, s) => sum + Math.round(s.seconds * FPS), 0) -
  transitionFrames * (content.scenes.length - 1);

const renderScene = (scene: Scene, content: VideoContent) => {
  switch (scene.type) {
    case "title":
      return <TitleScene scene={scene} accent={content.accentColor} />;
    case "point":
      return <PointScene scene={scene} accent={content.accentColor} />;
    case "outro":
      return <OutroScene scene={scene} accent={content.accentColor} />;
    case "image":
      return <ImageScene image={scene.image} title={scene.title} subtitle={scene.subtitle} number={scene.number} infoLines={scene.infoLines} accent={content.accentColor} />;
  }
};

export const YoutubeVideo: React.FC<{ content: VideoContent }> = ({ content }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: content.backgroundColor }}>
      <TransitionSeries>
        {content.scenes.flatMap((scene, i) => {
          const items = [
            <TransitionSeries.Sequence key={`s${i}`} durationInFrames={Math.round(scene.seconds * FPS)}>
              <AbsoluteFill style={{ backgroundColor: content.backgroundColor }}>
                {renderScene(scene, content)}
                {scene.caption ? <Caption text={scene.caption} /> : null}
              </AbsoluteFill>
            </TransitionSeries.Sequence>,
          ];
          if (i < content.scenes.length - 1) {
            items.push(
              <TransitionSeries.Transition
                key={`t${i}`}
                presentation={i % 2 === 0 ? fade() : slide({ direction: "from-right" })}
                timing={linearTiming({ durationInFrames: transitionFrames })}
              />
            );
          }
          return items;
        })}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
