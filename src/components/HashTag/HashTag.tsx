// MODULE
import { useState } from "react";
// SVG
import { ReactComponent as HashTagIcon } from "../../assets/image/icon/marker_c.svg";
// PROPS TYPE
type HashTagProps = {
  tag: string;
};

const HashTag: React.FC<HashTagProps> = ({ tag }) => {
  return (
    <div className="hashtag flex flex_jc_sa flex_ai_c">
      <HashTagIcon width={16} height={16} />
      <div className="tag_name">{tag}</div>
    </div>
  );
};

export default HashTag;
