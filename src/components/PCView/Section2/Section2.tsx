// STYLE
import "../../../assets/styles/pcstyle.css";

const Section2: React.FC = () => {
  return (
    <div className="pc_section section_1">
      <div className="img_box">
        <img
          src={`${process.env.PUBLIC_URL}/assets/image/bg_logo.png`}
          alt={`지리뷰(Zreview) 로고`}
        />
      </div>
    </div>
  );
};

export default Section2;
