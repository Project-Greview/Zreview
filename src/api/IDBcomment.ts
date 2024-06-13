const idb = window.indexedDB;

type PostCommentType = {};

// POST COMMENT
// 댓글 작성하기
export const addCommentFromIndexedDB = (
  id: number,
  writerId: number,
  nickname: string,
  writerProfile: string,
  comment: string,
  created_dt: Date
) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);

    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction("comment", "readwrite");
      const objectStore = transaction.objectStore("comment");

      const addComment = objectStore.put({
        reviewId: id,
        writerId: writerId,
        writer: nickname,
        comment: comment,
        liked: 0,
        created_dt: created_dt,
      });

      addComment.onsuccess = (e) => {
        incrementLikesInIndexedDB(id)
          .then(() => {
            resolve(e);
          })
          .catch((error) => {
            reject(error);
          });
      };
      addComment.onerror = (e) => {
        console.log("error", e);
        reject(e);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
};

const incrementLikesInIndexedDB = (reviewId: number) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);
    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction("review", "readwrite");
      const reviewDB = transaction.objectStore("review");

      // reviewId에 해당하는 리뷰를 가져옴
      const getRequest = reviewDB.get(reviewId);

      getRequest.onsuccess = (e: any) => {
        const review = e.target.result;

        if (review) {
          // comments 값을 1 증가시킴
          review.comments += 1;

          // 업데이트된 리뷰를 저장
          const updateRequest = reviewDB.put(review);

          updateRequest.onsuccess = (e) => {
            transaction.oncomplete = () => {
              db.close();
            };
            resolve(e.type);
          };

          updateRequest.onerror = (e) => {
            console.log("error", e);
            reject(e);
          };
        } else {
          reject(new Error("Review not found"));
        }
      };

      getRequest.onerror = (e) => {
        console.log("error", e);
        reject(e);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };

    dbOpen.onerror = (e) => {
      console.log("error", e);
      reject(e);
    };
  });
};
// POST RE-COMMENT
// 대댓글 작성하기
export const addReCommentFromIndexedDB = () => {
  return new Promise((resolve, rejcet) => {
    const dbOpen = idb.open("zreview", 1);
  });
};
// GET COMMENT
// 댓글 가져오기
export const getTargetReviewCommentFromIndexedDB = (id: number) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);

    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction("comment", "readonly");
      const commentDB = transaction.objectStore("comment");
      const comment = commentDB.getAll();

      comment.onsuccess = (e: any) => {
        const result = e.target.result;
        const getData = result.filter((result: any) => result.reviewId === id);
        resolve(getData);
      };
      comment.onerror = (e) => {
        console.log(e);
        reject(e);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
};
