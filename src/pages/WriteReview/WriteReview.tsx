// MODULE

// PROPS TYPE
type WriteReviewProps = {};

const WriteReview: React.FC<WriteReviewProps> = () => {
  return (
    <div className="inner_section">
      <div className="write_form">
        <div className="location_select">
          <div className="section_title">장소명 선택</div>
          <div className="radio_box flex">
            <div>
              <input type="radio" id="location_search" name="location_type" />
              <label htmlFor="location_search">장소검색</label>
            </div>
            <div>
              <input type="radio" id="write_location" name="location_type" />
              <label htmlFor="write_location">직접입력</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
