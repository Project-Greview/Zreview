// const idb =
//   window.indexedDB ||
//   window.mozIndexedDB ||
//   window.webkitIndexedDB ||
//   window.msIndexedDB ||

import { getMemberInfoFromIndexeDB } from "./IDBmember";

//   window.shimIndexedDB;
const idb = window.indexedDB;

// POST REVIEW LIKE
// 리뷰 좋아요
export const postReviewLikeFromIndexedDB = (id: number, memberId: number) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);
    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction("like", "readwrite");
      const objectStore = transaction.objectStore("like");
      const like = objectStore.put({
        review: id,
        member: [memberId],
      });

      like.onsuccess = (e) => {
        transaction.oncomplete = () => {
          db.close();
        };
        resolve(e.type);
        console.log(e);
      };

      like.onerror = (e) => {
        console.log(e);
        reject(e);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
};
