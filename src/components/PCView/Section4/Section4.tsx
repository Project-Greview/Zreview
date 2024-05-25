// MODULE
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
// JSON
import PontAndSolution from "../../../json/pcIntroData.json";
// IMAGE
// STYLED
const SectionStyle = styled.div`
  padding-top: 4.5rem;
  .section_tit {
    font-weight: 700;
    color: var(--white-color);
  }
  .zreview_point {
    margin-top: 6rem;
    > div {
      > p {
        font-size: 2.5rem;
        font-weight: 600;
        color: var(--white-color);
      }
      ul li {
        position: relative;
        width: 100%;
        height: 11rem;
        padding: 0 4rem;
        margin-top: 3rem;
        border-radius: 20px;
        box-shadow: 0 -1px 1px rgba(255, 255, 255, 0.5);
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--white-color);
      }
    }
  }
  .painpoint_list {
    flex-basis: 50rem;
  }
  .painpoint_list ul li {
    background: rgb(101, 86, 255);
    background: linear-gradient(
      90.13deg,
      rgba(101, 86, 255, 0.5) 0%,
      rgba(101, 86, 255, 0) 100%
    );
  }
  .solution_list {
    flex-basis: 63rem;
    ul li {
      background: var(--dark-gray-color);
    }
  }
`;

const Section4: React.FC = () => {
  const [isLeftChart, inViewLeft] = useInView();
  const [isRightChart, inViewRight] = useInView();
  useEffect(() => {
    if (inViewLeft && inViewRight) {
      console.log("작동");
    }
  }, [inViewLeft, inViewRight]);
  return (
    <SectionStyle className="pc_section section_4 flex flex_jc_sb width_100p">
      <div className="pc_con width_100p">
        <h6 className="section_tit">PAINPOINT AND SOLUTION</h6>
        <div className="zreview_point flex flex_jc_sa flex_ai_c">
          <div className="painpoint_list">
            <p>PAINPOINT</p>
            <ul className="left_chart_list" ref={isLeftChart}>
              {PontAndSolution.painpoint.map((item: any) => (
                <li key={item.item} className="relative flex flex_ai_c">
                  {item.item}
                </li>
              ))}
            </ul>
          </div>
          <div className="arrow_icon">
            <img
              src={`${process.env.PUBLIC_URL}/assets/image/icon/gradation_arrow.svg`}
              alt=""
            />
          </div>
          <div className="solution_list">
            <p>SOLUTION</p>
            <ul className="right_chart_list" ref={isRightChart}>
              {PontAndSolution.solution.map((item: any) => (
                <li key={item.item} className="relative flex flex_ai_c">
                  {item.item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionStyle>
  );
};

export default Section4;
