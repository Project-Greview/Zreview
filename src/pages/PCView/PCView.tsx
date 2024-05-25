// MODULE
import styled from "styled-components";
// COMPONENT
import Section1 from "components/PCView/Section1";
import Section2 from "components/PCView/Section2";
import Section3 from "components/PCView/Section3";
import Section4 from "components/PCView/Section4";
import Section5 from "components/PCView/Section5";
import Section6 from "components/PCView/Section6";
import Section7 from "components/PCView/Section7";
import Section8 from "components/PCView/Section8";
import Section9 from "components/PCView/Section9";
import Section10 from "components/PCView/Section10";
import Section11 from "components/PCView/Section11";
import Section12 from "components/PCView/Section12";
// STYLE
const PCViewFrame = styled.div`
  .pc_section {
    min-height: 100vh;
    /* height: 100vh; */
  }
  .pc_section .swiper-wrapper {
    transition-timing-function: linear;
  }

  .pc_con {
    padding: 0 14.5rem;
  }
  .pc_s_con {
    max-width: 108rem;
    margin: 0 auto;
  }
  .pc_section .point_txt {
    color: var(--point-color) !important;
  }
  .pc_section h1 {
    font-size: 10rem;
  }
  .pc_section h2 {
    font-size: 7rem;
  }
  .pc_section h3 {
    font-size: 5rem;
  }
  .pc_section h6 {
    font-size: 3.5rem;
    font-weight: 700;
  }
  .pc_section.section_1,
  .pc_section.section_7,
  .pc_section.section_8,
  .pc_section.section_12 {
    background: var(--normal-gray-color);
  }
  .pc_section.section_3,
  .pc_section.section_4,
  .pc_section.section_9,
  .pc_section.section_10,
  .pc_section.section_11 {
    background: #493dc1;
  }
`;
const PCView: React.FC = () => {
  return (
    <PCViewFrame>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
      <Section8 />
      <Section9 />
      <Section10 />
      <Section11 />
      <Section12 />
    </PCViewFrame>
  );
};

export default PCView;
