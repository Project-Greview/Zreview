// MODULE
// COMPONENT
import TabItem from "components/MyPage/TabItem";
import TabMenu from "components/MyPage/TabMenu";
import UserInfo from "components/MyPage/UserInfo";

// PROPS TYPE
type MyPageProps = {};

const MyPage: React.FC<MyPageProps> = () => {
  return (
    <div className="my_page_section view_section">
      <div className="scroll_section">
        <UserInfo />
      </div>
      <TabMenu />
      <div className="item_list">
        <TabItem />
      </div>
    </div>
  );
};

export default MyPage;
