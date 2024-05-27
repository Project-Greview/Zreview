// MODULE
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper";
// HOOK
import { getHashtagRankingFromIndexedDB } from "api/IDBreview";
// STYLE
import "swiper/css";
// SVG
import { ReactComponent as MarkerIcon } from "../../assets/image/icon/marker_c.svg";
// PROPS TYPE
type HashTagSlideProps = {};

const HashTagSlide: React.FC<HashTagSlideProps> = () => {
  const [activeTag, setActiveTag] = useState<number>(-1);
  const [topHashtag, setTopHashTag] = useState<any>(null);
  const handleClickHashtag = (index: number) => {
    setActiveTag(index);
  };

  useEffect(() => {
    getHashtagRankingFromIndexedDB()
      .then((data: any) => {
        setTopHashTag(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="main_tag_slide absolute">
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper: SwiperCore) => console.log(swiper)}
      >
        {topHashtag !== null &&
          topHashtag.map((item: string, index: number) => {
            return (
              <SwiperSlide
                key={item}
                onClick={() => handleClickHashtag(index)}
                className={`${index === activeTag && "active_tag"}`}
              >
                <MarkerIcon />
                <div className="txt">{item}</div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default HashTagSlide;
