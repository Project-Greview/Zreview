// MODULE
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// JSON
import PCSlideItem from "../../../json/pcIntroData.json";
// STYLE
import "swiper/css";
import "swiper/css/pagination";
const SectionStyle = styled.div`
  padding: 4.5rem 0 16.5rem 0;
  background: #493dc1;
  background: linear-gradient(
    0deg,
    rgba(101, 86, 255, 0) 0%,
    rgba(141, 130, 254, 1) 100%
  );
  .section_tit {
    font-weight: 700;
    color: var(--white-color);
    text-align: center;
  }
  .normal_slide {
    margin-top: 5rem;
  }
  .reverse_slide {
    max-width: 80%;
    margin: 3.5rem auto 0 auto;
  }
  .swiper-wrapper .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 9.2rem;
    border-radius: 2rem;
    background: var(--white-color);
    box-shadow: 0 8px 13px rgba(135, 135, 135, 0.2);
    .txt {
      font-size: 2rem;
      font-weight: 600;
    }
  }
  .section_sub_tit {
    margin-top: 6rem;
    h6 {
      font-weight: 700;
      color: var(--white-color);
    }
    > h6:nth-child(3) {
      margin-top: 4rem;
    }
    p {
      margin-top: 10rem;
      font-size: 2.5rem;
    }
    h2 {
      margin-top: 1.5rem;
      span {
        font-size: 7rem;
        font-weight: 700;
      }
    }
  }
`;
// IMAGE

const Section6: React.FC = () => {
  return (
    <SectionStyle className="pc_section section_6">
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
    </SectionStyle>
  );
};

export default Section6;
