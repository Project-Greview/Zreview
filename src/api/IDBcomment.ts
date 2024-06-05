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
        console.log(e);
        resolve(e);
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
