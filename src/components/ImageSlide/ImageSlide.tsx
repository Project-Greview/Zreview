// MODULE
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
// PROPS TYPE
type ImageSlideProps = {
  boxSize: number | undefined;
};
const ImageSlide: React.FC<ImageSlideProps> = ({ boxSize }) => {
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="custom_pagination ' + className + '"></span>';
    },
  };
  return (
    <Swiper
      pagination={pagination}
      modules={[Pagination]}
      className="image_slider"
    >
      <SwiperSlide
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxHeight: boxSize,
          height: boxSize,
          overflow: "hidden",
        }}
      >
        <div className="img_box">
          <img src={"http://via.placeholder.com/500x500"} alt={""} />
        </div>
      </SwiperSlide>
      <SwiperSlide
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxHeight: boxSize,
          height: boxSize,
          overflow: "hidden",
        }}
      >
        <div className="img_box">
          <img src={"http://via.placeholder.com/500x500"} alt={""} />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default ImageSlide;
