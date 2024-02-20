// MODULE
import { useLocation } from "react-router-dom";
// CONPONENT
import Header from "components/Header";
import DetailItem from "components/DetailItem";
// PROPS TYPE
type DetailReviewProps = {};
const DetailReview: React.FC<DetailReviewProps> = ({}) => {
  const { state } = useLocation();
  return (
    <div className="inner_section" style={{ background: "#f6f6f6" }}>
      <Header type={2} title={"상호명"} />
      <div className="detail_frame">
        <ul>{/* <DetailItem /> */}</ul>
      </div>
    </div>
  );
};

export default DetailReview;
