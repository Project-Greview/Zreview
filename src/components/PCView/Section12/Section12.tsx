// MODULE
import styled from "styled-components";
// STYLED
const SectionStyle = styled.div`
  padding: 8.5rem 0;
  overflow: hidden;
  &::after {
    content: "THANK YOU";
    position: absolute;
    width: 100vw;
    bottom: -12%;
    left: 0;
    font-size: 30rem;
    font-weight: 600;
    text-align: center;
    white-space: nowrap;
    color: var(--white-color);
    opacity: 0.1;
  }
  .end_page_image {
    .img_box {
      width: 67.4rem;
      height: 67.4rem;
      &::after {
        content: "";
        position: absolute;
        width: 61rem;
        height: 61rem;
        top: calc(6.4rem / 2);
        left: calc(6.4rem / 2);
        background: #50489c;
        border-radius: 50%;
      }
      img {
        width: 64rem;
        z-index: 2;
      }
    }
    .txt_box {
      * {
        color: var(--white-color);
      }
      h1 {
        font-weight: bolder;
      }
      h6:last-child {
        margin-top: 3rem;
      }
    }
  }
`;

const Section12: React.FC = () => {
  return (
    <SectionStyle className="pc_section section_12 relative">
      <div className="pc_con">
        <div className="end_page_image flex flex_jc_sb flex_ai_c">
          <div className="img_box relative">
            <img
              src={`${process.env.PUBLIC_URL}/assets/image/mockup_1.png`}
              alt=""
              className="relative"
            />
          </div>
          <div className="txt_box flex flex_dir_c flex_jc_s flex_ai_fs">
            <h6 className="point_txt">Mobile community mapping service</h6>
            <h1>ZReview</h1>
            <h6>내가 그리는 우리 동네, 지리뷰</h6>
          </div>
        </div>
      </div>
    </SectionStyle>
  );
};

export default Section12;
