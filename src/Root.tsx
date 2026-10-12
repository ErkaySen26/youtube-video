import { Composition } from "remotion";
import { YoutubeVideo, totalFrames } from "./YoutubeVideo";
import { FPS, video } from "./video";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="YoutubeVideo"
      component={YoutubeVideo}
      durationInFrames={totalFrames(video)}
      fps={FPS}
      width={1920}
      height={1080}
      defaultProps={{ content: video }}
    />
  );
};
