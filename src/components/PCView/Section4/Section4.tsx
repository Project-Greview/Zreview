// JSON
import PontAndSolution from "../../../json/pcIntroData.json";
// STYLE
import "../../../assets/styles/pcstyle.css";
// IMAGE

const Section4: React.FC = () => {
  return (
    <div className="pc_section section_4 flex flex_jc_sb width_100p">
      <div className="pc_con width_100p">
        <h6 className="section_tit">PAINPOINT AND SOLUTION</h6>
        <div className="zreview_point flex flex_jc_sa flex_ai_c">
          <div className="painpoint_list">
            <p>PAINPOINT</p>
            <ul>
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
            <ul>
              {PontAndSolution.solution.map((item: any) => (
                <li key={item.item} className="relative flex flex_ai_c">
                  {item.item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section4;
