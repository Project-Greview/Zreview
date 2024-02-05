// MODULE
import { useRecoilState } from "recoil";
// RECOIL STATE
import { searchTypeState } from "state/searchState";
import { toastPopupState } from "state/commonState";
import { searchKeywordState } from "state/searchState";
// SVG
import { ReactComponent as HashTagIcon } from "../../assets/image/icon/marker_c.svg";
import { ReactComponent as KeywordIcon } from "../../assets/image/icon/marker_g.svg";
import { ReactComponent as HashTagSearchIcon } from "../../assets/image/icon/hashtag_search.svg";
import { ReactComponent as KeywordSearchIcon } from "../../assets/image/icon/keyword_search.svg";
import { ChangeEvent, useState } from "react";
// PROPS TYPE
type SearchInputProps = {
  searchType: string;
};

const SearchInput: React.FC<SearchInputProps> = ({ searchType }) => {
  const [type, setType] = useRecoilState<boolean>(searchTypeState);
  const [searchKeyword, setSearchKeyword] =
    useRecoilState<string>(searchKeywordState);
  const [toastModal, setToastModal] = useRecoilState<boolean>(toastPopupState);
  const [hashTagText, setHashTagText] = useState<string>("");
  const [locationText, setLocationText] = useState<string>("");

  const handleChangeSearcType = () => {
    setType((type) => !type);
  };

  const onChangeLocationText = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLocationText(e.target.value);
  };
  const onChangeHashTagText = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setHashTagText(e.target.value);
  };
  // LOCATION SEARCH
  const handleSearchLocation = () => {
    console.log("작동!");
    console.log("검색결과를 가져온 후");
    setSearchKeyword(locationText);
    setToastModal(true);
  };
  // HASHTAG SEARCH
  const handleSearchHashTag = () => {
    console.log("태그검색작동!");
  };
  return (
    <div className="search_keyword_box relative">
      {searchType === "double" ? (
        <div
          onClick={() => handleChangeSearcType()}
          className="type_icon absolute"
        >
          {type ? <HashTagIcon /> : <KeywordIcon />}
        </div>
      ) : (
        <div className="type_icon absolute">
          <HashTagIcon />
        </div>
      )}
      <input
        type="text"
        className="search_input"
        placeholder={type ? "해시태그를 입력해주세요" : "장소명을 입력해주세요"}
        name={type ? "set_hashtag" : "set_keyword"}
        id={type ? "set_hashtag" : "set_keyword"}
        onChange={type ? onChangeHashTagText : onChangeLocationText}
      />
      <label htmlFor={type ? "set_hashtag" : "set_keyword"}></label>
      <button
        className="search_btn absolute"
        onClick={
          type ? () => handleSearchHashTag() : () => handleSearchLocation()
        }
      >
        {type ? <HashTagSearchIcon /> : <KeywordSearchIcon />}
      </button>
    </div>
  );
};

export default SearchInput;
