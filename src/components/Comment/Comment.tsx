// MODULE
import { useState, ChangeEvent } from "react";
import styled from "styled-components";
// HOOK
import { addCommentFromIndexedDB } from "api/IDBreview";
// SVG
import { ReactComponent as ArrowLeft } from "../../assets/image/icon/arrow-left.svg";
import { ReactComponent as SendMessage } from "../../assets/image/icon/send_message.svg";
// STYLED
const CommentFrame = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  right: 100%;
  padding: 0rem 2rem;
  background: var(--white-color);
  z-index: 3;
  transition: all 0.1s;
  &.true {
    right: 0;
  }
  > .header_section {
    height: var(--header-height);
  }
  .page_title {
    padding-left: 2rem;
  }
  .comment_list {
    li {
      &.empty_list {
        height: 30vh;
        color: #959292;
      }
    }
  }
  .cmt_input_box {
    width: 100%;
    height: 6rem;
    padding: 0 2rem;
    left: 0;
    bottom: 0;
    border-top: 1px solid var(--border-color);
    input {
      width: calc(100% - 3.5rem);
      font-size: 1.6rem;
      border: none;
      &:focus {
        outline: none;
      }
    }
    label {
      flex-basis: 3.5rem;
    }
  }
  svg * {
    transition: all 0.3s;
  }
`;
// PROPS TYPE
type CommentType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
const Comment: React.FC<CommentType> = ({ isOpen, setIsOpen }) => {
  const [cmtData, setCmtData] = useState<any[]>([]);
  const [cmt, setCmt] = useState<string>("");

  const onChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCmt(e.target.value);
  };

  const handlePostComment = () => {};
  return (
    <CommentFrame className={`fixed ${isOpen}`}>
      <div className="header_section flex flex_jc_s flex_ai_c">
        <div
          className="back_btn flex flex_ai_c"
          onClick={() => setIsOpen(false)}
        >
          <ArrowLeft color={"#3a3a3a"} />
        </div>
        <div className="page_title flex flex_jc_c flex_ai_c">댓글</div>
      </div>
      <ul className="comment_list">
        {cmtData.length === 0 ? (
          <li className="empty_list flex flex_jc_c flex_ai_c">
            아직 댓글이 없습니다.
          </li>
        ) : (
          cmtData.map((item: any[], index: number) => {
            return <li key={index}>댓글</li>;
          })
        )}
      </ul>
      <div className="cmt_input_box absolute flex flex_jc_sb flex_ai_c">
        <input
          type="text"
          name=""
          id=""
          placeholder="댓글을 입력하세요"
          onChange={onChangeComment}
        />
        <label htmlFor="" className="flex flex_jc_c flex_ai_c">
          <SendMessage
            color={
              cmt.length === 0
                ? "var(--depp-border-color)"
                : "var(--point-color)"
            }
          />
        </label>
      </div>
    </CommentFrame>
  );
};

export default Comment;
