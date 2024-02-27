const Section8: React.FC = () => {
  return (
    <div className="pc_section section_8">
      <div className="pc_con flex flex_jc_sb flex_wrap_wrap">
        <div className="color_picker">
          <p>COLOR SYSTEM</p>
          <div className="point_color_bar relative"></div>
          <ul className="normal_color_bar flex">
            <li className="white relative"></li>
            <li className="light_gray relative"></li>
            <li className="gray relative"></li>
            <li className="dark_gray relative"></li>
          </ul>
        </div>
        <div className="typhography">
          <p>TYPHOGRAPHY</p>
          <ul>
            <li className="montserrat">Montserrat Bold</li>
            <li className="pretendard_semibold">프리텐다드 Semibold</li>
            <li className="pretendard_medium">프리텐다드 Medium</li>
            <li className="pretendard_regular">프리텐다드 Regular</li>
          </ul>
        </div>
        <div className="iconography">
          <p>ICONOGRAPHY</p>
        </div>
      </div>
    </div>
  );
};

export default Section8;
