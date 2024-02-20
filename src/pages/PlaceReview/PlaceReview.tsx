// MODULE
import { useEffect, useState, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
// HOOK
// COMPONENT
import Header from "components/Header";
import DetailItem from "components/DetailItem";
import HashTag from "components/HashTag";
// SVG
import { ReactComponent as Logo } from "../../assets/image/icon/marker_c.svg";
import { ReactComponent as BookMarkIcon } from "../../assets/image/icon/Bookmark-icon.svg";
import { ReactComponent as DefaultMarkerIcon } from "../../assets/image/icon/default_marker.svg";

// PROPS TYPE

const PlaceReview: React.FC = () => {
  const [ref, inView] = useInView();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [headerVisibility, setHeaderVisibility] = useState<boolean>(false);
  const [reviewData, setReviewData] = useState([]);

  const writePlaceData = {
    place_name: state.placeData.place_name,
    address:
      state.placeData.road_address_name !== undefined
        ? state.placeData.road_address_name
        : state.placeData.address_name,
    location_lat: state.placeData.y,
    location_lng: state.placeData.x,
  };
  console.log(writePlaceData);
  useEffect(() => {
    if (inView) {
      setHeaderVisibility(true);
    } else {
      setHeaderVisibility(false);
    }
  }, [inView]);

  return (
    <div>
      <div className="place_info_header relative">
        <div className="type_img absolute flex flex_jc_c flex_ai_c">
          <Logo width={50} height={50} />
        </div>
        <div className="place_representative img_box flex flex_jc_c flex_ai_c">
          {" "}
          <img src={"http://via.placeholder.com/500x500"} alt={""} />
        </div>
        <div className="txt_info">
          <div className="store_name">{writePlaceData.place_name}</div>
          <div className="store_address flex flex_ai_c">
            <DefaultMarkerIcon />
            {writePlaceData.address}
          </div>
        </div>
        <div className=" btn_box flex flex_jc_sb flex_ai_c">
          <button className="store_bookmark">
            <BookMarkIcon color={"#ffffff"} />
          </button>
          <button
            className="store_review_write"
            onClick={() => navigate("/write", { state: writePlaceData })}
          >
            리뷰쓰기
          </button>
        </div>
        <div className="hashtag_box">
          <p>ZReview Tag</p>
          <ul></ul>
        </div>
        <div className="store_status_bar">
          <div className="status_bar relative">
            <div className="gauge absolute"></div>
          </div>
          <div className="status_text flex flex_jc_sb flex_ai_c">
            <div className="good flex flex_ai_c">
              <p>긍정적</p>
              <p className="point">%</p>
            </div>
            <div className="not_good flex flex_ai_c">
              <p>부정적</p>
              <p className="point">%</p>
            </div>
          </div>
        </div>
        <div ref={ref}></div>
      </div>

      <div className="place_body sticky_top">
        {!headerVisibility ? (
          <Header type={0} title={state.placeData.place_name} />
        ) : (
          ""
        )}
        <div className="point_txt">ZReview</div>
        <div className={`${!headerVisibility ? "active" : ""}`}>
          <DetailItem place={state.placeData.place_name} />
        </div>
      </div>
    </div>
  );
};

export default PlaceReview;
