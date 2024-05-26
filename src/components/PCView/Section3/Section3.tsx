// MODULE
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
// JSON
import PCData from "../../../json/pcIntroData.json";
// PROPS TYPE
interface DataType {}
// STYLED
const SectionStyle = styled.div`
  padding-top: 4.5rem;
  .secition_tit {
    font-weight: 800;
    color: var(--white-color);
  }
  .semi_tit {
    margin-top: 2.5rem;
    > h6 {
      font-weight: 600;
      color: var(--white-color);
      line-height: 1.5;
    }
    ul {
      text-align: right;
      li {
        font-size: 1.5rem;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
  .chart_list {
    margin-top: 6rem;
    .mini_chart {
      flex-basis: calc(97.5% / 3);
      max-height: 50rem;
      height: 50rem;
      padding: 5rem;
      background: var(--white-color);
      border-radius: 5rem;
      box-shadow: 0 20px 34px rgba(0, 0, 0, 0.3);
      transform: translateY(-10rem);
      opacity: 0;
      visibility: hidden;
      overflow: hidden;
      &:first-child {
        transition: all 0.3s;
      }
      &:nth-child(2) {
        margin-top: 5.5rem;
        transition: all 0.3s;
        transition-delay: 0.4s;
      }
      &:nth-child(3) {
        transition: all 0.3s;
        transition-delay: 0.8s;
      }
      .chart_body {
        min-height: 40rem;
        max-height: 40rem;
        margin: 0 -1rem;
        overflow-y: auto;
        &::-webkit-scrollbar {
          width: 5px;
        }
        &::-webkit-scrollbar-thumb {
          position: relative;
          height: 10%;
          background: var(--point-color);
          border-right: 1px solid var(--point-color);
          border-left: 1px solid var(--point-color);
          border-radius: 10px;
        }
        &::-webkit-scrollbar-track {
          background: #dbdbdb;
          border-right: 1px solid var(--white-color);
          border-left: 1px solid var(--white-color);
        }
      }
      .chart_tit {
        font-size: 3rem;
        font-weight: 600;
        color: var(--navy-color);
        line-height: 1.1;
        span {
          font-size: 3rem;
          font-weight: 800;
          color: var(--navy-color);
        }
      }
      .semi_tit {
        font-size: 2rem;
        font-weight: 600;
        color: var(--disable-text);
        letter-spacing: -0.5px;
      }
      .contents {
        min-height: 4rem;
        margin-top: 4rem;
        ul li {
          .bars {
            width: 0;
            padding: 1.4rem;
            margin-right: 1rem;
            background: #dbdbdb;
            border-top-right-radius: 2rem;
            border-bottom-right-radius: 2rem;
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--white-color);
            transition: all 0.3s;
            &.point_bg {
              background: var(--point-color);
            }
          }
          .key_txt {
            font-size: 2rem;
            font-weight: 600;
            color: #dbdbdb;
          }
        }
        .vertical li:not(:first-child) {
          margin-top: 2rem;
        }
        .horizontal li {
          .bars {
            width: 5.8rem;
            height: 0;
            margin-right: 0;
            border-top-left-radius: 2rem;
            border-bottom-right-radius: 0;
            text-align: center;
          }
          .key_txt {
            align-items: flex-start;
            height: 2em;
            margin-top: 1rem;
            white-space: pre;
            text-align: center;
          }
        }
        .custom_table {
          li li {
            flex-basis: calc((100% - 1rem) / 3);
            height: 4.5rem;
            border-radius: 1rem;
            border: 1px solid var(--point-color);
            color: var(--point-color);
          }
          > li {
            margin-bottom: 0.5rem;
            &:first-child {
              li {
                background: var(--point-color);
                border: none;
                font-size: 1.5rem;
                font-weight: 600;
                color: var(--white-color);
                &:first-child {
                  border-radius: 0;
                  border-top-left-radius: 2rem;
                }
                &:last-child {
                  border-radius: 0;
                  border-top-right-radius: 2rem;
                }
              }
            }
          }
        }
        .end_txt p {
          margin: 0 0.5rem;
          font-size: 2rem;
          font-weight: 600;
        }
      }
    }
    &.active {
      .mini_chart {
        transform: translateY(0rem);
        opacity: 1;
        visibility: visible;
      }
    }
  }
`;

