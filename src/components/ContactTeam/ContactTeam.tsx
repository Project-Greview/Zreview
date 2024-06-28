// SVG
import { ReactComponent as Logo } from "../../assets/image/big_logo.svg";
// PROPS TYPE
type ContactTeamProps = {
  close: any;
};
const ContactTeam: React.FC<ContactTeamProps> = ({ close }) => {
  return (
    <>
      <div className="contact_team_modal_bg fixed"></div>
      <div className="contact_team fixed">
        <div className="flex flex_jc_sb flex_ai_c">
          <div className="title flex flex_jc_c flex_ai_c">만든 사람들</div>
          <div onClick={close} className="close_btn relative">
            <div className="absolute"></div>
            <div className="absolute"></div>
          </div>
        </div>
        <div className="img_box mar_top_30">
          <Logo />
        </div>
        <div className="team_name flex flex_jc_c mar_top_30">Team ZReview</div>
        <ul>
          <li>🖌️Designer : 👩‍🎨심예진</li>
          <li>🛠️Backend : 👩‍💻김예린,👨‍💻신재원</li>
          <li>💻Frontend : 👨‍💻김기태, 👩‍💻이수아</li>
        </ul>
        <div className="contact">연락방법은 저희도 모르겠어요... </div>
        <div className="mar_top_20">Issue Register</div>
        <a
          className="contact_btn flex flex_jc_c flex_ai_c"
          href="https://github.com/Project-Greview/Zreview/issues"
          target={"_blank"}
          rel="noreferrer"
        >
          Move ZReview Issue Page
        </a>
      </div>
    </>
  );
};

export default ContactTeam;
