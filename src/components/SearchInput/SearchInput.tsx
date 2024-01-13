// MODULE
import { useRecoilState } from "recoil";
// RECOIL STATE
import { searchTypeState } from "state/searchState";
// SVG
import { ReactComponent as HashTagIcon } from "../../assets/image/icon/marker_c.svg";
import { ReactComponent as KeywordIcon } from "../../assets/image/icon/marker_g.svg";
import { ReactComponent as HashTagSearchIcon } from "../../assets/image/icon/hashtag_search.svg";
import { ReactComponent as KeywordSearcIcon } from "../../assets/image/icon/keyword_search.svg";
// PROPS TYPE
type SearchInputProps = {
  searchType: string;
};

const SearchInput: React.FC<SearchInputProps> = ({ searchType }) => {
  const [type, setType] = useRecoilState<boolean>(searchTypeState);

  const handleChangeSearcType = () => {
    setType((type) => !type);
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
      />
      <label htmlFor={type ? "set_hashtag" : "set_keyword"}></label>
      <button
        className="search_btn absolute"
        onClick={type ? () => console.log(type) : () => console.log(type)}
      >
        {type ? <HashTagSearchIcon /> : <KeywordSearcIcon />}
      </button>
    </div>
  );
};

export default SearchInput;
