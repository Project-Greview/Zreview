// MODULE
import { useState, ChangeEvent, useEffect } from "react";
import styled from "styled-components";
// HOOK
import {
  addCommentFromIndexedDB,
  getTargetReviewCommentFromIndexedDB,
} from "api/IDBcomment";
// UTIL
import { getCookie } from "utils/cookies";
// SVG
import { ReactComponent as ArrowLeft } from "../../assets/image/icon/arrow-left.svg";
import { ReactComponent as SendMessage } from "../../assets/image/icon/send_message.svg";
import { ReactComponent as LikeIcon } from "../../assets/image/icon/like_icon.svg";
import { ReactComponent as Logo } from "../../assets/image/icon/marker_c.svg";
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
const CommentItem = styled.li`
  .type_img {
    flex-basis: 3.5rem;
    height: 3.5rem;
    margin-right: 1rem;
    border-radius: 50%;
    border: 1px solid var(--disable-color);
    overflow: hidden;
  }
  .comment {
    font-size: 1.4rem;
    color: var(--disable-text);
    line-height: 2;
  }
  .comment_info {
    margin-top: 1rem;
    > * {
      font-size: 1.2rem;
      color: var(--disable-text);
    }
  }
`;
// PROPS TYPE
type CommentType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  id: number;
  setId: (id: number) => void;
};
const Comment: React.FC<CommentType> = ({ isOpen, setIsOpen, id, setId }) => {
  const [cmtData, setCmtData] = useState<any[]>([]);
  const [cmt, setCmt] = useState<string>("");

  const onChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCmt(e.target.value);
  };
  const handleCommentBox = () => {
    setIsOpen(false);
    setId(-1);
    setCmt("");
  };

  const handlePostComment = async () => {
    const created_dt: any = new Date().toISOString();
    try {
      const response = await addCommentFromIndexedDB(
        id,
        getCookie("user").name,
        getCookie("user").nickname,
        getCookie("user").thumbnail,
        cmt,
        created_dt
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setCmt("");
      getCommentData();
    }
  };
  const getCommentData = async () => {
    try {
      const response: any = await getTargetReviewCommentFromIndexedDB(id);
      console.log(response);
      setCmtData(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (id !== -1) {
      getCommentData();
    }
  }, [id]);

  return (
    <CommentFrame className={`fixed ${isOpen}`}>
      <div className="header_section flex flex_jc_s flex_ai_c">
        <button
          className="back_btn flex flex_ai_c"
          onClick={() => handleCommentBox()}
        >
          <ArrowLeft color={"#3a3a3a"} />
        </button>
        <div className="page_title flex flex_jc_c flex_ai_c">댓글</div>
      </div>
      <ul className="comment_list">
        {cmtData.length === 0 ? (
          <li className="empty_list flex flex_jc_c flex_ai_c">
            아직 댓글이 없습니다.
          </li>
        ) : (
          cmtData.map((item: any, index: number) => {
            const formattedDate = new Date(item?.created_dt).toLocaleDateString(
              "ko-KR",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            );
            return (
              <CommentItem key={"cmt" + index} className="flex">
                <div className="type_img">
                  <Logo width={35} height={35} />
                </div>
                <div>
                  <div className="nickname">{item.writerId}</div>
                  <div className="comment">{item.comment}</div>
                  <div className="comment_info flex flex_ai_c">
                    <div className="created_at">{formattedDate}</div>
                    <button>답글달기</button>
                    <button>
                      <LikeIcon color={"#ededed"} />
                    </button>
                  </div>
                </div>
              </CommentItem>
            );
          })
        )}
      </ul>
      <div className="cmt_input_box absolute flex flex_jc_sb flex_ai_c">
        <input
          type="text"
          name=""
          id=""
          placeholder="댓글을 입력하세요"
          value={cmt}
          onChange={onChangeComment}
        />
        <label htmlFor="" className="flex flex_jc_c flex_ai_c">
          <SendMessage
            color={
              cmt.length === 0
                ? "var(--depp-border-color)"
                : "var(--point-color)"
            }
            onClick={() => handlePostComment()}
          />
        </label>
      </div>
    </CommentFrame>
  );
};

export default Comment;
