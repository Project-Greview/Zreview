// MODULE
import { useLocation } from "react-router-dom";
// CONPONENT
import Header from "components/Header";
// PROPS TYPE
type DetailReviewProps = {};
const DetailReview: React.FC<DetailReviewProps> = ({}) => {
  const { state } = useLocation();
  return (
    <div className="inner_section">
      <Header type={2} title={"상호명"} />
    </div>
  );
};

export default DetailReview;
