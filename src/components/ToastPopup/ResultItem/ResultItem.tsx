// MODULE
// HOOK
// SVG
import { ReactComponent as BookMakrIcon } from "../../../assets/image/icon/Bookmark-icon.svg";
import { ReactComponent as LogoIcon } from "../../../assets/image/icon/marker_c.svg";
// PROPS TYPE
type ResultItemProps = {
  data: any;
  range: number;
};

const ResultItem: React.FC<ResultItemProps> = ({ data, range }) => {
  return (
    <li className="search_result_item flex flex_jc_sb flex_ai_c">
      <div className="type_img flex flex_jc_c flex_ai_c">
        <LogoIcon width={35} height={35} />
      </div>
      <div className="result_info flex flex_dir_c">
        <div className="store_name">{data.place_name}</div>
        <div className="store_address">{data.road_address_name}</div>
        <div className="short_info flex">
          <div className="range">{range}m</div>
          <div className="review_count"></div>
        </div>
      </div>
      <div className="bookmark">
        <BookMakrIcon color={"#959292"} />
      </div>
    </li>
  );
};

export default ResultItem;
