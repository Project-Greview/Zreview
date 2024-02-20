// MODULE
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
// RECOIL STATE
import { dummyDateState } from "state/dummyState";
// COMPONENT
import ThumbnailItem from "components/ThumbnailItem";

const DummyDataList: React.FC = () => {
  const navigate = useNavigate();
  const [dummyList, setDummyuList] = useRecoilState(dummyDateState);
  return (
    <div
      style={{
        padding: "0 20px",
        background: "#ffffff",
      }}
    >
      <div
        onClick={() => navigate(-1)}
        style={{
          height: "5rem",
          top: 0,
          left: 0,
          padding: "0 20px",
          background: "#ffffff",
          borderBottom: "1px solid #ebebeb",
        }}
        className="fixed flex flex_ai_c width_100p"
      >
        뒤로가자
      </div>
      <ul
        style={{
          paddingTop: "5rem",
          background: "var(--white-color)",
          textAlign: "center",
        }}
      >
        {dummyList.length === 0 ? (
          <li style={{ padding: "5rem" }}>생성된 DummyData가 없어요.</li>
        ) : (
          dummyList.map((item) => {
            const itemInfo = {};
            return <ThumbnailItem key={item.id} type={""} data={item} />;
          })
        )}
      </ul>
    </div>
  );
};

export default DummyDataList;
