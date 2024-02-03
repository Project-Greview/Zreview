// MODULE
import { useLocation } from "react-router-dom";
// PROPS TYPE
type DetailReviewProps = {};
const DetailReview: React.FC<DetailReviewProps> = ({}) => {
  const { state } = useLocation();
  return <div className="inner_section"></div>;
};

export default DetailReview;