const VerticalChart: React.FC<DataType> = () => {
  const [size, setSize] = useState<number>(0);
  return (
    <ul className="vertical flex flex_dir_c flex_jc_sb">
      {PCData.VerticalData.map((data: any, index: number) => {
        const calcValue =
          ((data.value * 40) / 460) * 100 < 20
            ? 45
            : ((data.value * 40) / 460) * 100 < 50
            ? 80
            : ((data.value * 40) / 460) * 100;
        return (
          <li key={data.key} className="flex flex_jc_s flex_ai_c">
            <div
              className={`bars ${index === 0 ? "point_bg" : ""} flex_jc_e`}
              style={{ width: calcValue }}
            >
              {data.value}
            </div>
            <div className={`key_txt ${index === 0 ? "point_txt" : ""}`}>
              {data.key}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
const HorizontalChart: React.FC<DataType> = () => {
  const [size, setSize] = useState<number>(0);
  return (
    <ul className="horizontal flex flex_jc_sa flex_ai_fe">
      {PCData.HorizontalData.map((data: any, index: number) => {
        const lineBreak = data.key.replace("/", "\n/");
        const calcValue =
          ((data.value * 40) / 460) * 100 < 20
            ? 45
            : ((data.value * 40) / 460) * 100 < 50
            ? 80
            : ((data.value * 40) / 460) * 100;
        return (
          <li key={data.key} className="flex flex_dir_c flex_jc_c flex_ai_c">
            <div
              className={`bars ${index === 0 || index === 1 ? "point_bg" : ""}`}
              style={{ height: calcValue }}
            >
              {data.value}
            </div>
            <div
              className={`key_txt ${
                index === 0 || index === 1 ? "point_txt" : ""
              }`}
            >
              {lineBreak}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const CustomTableChart: React.FC = () => {
  return (
    <ul className="custom_table width_100p">
      {PCData.CustomTableData.map((data: any) => {
        return (
          <li key={data.line}>
            <ul className="flex flex_jc_sb flex_ai_c">
              {data.data.map((sub_item: any, index: number) => (
                <li key={index} className="flex flex_jc_c flex_ai_c">
                  {sub_item.item}
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

const Section3: React.FC = () => {
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      document.querySelector(".section_3 .chart_list")?.classList.add("active");
    }
  }, [inView]);
  return (
    <SectionStyle className="pc_section section_3">
      <div className="pc_con">
        <h6 className="section_tit">Research</h6>
        <div className="semi_tit flex flex_jc_sb flex_ai_fe">
          <h6 className="flex flex_as_s">
            리뷰어가 창작자로...SNS 기능 강화로 MZ세대 유입 확대
          </h6>
          <ul>
            <li>
              &#60;자료 1&#62; 출처 : 스포츠월드, ‘홍보전문가에게 50명에게
              물었다. Z세대를 어떻게 공략할것인가’
            </li>
            <li>
              &#60;자료 2&#62; 출처 : 대학내일20대연구소, ‘Z세대의 핫플레이스
              서치법’
            </li>
            <li>
              &#60;자료 3&#62; 출처 : 대학내일20대연구소, ‘20대의 인정욕구에
              대한 인식 및 실태 조사 리포트’
            </li>
          </ul>
        </div>
        <ul className="chart_list relative flex flex_jc_sb">
          <li className="mini_chart">
            <div className="chart_body">
              <div className="chart_tit">
                2030세대의
                <br /> 가장 큰 <span>구매 행동적 특징?</span>
              </div>
              <div className="contents">
                <VerticalChart />
              </div>
            </div>
          </li>
          <li className="mini_chart">
            <div className="chart_body">
              <div className="chart_tit">
                <span>취향이 담긴 플레이스</span>를 공유
              </div>
              <div className="semi_tit">
                &#60;SNS에 가장 인증을 많이 하는 분야&#62;
              </div>
              <div className="contents">
                <HorizontalChart />
              </div>
            </div>
          </li>
          <li className="mini_chart">
            <div className="chart_body">
              <div className="chart_tit">
                다양한 <span>핫플레이스 서치</span>경로
              </div>
              <div className="semi_tit">
                &#60;핫플레이스 정보 탐색 시 이용하는 채널 및 서치방법&#62;
              </div>
              <div className="contents">
                <CustomTableChart />
                <div className="img_box mar_top_20">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/image/Union.svg`}
                    alt=""
                  />
                </div>
                <div className="end_txt flex flex_jc_c flex_ai_fs mar_top_20">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/image/icon/double_quotes_up.svg`}
                    alt=""
                  />
                  <p className="point_txt">
                    SNS에서 서치 후 지도 앱에 옮겨 정보를 얻음
                  </p>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/image/icon/double_quotes_down.svg`}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </li>
          <li className="absolute" style={{ bottom: 50 }} ref={ref}></li>
        </ul>
      </div>
    </SectionStyle>
  );
};

export default Section3;
