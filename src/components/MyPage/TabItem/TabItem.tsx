// MODULE
import { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import styled from "styled-components";
// HOOK
import {
  getMyWriteReviewFromIndexedDB,
  getDataFromIndexedDB,
} from "api/IDBreview";
import { getCookie } from "utils/cookies";
// UTIL
import { calcDate } from "utils/dateCalc";
// RECOIL STATE
import { tabMenuTypeState } from "state/mypageTabState";
import { toastPopupState } from "state/commonState";
// COMPONENT
import DetailItem from "components/DetailItem";
import ToastPopup from "components/ToastPopup";
// SVG
import { ReactComponent as Logo } from "../../../assets/image/icon/marker_c.svg";
import { ReactComponent as LikeIcon } from "../../../assets/image/icon/like_icon.svg";
// PROPS TYPE
type TabItemProps = {};
type ReviewDataType = {
  id: number;
  place_name: string;
  place_address: string;
  content: string;
  location_lat: number;
  location_lon: number;
  created_at: string;
  updated_at: string;
  hashtag: string[];
  images: string[];
  views: number;
  rating: number;
  likes: number;
  comments: number;
  writer: string;
  profile: string;
};
type CommentDataType = {
  resultData: object[];
  type: string;
  openMenu: any;
};
// STYLED
const CommentBoxFrame = styled.li`
  padding: 2rem;
  margin: 1.5rem 0rem;
  background: var(--white-color);
  border-radius: 5px;
  border: 1px solid var(--border-color);
  z-index: 1;
  .type_img {
    flex-basis: 3.5rem;
    height: 3.5rem;
    margin-right: 1rem;
    border-radius: 50%;
    border: 1px solid var(--border-color);
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
      margin-right: 1rem;
    }
  }
  .menu_btn {
    width: 1.6rem;
    height: 1.6rem;
    top: 2rem;
    right: 2rem;
    > div {
      position: absolute;
      width: 0.4rem;
      height: 0.4rem;
      background: var(--disable-color);
      border-radius: 50%;
      &:first-child {
        top: 0;
      }
      &:nth-child(2) {
        top: 40%;
      }
      &:last-child {
        top: 80%;
      }
    }
  }
`;

const CommentBox: React.FC<CommentDataType> = ({
  resultData,
  type,
  openMenu,
}) => {
  return (
    <ul>
      {resultData?.map((item: any) => (
        <CommentBoxFrame key={item.id} className="relative flex">
          <div
            className="menu_btn absolute flex flex_jc_c flex_ai_c"
            onClick={openMenu}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="type_img">
            <Logo width={35} height={35} />
          </div>
          <div>
            <div className="nickname">{item.writer}</div>
            <div className="comment">{item.comment}</div>
            <div className="comment_info flex flex_ai_c">
              <div className="created_at">
                {calcDate(new Date(item?.created_dt), new Date())}
              </div>
              <button>답글달기</button>
              <button>
                <LikeIcon color={"#ededed"} />
              </button>
            </div>
          </div>
        </CommentBoxFrame>
      ))}
    </ul>
  );
};

const TabItem: React.FC<TabItemProps> = () => {
  const [toastModal, setToastModal] = useRecoilState<boolean>(toastPopupState);
  const [writeData, setWriteData] = useState<any>([]);
  const [likeData, setLikeData] = useState<any>([]);
  const [subTab, setSubTab] = useState<string>("likeReview");

  const getType = useRecoilValue(tabMenuTypeState);

  const getId = getCookie("user").id;
  const box1Height = document
    .querySelector(".scroll_section ")
    ?.getBoundingClientRect().height;
  const box2Height = document
    .querySelector(".tab_buttons ")
    ?.getBoundingClientRect().height;

  const handleSelectSubTabItem = (e: any) => {
    setSubTab(e.currentTarget.classList[0]);
    console.log(e.currentTarget.classList[0]);
  };

  const { data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["likeReview"],
      queryFn: ({ pageParam = 1 }) => getDataFromIndexedDB(1),
      initialPageParam: 2,
      getNextPageParam: (lastPage: any, allPages, lastPageParam) => {
        if (lastPage?.data?.length === 0 || lastPage === undefined) {
          return undefined;
        } else {
          return lastPageParam + 1;
        }
      },
    });
  console.log(
    "data",
    data
    // "\nfetchNextPage",
    // fetchNextPage,
    // "\nisFetching",
    // isFetching,
    // "\nisFetchingNextPage",
    // isFetchingNextPage,
    // "\nhasNextPage",
    // hasNextPage
  );

  useEffect(() => {
    getMyWriteReviewFromIndexedDB(getId, getType)
      .then((data: ReviewDataType | any) => {
        if (getType !== "like") {
          setWriteData(data);
        } else {
          setLikeData(data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
    // if (getType === "like") {
    //   getDataFromIndexedDB();
    // }
  }, [getType]);
  // console.log("likeData", likeData);
  return (
    <>
      <ToastPopup popupType={"comment_menu"} ready={toastModal} />
      <div
        className="list_section"
        style={{
          minHeight: `calc(100vh - ((${box1Height}px + ${box2Height}px) + 69px))`,
        }}
      >
        <div className="count flex flex_jc_s flex_ai_c">
          {getType === "like" ? (
            <div className="like_type flex flex_ai_c">
              <div
                className={`likeReview ${"likeReview" === subTab && "active"}`}
                onClick={(e) => handleSelectSubTabItem(e)}
              >
                리뷰 ({likeData.review?.length})
              </div>
              <div
                className={`commentReview ${
                  "commentReview" === subTab && "active"
                }`}
                onClick={(e) => handleSelectSubTabItem(e)}
              >
                댓글 ({likeData.comment?.length})
              </div>
            </div>
          ) : (
            <>
              <div>
                {getType === "review"
                  ? "내가 작성한 리뷰"
                  : getType === "comment" && "내가 작성한 댓글"}
              </div>
              <div>({writeData.length})</div>
            </>
          )}
        </div>
        {getType === "review" && (
          <DetailItem resultData={writeData} place={""} type={"mypage"} />
        )}

        {getType === "comment" && (
          <CommentBox
            resultData={writeData}
            type={"comment"}
            openMenu={() => setToastModal(true)}
          />
        )}
        {getType === "like" && (
          <>
            {subTab === "likeReview" ? (
              <>
                {likeData?.review?.map((item: any) => {
                  const getItem = Number(item.id.replace("-review", ""));
                  getDataFromIndexedDB(getItem);
                  // .then((item: any) => {})
                  // .catch((error) => {
                  //   console.log(error);
                  // });
                  console.log(
                    "result",
                    getDataFromIndexedDB(getItem).then((res: any) => {
                      return res;
                    })
                  );
                  return (
                    <div key={item.id}>
                      {Number(item.id.replace("-review", ""))}
                    </div>
                  );
                })}
              </>
            ) : (
              "bbbbb"
            )}
          </>
        )}
      </div>
    </>
  );
};

export default TabItem;
