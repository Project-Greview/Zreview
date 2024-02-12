// MODULE
import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
// RECOIL STATE
import {
  searchTypeState,
  searchKeywordState,
  locationSearchResultState,
  searchResultState,
} from "state/searchState";
import { toastPopupState, paginationState } from "state/commonState";

// HOOK
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
  const [locationResult, setLocationResult] = useRecoilState(
    locationSearchResultState
  );
  const [resultData, setResultData] = useRecoilState<any>(searchResultState);
  const [hashTagText, setHashTagText] = useState<string>("");
  const [locationText, setLocationText] = useState<string>("");

  const pages = useRecoilValue(paginationState);
  const cleanResult = useResetRecoilState(locationSearchResultState);
  const cleanPages = useResetRecoilState(paginationState);

  const handleChangeSearcType = () => {
    setType((type) => !type);
    setToastModal(false);
    setLocationText("");
    setHashTagText("");
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
      cleanResult();
      cleanPages();
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          const ps = new window.kakao.maps.services.Places();
          const searchOption = {
            location: new window.kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            ),
            radius: 500,
            size: 15,
            page: pages,
          };
          // SEARCH FUNCTION
          ps.keywordSearch(locationText, placeSearchDB, searchOption);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  };
  function placeSearchDB(data: any, status: any, pagination: any): any {
    if (status === window.kakao.maps.services.Status.OK) {
      setLocationResult({
        // result: [...prevData.result, ...data],
        totalCount: pagination.totalCount,
        maxPage: pagination.last,
      });
      setResultData((prevData: any) => [...prevData, ...data]);
      setSearchKeyword(locationText);
      setToastModal(true);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      return status;
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      return status;
    }
  }
  useEffect(() => {
    if (pages > 1) {
      handleSearchLocation();
    }
  }, [pages]);

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
