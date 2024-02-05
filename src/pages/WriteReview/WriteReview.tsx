// MODULE
import { useState, ChangeEvent } from "react";
// COMPONENT
import Input from "../../components/Common/Input";
// SVG
import { ReactComponent as SearcIcon } from "../../assets/image/icon/keyword_search.svg";
import { ReactComponent as LogoIcon } from "../../assets/image/icon/marker_c.svg";

import StarScore from "./ScoreStar";
import Button from "components/Common/Button";
// PROPS TYPE
type WriteReviewProps = {};

const WriteReview: React.FC<WriteReviewProps> = () => {
  const [contents, setContents] = useState("");
  const [writeHashTag, setWriteHashTag] = useState<string>("");

  const onChangeContents = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setContents(e.target.value);
  };
  const onChangHashtag = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setWriteHashTag(e.target.value);
  };
  return (
    <div className="inner_section">
      <div className="write_form">
        <div className="location_select">
          <div className="section_title">장소명 선택</div>
          <div className="radio_box flex">
            <div className="mar_rh_5">
              <input
                type="radio"
                id="location_search"
                name="location_type"
                defaultChecked
              />
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
            id="write_location_keyword"
          />
          <label htmlFor="write_location_keyword" className="absolute">
            <SearcIcon />
          </label>
          <div className="btn flex flex_jc_c flex_ai_c">확인</div>
        </div>
        <div className="line inline_flex"></div>
        <div className="score_section">
          <div className="section_title">별점을 선택해주세요</div>
          <div className="star_section flex">
            <StarScore max={5} />
          </div>
        </div>
        <div className="line inline_flex"></div>
        <div className="input_section">
          <textarea
            name="contents"
            value={contents}
            onChange={onChangeContents}
            placeholder="리뷰를 작성해주세요 (100자 이내)"
          ></textarea>
        </div>
        <div className="hashtag_section flex flex_jc_sb flex_ai_c">
          <div className="input_box relative">
            <LogoIcon
              style={{ position: "absolute", top: "30%", left: "6%" }}
            />
            <Input
              id={"write_hashtag"}
              name={""}
              value={writeHashTag}
              onChange={onChangHashtag}
              onBlur={null}
              type={"text"}
              maxLength={10}
              placeholder={"해시태그를 입력해주세요"}
              readonly={false}
            />
          </div>
          <div className="btn_box">
            <Button
              title={"추가"}
              width={""}
              event={() => console.log("대기중")}
              styles={"btn flex flex_jc_c flex_ai_c"}
            />
          </div>
        </div>
        <div className="write_btn btn_box absolute">
          <Button
            title={"등록하기"}
            width={"100%"}
            event={() => console.log("대기중")}
            styles={"buttons flex flex_jc_c flex_ai_c width_100p cursor_p"}
          />
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
