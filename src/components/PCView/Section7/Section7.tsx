// MODULE
import styled from "styled-components";
// STYLED
const SectionStyle = styled.div`
  .section_tit {
    padding-top: 10rem;
  }
  .logo_info {
    margin-top: 6rem;
    * {
      color: var(--white-color);
    }
    > p {
      font-size: 2.5rem;
    }
    .logo_explanation {
      p {
        font-size: 1.8rem;
        font-weight: 400;
      }
      span {
        font-weight: 800;
      }
    }
    .intro_logo_box {
      margin-top: 4.5rem;
    }
  }
  .use_logo {
    margin-top: 13.5rem;
    li > div {
      font-weight: 500;
      color: var(--white-color);
      &:nth-child(2) {
        margin-top: 4rem;
      }
    }
  }
`;
// LINK

const Section7: React.FC = () => {
  return (
    <SectionStyle className="pc_section section_7">
      <div className="pc_con">
        <h6 className="section_tit point_txt montserrat">DESIGN CONCEPT</h6>
        <div className="logo_info flex flex_dir_c flex_jc_c flex_ai_c">
          <p>NAMING & LOGO</p>
          <div className="intro_logo_box">
            <img
              src={`${process.env.PUBLIC_URL}/assets/image/intro_logo.svg`}
              alt=""
            />
          </div>
          <div className="logo_explanation flex flex_dir_c flex_jc_c flex_ai_c">
            <p>
              해시태그를 이용해 원하는 장소를 등록하고 제한없이 찾을 수 있다는
              의미를 함축적으로 담았으며,
            </p>
            <p>
              <span>Z(지리,지도) + 해시태그</span>를 같이 담아 직관적으로
              표현하였다.
            </p>
          </div>
        </div>
        <ul className="use_logo flex flex_jc_sa flex_ai_c">
          <li className="app">
            <div>APP ICON</div>
            <div className="img_box">
              <img
                src={`${process.env.PUBLIC_URL}/assets/image/app_icon.png`}
                alt="지리뷰(ZReview) 앱 아이콘 이미지"
              />
            </div>
          </li>
          <li className="wordmark">
            <div>WORDMARK</div>
            <div className="img_box">
              <img
                src={`${process.env.PUBLIC_URL}/assets/image/wordmark_logo.png`}
                alt="지리뷰(ZReview) 텍스트 로고 이미지"
              />
            </div>
          </li>
        </ul>
      </div>
    </SectionStyle>
  );
};

export default Section7;
