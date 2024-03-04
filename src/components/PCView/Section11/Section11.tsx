const Section11: React.FC = () => {
  return (
    <div className="pc_section section_11">
      <div className="pc_con">
        <div className="section_tit flex flex_ai_fe">
          <div className="sub_tit">
            <p>03</p>
            <h3>
              Z<span>_</span>REVIEW
            </h3>
          </div>
          <div className="ex_txt">
            <p>
              나만의 장소(직접입력)와 검색하면 나오는
              <br />
              공식적인 장소(장소검색)을 선택하여 등록할 수 있습니다.
            </p>
          </div>
        </div>
        <div className="mockup_list">
          <ul className="flex">
            <li className="relative">
              <img
                src={`${process.env.PUBLIC_URL}/assets/image/mockup_9.png`}
                alt=""
              />
              <div>
                별도의 장소검색없이
                <br />
                내가 지금 서있는 위치에서
                <br />
                리뷰등록이 가능합니다.
              </div>
            </li>
            <li className="relative">
              <img
                src={`${process.env.PUBLIC_URL}/assets/image/mockup_10.png`}
                alt=""
              />
              <div>
                장소검색 후<br />
                리뷰등록이 가능합니다.
              </div>
            </li>
            <li>
              <img
                src={`${process.env.PUBLIC_URL}/assets/image/mockup_11.png`}
                alt=""
              />
              <div>
                <p>Step 1</p>장소검색 화면
              </div>
            </li>
            <li>
              <img
                src={`${process.env.PUBLIC_URL}/assets/image/mockup_12.png`}
                alt=""
              />
              <div>
                <p>Step 2</p>리뷰 작성 후 등록을 누르면
                <br />
                등록된 리뷰를 볼 수 있습니다.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Section11;
