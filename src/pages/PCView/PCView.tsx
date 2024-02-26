// COMPONENT
import Section1 from "components/PCView/Section1";
import Section2 from "components/PCView/Section2";
import Section3 from "components/PCView/Section3";
import Section4 from "components/PCView/Section4";
import Section5 from "components/PCView/Section5";
import Section6 from "components/PCView/Section6";

// STYLE
import "../../assets/styles/pcstyle.css";

const PCView: React.FC = () => {
  return (
    <>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
    </>
  );
};

export default PCView;
