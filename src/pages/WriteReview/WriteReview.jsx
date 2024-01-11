// MODULE
import { useEffect, useState } from "react";
import Rating from "react-rating";
// SVG
import { ReactComponent as SearcIcon } from "../../assets/image/icon/keyword_search.svg";
import { ReactComponent as ScoreIcon } from "../../assets/image/icon/Score_star.svg";
// PROPS TYPE

const WriteReview = () => {
  const [score, setScore] = useState(3);
  return (
    <div className="inner_section">
      <div className="write_form">
        <div className="location_select">
          <div className="section_title">장소명 선택</div>
          <div className="radio_box flex">
            <div className="mar_rh_5">
              <input type="radio" id="location_search" name="location_type" />
              <label htmlFor="location_search" className="flex">
                장소 검색
              </label>
            </div>
            <div>
              <input type="radio" id="write_location" name="location_type" />
              <label htmlFor="write_location" className="flex">
                직접 입력
              </label>
            </div>
          </div>
        </div>
        <div className="search_section relative flex flex_jc_sb flex_ai_c">
          <input
            type="text"
            className="keyword_input "
            placeholder="장소명을 입력하세요"
          />
          <label htmlFor="" className="absolute">
            <SearcIcon />
          </label>
          <div className="btn flex flex_jc_c flex_ai_c">확인</div>
        </div>
        <div className="line"></div>
        <div className="score_section">
          <div className="section_title">별점을 선택해주세요</div>
          <Rating
            emptySymbol={<ScoreIcon />}
            fullSymbol={<ScoreIcon />}
            fractions={2}
            start={0}
            stop={5}
            initialRating={score}
            onChange={(rate) => setScore(rate)}
          />
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
