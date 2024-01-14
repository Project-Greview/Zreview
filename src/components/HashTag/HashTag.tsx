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
        spaceBetween={10}
        slidesPerView={4}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper: SwiperCore) => console.log(swiper)}
      >
        <SwiperSlide>
          <MarkerIcon />
          <div className="txt">텍스트</div>
        </SwiperSlide>
        <SwiperSlide>
          <MarkerIcon />
          <div className="txt">텍스트</div>
        </SwiperSlide>
        <SwiperSlide>
          <MarkerIcon />
          <div className="txt">텍스트</div>
        </SwiperSlide>
        <SwiperSlide>
          <MarkerIcon />
          <div className="txt">텍스트</div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HashTag;
