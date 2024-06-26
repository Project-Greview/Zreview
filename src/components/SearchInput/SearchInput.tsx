/** 검색 (메인) */
// MODULE
import { ChangeEvent, KeyboardEvent, useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
// RECOIL STATE
import {
  searchTypeState,
  searchKeywordState,
  locationSearchResultState,
  searchResultState,
  inViewState,
} from "state/searchState";
import { toastPopupState, paginationState } from "state/commonState";
import { mapMarkerState } from "state/mapMarkerState";
// HOOK
import { handleInputKeyDown } from "utils/mobileWebEnter";
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
  const inputRef = useRef<HTMLInputElement>(null);

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

  const isViewScroll = useRecoilValue(inViewState);
  const pages = useRecoilValue(paginationState);
  const cleanResultInfo = useResetRecoilState(locationSearchResultState);
  const cleanPages = useResetRecoilState(paginationState);
  const cleanResult = useResetRecoilState(searchResultState);
  const clearMarkerData = useResetRecoilState(mapMarkerState);

  const resetResult = () => {
    cleanResultInfo();
    cleanPages();
    cleanResult();
    clearMarkerData();
  };
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

  // SEARCH KEYBOARD
  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (type) {
        handleSearchHashTag();
      } else {
        handleSearchLocation();
        resetResult();
      }
    }
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
        ref={inputRef}
        // onKeyDown={(e) =>
        //   handleInputKeyDown(
        //     e,
        //     handleSearchLocation,
        //     handleSearchHashTag,
        //     resetResult,
        //     type
        //   )
        // }
        onKeyDown={handleInputKeyDown}
      />
      <label htmlFor={type ? "set_hashtag" : "set_keyword"}></label>
      <button
        className="search_btn absolute"
        onClick={
          type
            ? () => handleSearchHashTag()
            : () => (resetResult(), handleSearchLocation())
        }
      >
        {type ? <HashTagSearchIcon /> : <KeywordSearchIcon color={"#959292"} />}
      </button>
    </div>
  );
};

export default SearchInput;
