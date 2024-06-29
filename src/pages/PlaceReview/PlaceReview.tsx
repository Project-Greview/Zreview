// MODULE
import { useEffect, useState, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
// HOOK
import { getAllTargetDataFromIndexedDB } from "api/IDBreview";
import { getPlaceDataFromIndexedDB } from "api/IDBplace";
// UTIL
import { extractNeighborhood } from "utils/location";
// COMPONENT
import Header from "components/Header";
import DetailItems from "components/DetailItems";
import HashTag from "components/HashTag";
// SVG
import { ReactComponent as Logo } from "../../assets/image/icon/marker_c.svg";
import { ReactComponent as BookMarkIcon } from "../../assets/image/icon/Bookmark-icon.svg";
import { ReactComponent as DefaultMarkerIcon } from "../../assets/image/icon/default_marker.svg";

// PROPS TYPE
type PlaceReviewType = {
  place_name: string;
  place_address: string;
  address: string;
  location_lat: number;
  location_lon: number;
};
type ReviewDataType = {
  id: number;
  place_name: string;
  place_address: string;
  content: string;
  location_lat: number;
  location_lon: number;
  created_at: string;
  updated_at: string;
  hashtag: string[];
  images: string[];
  views: number;
  rating: number;
  likes: number;
  comments: number;
  writer: string;
  profile: string;
};
const PlaceReview: React.FC<PlaceReviewType> = () => {
  const [ref, inView] = useInView();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [headerVisibility, setHeaderVisibility] = useState<boolean>(false);
  const [reviewData, setReviewData] = useState([]);
  const [placeScore, setPlaceScore] = useState<number>(0);

  const localStorageData: any = localStorage.getItem("pageData");
  const writePlaceData: any | PlaceReviewType =
    state === null
      ? {
          place_name: JSON.parse(localStorageData).place_name,
          address: JSON.parse(localStorageData).address,
          location_lat: state.placeData.location_lat,
          location_lon: state.placeData.location_lon,
          placeDepth3: state.placeData.placeDepth3,
        }
      : {
          place_name: state.placeData.place_name,
          place_address:
            state.placeData.place_address !== undefined
              ? state.placeData.place_address
              : state.placeData.road_address_name !== undefined
              ? state.placeData.road_address_name
              : state.placeData.address_name,
          location_lat:
            state.placeData.location_lat !== undefined
              ? state.placeData.location_lat
              : Number(state.placeData.y),
          location_lon:
            state.placeData.location_lon !== undefined
              ? state.placeData.location_lon
              : Number(state.placeData.x),
          placeDepth3: state.placeData.placeDepth3,
        };

  const getPlaceScore = async () => {
    try {
      const response: any = await getPlaceDataFromIndexedDB(writePlaceData);
      const score = (response[0].place_score / 1000) * 100;
      setPlaceScore(score);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    localStorage.setItem("pageData", JSON.stringify(writePlaceData));
  }, []);
  useLayoutEffect(() => {
    getAllTargetDataFromIndexedDB(state.placeData.place_name)
      .then((data: any | ReviewDataType) => {
        setReviewData(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
    getPlaceScore();
  }, [reviewData]);
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
          <img src={"http://via.placeholder.com/500x500"} alt={""} />
        </div>
        <div className="txt_info">
          <div className="store_name">{writePlaceData.place_name}</div>
          <div className="store_address flex flex_ai_c">
            <DefaultMarkerIcon />
            {writePlaceData.place_address}
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
            <div
              className="gauge absolute"
              style={{ width: `${placeScore.toFixed(1)}%` }}
            ></div>
          </div>
          <div className="status_text flex flex_jc_sb flex_ai_c">
            <div className="good flex flex_ai_c">
              <p>긍정적</p>
              <p className="point">{placeScore.toFixed(1)}%</p>
            </div>
            <div className="not_good flex flex_ai_c">
              <p>부정적</p>
              <p className="point">{(100 - placeScore).toFixed(1)}%</p>
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
          <DetailItems
            place={state.placeData.place_name}
            resultData={reviewData}
            type={"review"}
          />
        </div>
      </div>
    </div>
  );
};

export default PlaceReview;
