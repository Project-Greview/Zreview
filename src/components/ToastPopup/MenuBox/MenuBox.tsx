// MODULE
// PROPS TYPE
type MenuBoxType = {
  popupType: string;
};
const MenuBox: React.FC<MenuBoxType> = ({ popupType }) => {
  return (
    <div className="menu_box_section">
      <ul>
        {popupType === "comment_menu" ? (
          <>
            <li>
              <button>수정</button>
            </li>
            <li>
              <button className="delete_color">삭제</button>
            </li>
          </>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default MenuBox;
