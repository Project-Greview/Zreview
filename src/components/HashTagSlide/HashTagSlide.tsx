// MODULE
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper";
import "swiper/css";
// SVG
import { ReactComponent as MarkerIcon } from "../../assets/image/icon/marker_c.svg";
// PROPS TYPE
type HashTagSlideProps = {};

const HashTagSlide: React.FC<HashTagSlideProps> = () => {
  const [activeTag, setActiveTag] = useState<Number>(-1);
  const handleClickHashtag = (index: Number) => {
    setActiveTag(index === activeTag ? -1 : index);
  };
  return (
    <div className="main_tag_slide absolute">
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper: SwiperCore) => console.log(swiper)}
      >
        <SwiperSlide
          onClick={() => handleClickHashtag(1)}
          className={`${1 === activeTag ? "active_tag" : ""}`}
        >
          <MarkerIcon />
          <div className="txt">텍스트</div>
        </SwiperSlide>
        <SwiperSlide
          onClick={() => handleClickHashtag(2)}
          className={`${2 === activeTag ? "active_tag" : ""}`}
        >
          <MarkerIcon />
          <div className="txt">텍스트</div>
        </SwiperSlide>
        <SwiperSlide
          onClick={() => handleClickHashtag(3)}
          className={`${3 === activeTag ? "active_tag" : ""}`}
        >
          <MarkerIcon />
          <div className="txt">텍스트</div>
        </SwiperSlide>
        <SwiperSlide
          onClick={() => handleClickHashtag(4)}
          className={`${4 === activeTag ? "active_tag" : ""}`}
        >
          <MarkerIcon />
          <div className="txt">텍스트</div>
        </SwiperSlide>
        <SwiperSlide
          onClick={() => handleClickHashtag(5)}
          className={`${5 === activeTag ? "active_tag" : ""}`}
        >
          <MarkerIcon />
          <div className="txt">텍스트</div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HashTagSlide;
