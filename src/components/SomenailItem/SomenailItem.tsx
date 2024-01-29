// MODULE

// COMPONENT
import HashTag from "components/HashTag";
// SVG
import { ReactComponent as StarIcon } from "../../assets/image/icon/Score_star.svg";
// PROPS TYPE
type SomenailItemProps = {
  type: string;
  data: any;
};

const SomenailItem: React.FC<SomenailItemProps> = ({ type, data }) => {
  return (
    <li className="somenail_review">
      <div className="img_box">
        <img
          src="https://t1.daumcdn.net/cfile/tistory/996EB03D5F06B5CD31"
          alt=""
        />
      </div>
      <div className="review_info">
        <div className="top_info flex flex_jc_sb flex_ai_c">
          <div className="title">에버랜드</div>
          <div className="score flex flex_ai_c">
            <StarIcon width={19} height={19} color={"#6656ff"} />
            <p>{data.rating}</p>
          </div>
        </div>
        <div className="addr">
          경기도 용인시 처인구 포곡읍 에버랜드로 199 삼성물산㈜
        </div>
        <div className="hashtag_list flex flex_jc_s flex_ai_c">
          <ul className="flex flex_jc_s flex_ai_c">
            {data.hashtag.map((tag: string, index: number) => (
              <li key={index}>
                <HashTag tag={tag} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
};

export default SomenailItem;
