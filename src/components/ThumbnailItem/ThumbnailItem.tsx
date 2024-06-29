// MODULE
import { useNavigate } from "react-router-dom";
// COMPONENT
import HashTag from "components/HashTag";
// SVG
import { ReactComponent as StarIcon } from "../../assets/image/icon/Score_star.svg";
// PROPS TYPE
type ThumbnailItemProps = {
  type: string;
  data: any;
};

const ThumbnailItem: React.FC<ThumbnailItemProps> = ({ type, data }) => {
  const navigate = useNavigate();
  return (
    <ul>
      {data.map((item: any) => (
        <li
          key={item.id}
          className="thumbnail_review"
          // onClick={() => navigate(`/detail_review`, { state: item.place_name })}
          onClick={() =>
            navigate(`/place_review`, { state: { placeData: item } })
          }
        >
          <div className="img_box">
            <img
              src="https://t1.daumcdn.net/cfile/tistory/996EB03D5F06B5CD31"
              alt=""
            />
          </div>
          <div className="review_info">
            <div className="top_info flex flex_jc_sb flex_ai_c">
              <div className="title">{item.place_name}</div>
              <div className="score flex flex_ai_c">
                <StarIcon width={19} height={19} color={"#6656ff"} />
                <p>{data === null ? 4 : data.rating}</p>
              </div>
            </div>
            <div className="addr">{item.place_address}</div>
            <div className="hashtag_list flex flex_jc_s flex_ai_c">
              <ul className="flex flex_jc_s flex_ai_c">
                {item.hashtag !== null
                  ? item.hashtag.map((tag: string, index: number) => (
                      <li key={index} className="mar_rh_10">
                        <HashTag tag={tag} />
                      </li>
                    ))
                  : ""}
              </ul>
            </div>
          </div>
        </li>
      ))}
      {/* {data?.length === 0
        ? ""
        : data.map((item: any,index:number) => (
            <li
              key={index}
              className="thumbnail_review"
              onClick={() => navigate(`/detail_review`, { state: data.id })}
            >
              <div className="img_box">
                <img
                  src="https://t1.daumcdn.net/cfile/tistory/996EB03D5F06B5CD31"
                  alt=""
                />
              </div>
              <div className="review_info">
                <div className="top_info flex flex_jc_sb flex_ai_c">
                  <div className="title">{item.place_name}</div>
                  <div className="score flex flex_ai_c">
                    <StarIcon width={19} height={19} color={"#6656ff"} />
                    <p>{data === null ? 4 : data.rating}</p>
                  </div>
                </div>
                <div className="addr">
                  경기도 용인시 처인구 포곡읍 에버랜드로 199 삼성물산㈜
                </div>
                <div className="hashtag_list flex flex_jc_s flex_ai_c">
                  <ul className="flex flex_jc_s flex_ai_c">
                    {data !== null
                      ? data.hashtag.map((tag: string, index: number) => (
                          <li key={index} className="mar_rh_10">
                            <HashTag tag={tag} />
                          </li>
                        ))
                      : ""}
                  </ul>
                </div>
              </div>
            </li>
          ))} */}
    </ul>
  );
};

export default ThumbnailItem;
