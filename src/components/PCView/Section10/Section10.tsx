// MODULE
import { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
// STYLED
const SectionStyle = styled.div`
  padding-top: 6rem;
  padding-bottom: 3rem;
  z-index: 1;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 40rem;
    top: 0;
    left: 0;
    background: var(--white-color);
    z-index: 2;
  }
  * {
    z-index: 3;
  }
  .section_tit * {
    color: #493dc1;
  }
  .sub_tit p {
    font-size: 3rem;
    font-weight: 300;
  }
  .ex_txt p {
    margin-right: 5.5rem;
    font-size: 2.5rem;
    font-weight: 600;
    text-align: center;
    font-family: "pretendard" !important;
  }
  .sub_tit h3 {
    font-weight: 700;
  }
  .mockup_view {
    margin-top: 8.5rem;
    .main_img > img {
      border-radius: 3.8rem;
      box-shadow: 0 25px 24px rgba(0, 0, 0, 0.3);
    }
    .search_img {
      .place_mockup .sub_txt {
        margin-top: 5rem;
        > * {
          color: var(--white-color);
        }
        p {
          font-size: 2.5rem;
          font-weight: 700;
        }
        div {
          margin-top: 1.5rem;
          font-size: 2rem;
          font-weight: 400;
        }
      }
      .review_mockup {
        &::before {
          content: "리뷰 상세보기";
          position: absolute;
          display: flex;
          justify-content: center;
          width: inherit;
          bottom: -98%;
          right: -15%;
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--white-color);
        }
        &::after {
          content: "다른 사람들이 쓴 리뷰들을 인피니티 스크롤로 전체 목록으로 볼 수 있으며, 작성할 수 있습니다.";
          position: absolute;
          display: flex;
          justify-content: center;
          width: 65%;
          bottom: -108%;
          right: 3%;
          font-size: 2rem;
          font-weight: 300;
          color: var(--white-color);
          word-break: keep-all;
          text-align: center;
        }
        img {
          width: 100%;
          right: -15%;
        }
      }
    }
  }
  .marker_icon {
    margin-left: 4rem;
    > div {
      position: absolute;
      font-size: 1.8rem;
      font-weight: 600;
      color: #958bff;
      white-space: nowrap;
    }
    .top_txt {
      top: -3.6rem;
      left: 0;
      &::after {
        content: "";
        position: absolute;
        width: 1px;
        height: 2rem;
        top: 100%;
        left: 30%;
        background: #958bff;
      }
    }
    .bottom_txt {
      bottom: -3.6rem;
      right: 0;
      &::after {
        content: "";
        position: absolute;
        width: 1px;
        height: 2rem;
        bottom: 100%;
        right: 30%;
        background: #958bff;
      }
    }
    .ex_txt {
      bottom: -12.6rem;
      left: 0;
      font-size: 1.8rem;
      font-weight: 400;
      color: var(--white-color);
    }
  }
`;

const Section10: React.FC = () => {
  const [longImgWidth, setLongImgWidth] = useState<number | undefined>(0);

  useEffect(() => {
    setInterval(() => {
      if (longImgWidth === 0) {
        const ImageWidth = document
          .querySelector(".review_mockup > img")
          ?.getBoundingClientRect().width;
        setLongImgWidth(ImageWidth);
        const imageFrames: any = document.querySelector(".review_mockup");
        const absoluteImage: any = document.querySelector(
          ".review_mockup > img"
        );
        imageFrames.style.width = `${ImageWidth}px`;
        absoluteImage.style.position = "absolute";
      } else {
        const ImageWidth = document
          .querySelector(".review_mockup > img")
          ?.getBoundingClientRect().width;
        setLongImgWidth(ImageWidth);
      }
    }, 1000);
  }, []);
  return (
    <SectionStyle className="pc_section section_10 relative">
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
            <div className="place_mockup flex flex_dir_c">
              <img
                src={`${process.env.PUBLIC_URL}/assets/image/mockup_7.png`}
                alt=""
              />
              <div className="sub_txt">
                <p>리뷰 간략보기</p>
                <div>
                  목록에 있는 리뷰나 리뷰 아이콘을
                  <br />
                  눌렀을때 장소에 대한 간단한 리뷰가 뜹니다.
                </div>
              </div>
            </div>
            <div className="review_mockup relative">
              <img
                src={`${process.env.PUBLIC_URL}/assets/image/mockup_8.png`}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </SectionStyle>
  );
};

export default Section10;
