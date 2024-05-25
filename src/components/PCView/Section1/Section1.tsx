// MODULE
import styled from "styled-components";
// STYLED
const SectionStyle = styled.div`
  padding-top: 8.5rem;
  .pc_con > div {
    flex-basis: 50%;
  }
  .left_section {
    h1 {
      font-weight: 800;
      color: var(--white-color);
    }
    .kor_semi_tit {
      margin-top: 5rem;
      font-weight: 400;
      color: var(--white-color);
      span {
        font-size: 3.5rem;
        font-weight: 700;
        color: var(--white-color);
      }
    }
  }
  .right_section img {
    max-width: 95%;
  }
`;
// IMAGE

const Section1: React.FC = () => {
  return (
    <SectionStyle className="pc_section section_1 flex flex_jc_sb width_100p">
      <div className="pc_con flex flex_jc_sb width_100p">
        <div className="left_section flex flex_dir_c flex_jc_s">
          <div className="img_box">
            <img
              src={`${process.env.PUBLIC_URL}/assets/image/bg_logo.png`}
              alt={`지리뷰(Zreview) 로고`}
            />
          </div>
          <h6 className="point_txt">Mobile community mapping service</h6>
          <h1>Z REVIEW</h1>
          <h6 className="kor_semi_tit">
            내가 그리는 우리 동네, <span>지리뷰</span>
          </h6>
        </div>
        <div className="right_section img_box">
          <img
            src={`${process.env.PUBLIC_URL}/assets/image/mockup_1.png`}
            alt=""
          />
        </div>
      </div>
    </SectionStyle>
  );
};

export default Section1;
