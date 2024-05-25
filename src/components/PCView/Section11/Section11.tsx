// MODULE
import styled from "styled-components";
// STYLED
const SectionStyle = styled.div`
  padding-top: 6rem;
  padding-bottom: 3rem;
  .sub_tit {
    * {
      color: var(--white-color);
    }
    h3 {
      margin-right: 19rem;
      font-weight: 700;
      span {
        font-size: 5rem;
        font-weight: 400;
      }
    }
  }
  .ex_txt p {
    font-size: 2rem;
    font-weight: 300;
    color: var(--white-color);
  }
  .mockup_list {
    margin-top: 8.5rem;
    * {
      color: var(--white-color);
    }
    li {
      &:first-child {
        margin-right: 7.5rem;
      }
      &:nth-child(2) {
        margin-right: 4.3rem;
      }
      &:nth-child(3) {
        margin-right: 2.5rem;
      }
      &.relative {
        &:first-child {
          &::after {
            content: "직접입력";
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 11.5rem;
            height: 4.4rem;
            top: 0rem;
            left: 0;
            border-radius: 3rem;
            border: 1px solid var(--white-color);
            font-size: 2rem;
            font-weight: 300;
          }
          img {
            border-radius: 3.8rem;
            box-shadow: 0 25px 24px rgba(0, 0, 0, 0.3);
          }
        }
        &:nth-child(2) {
          &::after {
            content: "장소검색";
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 11.5rem;
            height: 4.4rem;
            top: 0rem;
            left: 0;
            border-radius: 3rem;
            border: 1px solid var(--white-color);
            font-size: 2rem;
            font-weight: 300;
          }
          img {
            border-radius: 3.8rem;
            box-shadow: 0 25px 24px rgba(0, 0, 0, 0.3);
          }
        }
      }
    }
    .border_tit {
      max-width: 11.5rem;
      padding: 1rem 0;
      border-radius: 3rem;
      border: 1px solid var(--white-color);
      font-size: 2rem;
      font-weight: 300;
    }
    img {
      margin-top: 7rem;
      & ~ div {
        margin-top: 3rem;
        font-size: 2rem;
        font-weight: 300;
        text-align: center;
        > p {
          margin-top: 0.5rem;
          margin-bottom: 1.5rem;
          font-size: 2.5rem;
        }
      }
    }
  }
`;
const Section11: React.FC = () => {
  return (
    <SectionStyle className="pc_section section_11">
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
    </SectionStyle>
  );
};

export default Section11;
