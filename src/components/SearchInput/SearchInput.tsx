// MODULE

// PROPS TYPE
type SearchInputProps = {};

const SearchInput: React.FC<SearchInputProps> = () => {
  return (
    <div className="search_keyword_box">
      <input type="text" className="search_input" />
      <label htmlFor=""></label>
    </div>
  );
};

export default SearchInput;
