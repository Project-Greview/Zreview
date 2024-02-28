const Section10: React.FC = () => {
  return (
    <div className="pc_section section_10 relative">
      <div className="pc_con">
        <div className="section_tit flex flex_jc_e flex_ai_fe">
          <div className="ex_txt">
            <p>
              현재 어플을 킨 위치에서 자동으로 GPS반영이 되어 위치설정을
              하지않아도
              <br />홈 화면 등 주변의 리뷰들을 한눈에 볼 수 있으며, 주변의
              장소들을 추천합니다.
            </p>
          </div>
          <div className="sub_tit">
            <p>02</p>
            <h3>Main Page</h3>
          </div>
        </div>
        <div className="mockup_view flex flex_jc_sb">
          <div className="main_img flex flex_jc_sb flex_ai_c">
            <img
              className="relative"
              src={`${process.env.PUBLIC_URL}/assets/image/mockup_6.png`}
              alt="지리뷰(ZReview) 메인 화면 목업"
            />
            <div className="marker_icon relative">
              <div className="top_txt">나만의 장소 리뷰</div>
              <img
                src={`${process.env.PUBLIC_URL}/assets/image/marker_point.png`}
                alt=""
              />
              <div className="bottom_txt">장소등록 리뷰</div>
              <div className="ex_txt">
                장소검색이 가능한 리뷰와
                <br />
                장소검색이 안되는 나만의 위치로 등록한
                <br />
                리뷰를 구분하여 볼 수 있습니다.
              </div>
            </div>
          </div>
          <div className="search_img flex">
            <div className="place_mockup">
              <img
                src={`${process.env.PUBLIC_URL}/assets/image/mockup_7.png`}
                alt=""
              />
            </div>
            <div className="review_mockup relative"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section10;
