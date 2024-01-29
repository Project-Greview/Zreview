// MODULE
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
// RECOIL STATE
import { dummyDateState } from "state/dummyState";
// COMPONENT
import SomenailItem from "components/SomenailItem";

const DummyDataList: React.FC = () => {
  const navigate = useNavigate();
  const [dummyList, setDummyuList] = useRecoilState(dummyDateState);
  return (
    <div
      style={{
        padding: "0 20px",
      }}
    >
      <div
        onClick={() => navigate(-1)}
        style={{
          position: "fixed",
          width: "100%",
          height: "5rem",
          top: 0,
          left: 0,
          padding: "0 20px",
          background: "#fff",
        }}
      >
        뒤로가자
      </div>
      <ul style={{ paddingTop: "5rem" }}>
        {dummyList.map((item) => {
          const itemInfo = {};
          return <SomenailItem key={item.id} type={""} data={item} />;
        })}
      </ul>
    </div>
  );
};

export default DummyDataList;
