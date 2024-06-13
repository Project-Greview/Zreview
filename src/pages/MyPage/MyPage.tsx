// MODULE
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
// COMPONENT
import TabItem from "components/MyPage/TabItem";
import TabMenu from "components/MyPage/TabMenu";
import UserInfo from "components/MyPage/UserInfo";

// PROPS TYPE
type MyPageProps = {};

const MyPage: React.FC<MyPageProps> = () => {
  const [pageObserve, inView] = useInView();
  useEffect(() => {
    if (inView) {
      document.querySelector(".scroll_section")?.classList.remove("active");
      document
        .querySelector(".list_section > .count")
        ?.classList.remove("active");
    } else {
      document.querySelector(".scroll_section")?.classList.add("active");
      document.querySelector(".list_section > .count")?.classList.add("active");
    }
  }, [inView]);

  return (
    <div className="my_page_section view_section">
      <div className="scroll_section" ref={pageObserve}>
        <UserInfo />
      </div>
      <TabMenu />
      <div className="item_list" style={{ paddingBottom: 75 }}>
        <TabItem />
      </div>
    </div>
  );
};

export default MyPage;
