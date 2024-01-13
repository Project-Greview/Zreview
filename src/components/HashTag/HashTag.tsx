// MODULE
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper";
import "swiper/css";
// SVG
import { ReactComponent as MarkerIcon } from "../../assets/image/icon/marker_c.svg";
// PROPS TYPE
type HashTagProps = {};

const HashTag: React.FC<HashTagProps> = () => {
  return (
    <div className="main_tag_slide absolute">
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper: SwiperCore) => console.log(swiper)}
      >
        <SwiperSlide>
          <MarkerIcon />
          <div className="txt">텍스트</div>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HashTag;
