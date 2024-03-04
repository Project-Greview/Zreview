const Section12: React.FC = () => {
  return (
    <div className="pc_section section_12 relative">
      <div className="pc_con">
        <div className="end_page_image flex flex_jc_sb flex_ai_c">
          <div className="img_box relative">
            <img
              src={`${process.env.PUBLIC_URL}/assets/image/mockup_1.png`}
              alt=""
              className="relative"
            />
          </div>
          <div className="txt_box flex flex_dir_c flex_jc_s flex_ai_fs">
            <h6 className="point_txt">Mobile community mapping service</h6>
            <h1>ZReview</h1>
            <h6>내가 그리는 우리 동네, 지리뷰</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section12;
