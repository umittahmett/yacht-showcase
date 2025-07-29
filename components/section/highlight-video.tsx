'use client'

import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { HighLightVideoProps } from "@/types";

const HighLightVideo:React.FC<HighLightVideoProps> = ({videoSrc, thumbnailAlt, thumbnailSrc})=>{
  return (
    <div className="relative">
      <HeroVideoDialog
        animationStyle="from-center"
        videoSrc={videoSrc}
        thumbnailSrc={thumbnailSrc}
        thumbnailAlt={thumbnailAlt}
      />
    </div>
  );
}

export default HighLightVideo