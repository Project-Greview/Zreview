// MODULE
import { useEffect, useLayoutEffect, useState } from "react";
import { useRecoilState } from "recoil";
// RECOIL STATE
import { tabMenuTypeState } from "state/mypageTabState";
// PROPS TYPE
type TabMenuProps = {};

const MenuName = [
  { name: "리뷰", type: "review" },
  { name: "댓글", type: "comment" },
  { name: "좋아요", type: "like" },
];

const TabMenu: React.FC<TabMenuProps> = () => {
  const [activeType, setActiveType] = useRecoilState<string>(tabMenuTypeState);
  const [linePosition, setLinePosition] = useState<number>(0);
  const position = document
    .querySelector("li.active")
    ?.getBoundingClientRect().left;
  const handleChangeTabMenu = (type: string) => {
    setActiveType(type);
    setLinePosition(position || 0);
  };

  useEffect(() => {
    setActiveType("review");
  }, []);
  useLayoutEffect(() => {
    const position = document
      .querySelector("li.active")
      ?.getBoundingClientRect().left;
    setLinePosition(position || 0);
  }, [activeType]);
  return (
    <ul className="tab_buttons relative flex flex_jc_s flex_ai_c">
      {MenuName.map((menu) => (
        <li
          key={menu.type}
          className={`${
            activeType === menu.type ? "active" : ""
          } relative flex flex_jc_c flex_ai_c`}
          onClick={() => handleChangeTabMenu(menu.type)}
        >
          {menu.name}
        </li>
      ))}
      <li
        className="absolute bottom_line"
        style={{ left: `${linePosition - 20}px` }}
      ></li>
    </ul>
  );
};

export default TabMenu;
