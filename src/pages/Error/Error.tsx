// MODULE
import { useNavigate } from "react-router-dom";
// COMPONENT
import Button from "components/Common/Button";

const Error: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      className="outlet error flex flex_dir_c flex_ai_c flex_jc_c"
      style={{ fontSize: "2rem" }}
    >
      잘못된 요청입니다!
      <div className="btn_box flex flex_jc_c" style={{ marginTop: "2rem" }}>
        <Button
          title={"메인으로 돌아가기"}
          event={() =>
            navigate(
              process.env.NODE_ENV === "production"
                ? process.env.PUBLIC_URL
                : "/"
            )
          }
          width={"100%"}
          styles={"buttons flex flex_jc_c flex_ai_c width_100p cursor_p"}
        />
      </div>
    </div>
  );
};

export default Error;
