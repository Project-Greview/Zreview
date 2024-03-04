// MODULE
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
const Section2: React.FC = () => {
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      document.querySelector(".circle_chart")?.classList.add("active");
    }
  }, [inView]);
  return (
    <div className="pc_section section_2">
      <div className="pc_con flex flex_dir_c flex_jc_c flex_ai_c">
        <h6 className="point_txt">Overview</h6>
        <h2>
          <span>‘집 근처’의 가치</span>가 주목받는 시대
        </h2>
        <p>
          핫플 말고 살기 좋은 곳. 그렇다고 해서 맛집이나 인스타용 카페 같은
          핫플만을 공략한 건 아닌 머물고 싶은 우리동네가 뜬다
          <br />
          가게를 운영하는 사람들도 결국 주민이다. 일하는 환경이 좋아야 하지만 그
          외 시간에도 살기 괜찮은 곳이어야 한다.
          <br />
          따듯한 공동체도 형성돼 있어야 떠나지 않는다.
        </p>
        <ul className="circle_chart relative flex flex_jc_c flex_ai_c">
          <li className="circle_box flex flex_dir_c flex_jc_c flex_ai_c">
            <div className="flex flex_dir_c flex_jc_c flex_ai_c">
              <strong className="point_txt">Hyperlocal</strong>
              <div className="point_txt">(하이퍼로컬)</div>
            </div>
            <p>
              극단을 뜻하는 하이퍼(Hyper)와
              <br />
              지역을 의미하는 (Local)을 더한 합성어로
              <br />
              동네를 중심으로 이뤄지는 네트워킹
            </p>
          </li>
          <li className="plus_txt point_txt">+</li>
          <li className="circle_box flex flex_dir_c flex_jc_c flex_ai_c">
            <div className="flex flex_dir_c flex_jc_c flex_ai_c">
              <strong className="point_txt">Vertical</strong>
              <div className="point_txt">(버티컬서비스)</div>
              <p>
                이용자들의 수요와 취향이 더욱
                <br />
                다양해지고 구체화되면서,
                <br />
                수요맞춤형 서비스의 중요성 증가
              </p>
            </div>
          </li>
          <li className="absolute" style={{ bottom: 0 }} ref={ref}></li>
        </ul>
      </div>
    </div>
  );
};

export default Section2;
