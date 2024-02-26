// MODULE
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// JSON
import PCSlideItem from "../../../json/pcIntroData.json";
// STYLE
import "../../../assets/styles/pcstyle.css";
import "swiper/css";
import "swiper/css/pagination";
// IMAGE

const Section6: React.FC = () => {
  return (
    <div className="pc_section section_6">
      <h6 className="section_tit">Project Goal</h6>
      <div>
        <Swiper
          slidesPerView={4}
          loop={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: true,
          }}
          modules={[Autoplay]}
        >
          {PCSlideItem.HorizontalScroll_item.map((item, index) => (
            <SwiperSlide key={index}>
              <div>{item.title}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Section6;
