// MODULE
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
// PROPS TYPE
type ImageSlideProps = {
  boxSize: number | undefined;
  images: any;
};
const ImageSlide: React.FC<ImageSlideProps> = ({ boxSize, images }) => {
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="custom_pagination ' + className + '"></span>';
    },
  };
  return (
    <>
      {images.length === 0 ? (
        ""
      ) : images.length === 1 ? (
        <div className="slider">
          <div
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
              <img src={images[0]} alt={""} />
            </div>
          </div>
        </div>
      ) : (
        <Swiper
          pagination={pagination}
          modules={[Pagination]}
          className="image_slider"
        >
          {images.map((img: any) => (
            <SwiperSlide
              key={img}
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
                <img src={img} alt={""} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default ImageSlide;
