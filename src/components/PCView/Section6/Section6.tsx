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
      <div className="normal_slide">
        <Swiper
          slidesPerView={4}
          loop={true}
          speed={4500}
          autoplay={{
            delay: 0,
            disableOnInteraction: true,
          }}
          centeredSlides={true}
          modules={[Autoplay]}
          spaceBetween={50}
        >
          {PCSlideItem.HorizontalScroll_item.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="txt">{item.title}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="reverse_slide">
        <Swiper
          slidesPerView={3}
          loop={true}
          speed={4000}
          autoplay={{
            delay: 0,
            reverseDirection: true,
            disableOnInteraction: true,
          }}
          centeredSlides={true}
          modules={[Autoplay]}
          spaceBetween={50}
        >
          {PCSlideItem.HorizontalScroll_item.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="txt">{item.title}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="section_sub_tit flex flex_dir_c flex_jc_c flex_ai_c">
        <h6>SNS에서 맛집 서치 후 지도앱으로 옮겨 정보 찾고,</h6>
        <h6>검색하면 다 나오는 누구나 아는 그런 곳 말고,</h6>
        <h6>.....</h6>
        <h6>...</h6>
        <h6>.</h6>
        <p>나의 사소한 모든 리뷰들이 모여 우리동네를 만드는</p>
        <h2>
          <span>다양한 취향과 맥락</span>을 반영한 우리동네 지도
        </h2>
      </div>
    </div>
  );
};

export default Section6;
