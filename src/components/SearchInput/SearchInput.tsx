// MODULE
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
// RECOIL STATE
import { searchTypeState } from "state/searchState";
import { toastPopupState } from "state/commonState";
import { searchKeywordState } from "state/searchState";
// HOOK
import { getCookie } from "utils/cookies";
// SVG
import { ReactComponent as HashTagIcon } from "../../assets/image/icon/marker_c.svg";
import { ReactComponent as KeywordIcon } from "../../assets/image/icon/marker_g.svg";
import { ReactComponent as HashTagSearchIcon } from "../../assets/image/icon/hashtag_search.svg";
import { ReactComponent as KeywordSearchIcon } from "../../assets/image/icon/keyword_search.svg";
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
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);

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

  // HASHTAG SEARCH
  const handleSearchHashTag = () => {
    console.log("태그검색작동!");
  };
  // LOCATION SEARCH
  const handleSearchLocation = () => {
    if (locationText.length === 0) {
      alert("검색어가 없어요.");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        (error: any) => {
          console.log(error);
        }
      );
      // if (lat && lng) {
      const ps = new window.kakao.maps.services.Places();
      const searchOption = {
        location: new window.kakao.maps.LatLng(lat, lng),
        radius: 1000,
        size: 15,
        page: 1,
      };
      // SEARCH FUNCTION
      ps.keywordSearch(locationText, placeSearchDB, searchOption);
      // }
    }
  };
  function placeSearchDB(data: any, status: any, pagination: any): any {
    if (status === window.kakao.maps.services.Status.OK) {
      // setResuultPop(true);
      // setResult({
      //   item: data,
      //   page: pagination,
      // });
      setSearchKeyword(locationText);
      setToastModal(true);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      return status;
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      return status;
    }
  }
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
