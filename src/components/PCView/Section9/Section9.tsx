const Section9: React.FC = () => {
  return (
    <div className="pc_section section_9">
      <div className="pc_con">
        <div className="section_tit flex flex_ai_fe">
          <div className="sub_tit">
            <p>01</p>
            <h3>Onboarding</h3>
          </div>
          <div className="ex_txt">
            <p>
              로고와 컨셉문구를 사용하여 온보딩 화면을 구성했습니다.
              <br /> 온보딩 화면이 지나면 로그인 및 회원가입을 시작합니다.
            </p>
          </div>
        </div>
        <div className="mockup_view flex flex_jc_sb">
          <div className="splash_img relative">
            <img
              className="relative"
              src={`${process.env.PUBLIC_URL}/assets/image/mockup_2.png`}
              alt="지리뷰(ZReview) 스플레쉬 화면 목업"
            />
          </div>
          <ul className="process_mockup flex flex_jc_sb">
            <li>
              <img
                src={`${process.env.PUBLIC_URL}/assets/image/mockup_3.png`}
                alt="지리뷰(ZReview) 로그인 화면 목업"
              />
              <div className="mockup_txt flex flex_dir_c flex_jc_c flex_ai_c">
                <p className="step">Step 1</p>
                <div className="step_name">로그인 / 회원가입</div>
              </div>
            </li>
            <li>
              <img
                src={`${process.env.PUBLIC_URL}/assets/image/mockup_4.png`}
                alt="지리뷰(ZReview) 회원가입 화면 목업"
              />
              <div className="mockup_txt flex flex_dir_c flex_jc_c flex_ai_c">
                <p className="step">Step 2</p>
                <div className="step_name">회원가입 양식 작성</div>
              </div>
            </li>
            <li>
              <img
                src={`${process.env.PUBLIC_URL}/assets/image/mockup_5.png`}
                alt="지리뷰(ZReview) 회원가입 완료 화면 목업"
              />
              <div className="mockup_txt flex flex_dir_c flex_jc_c flex_ai_c">
                <p className="step">Step 3</p>
                <div className="step_name">회원가입 완료</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Section9;
