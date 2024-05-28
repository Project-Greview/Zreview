// MODULE
import { useEffect, useState } from "react";
import styled from "styled-components";
// STYLED
const IndexedDBSettingFrame = styled.div`
  .title {
    font-size: 2.4rem;
  }
`;
const MobileIndexedDB: React.FC = () => {
  const [data, setData] = useState([]);
  useEffect(() => {}, []);
  console.log(data);
  return (
    <IndexedDBSettingFrame>
      <div className="title flex flex_jc_c flex_ai_c">indexedDB 통계</div>
    </IndexedDBSettingFrame>
  );
};

export default MobileIndexedDB;
