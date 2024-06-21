// const idb =
//   window.indexedDB ||
//   window.mozIndexedDB ||
//   window.webkitIndexedDB ||
//   window.msIndexedDB ||

import { getMemberInfoFromIndexedDB } from "./IDBmember";

//   window.shimIndexedDB;
const idb = window.indexedDB;

// POST REVIEW LIKE
// 리뷰 좋아요
// export const postReviewLikeFromIndexedDB = (id: number, memberId: number) => {
//   return new Promise((resolve, reject) => {
//     const dbOpen = idb.open("zreview", 1);
//     dbOpen.onsuccess = () => {
//       const db = dbOpen.result;
//       const transaction = db.transaction("like", "readwrite");
//       const objectStore = transaction.objectStore("like");
//       const getLike = objectStore.get(id);
//       // const like = objectStore.put({
//       //   review: id,
//       //   member: [memberId],
//       // });

//       getLike.onsuccess = (e: any) => {
//         console.log(e:any);
//         resolve(e:any);
//       };
//       getLike.onerror = (e: any) => {
//         console.log(e:any);
//         reject(e:any);
//       };

//       // like.onsuccess = (e:any) => {
//       //   transaction.oncomplete = () => {
//       //     db.close();
//       //   };
//       //   resolve(e.type);
//       //   console.log(e:any);
//       // };

//       // like.onerror = (e:any) => {
//       //   console.log(e:any);
//       //   reject(e:any);
//       // };

//       transaction.oncomplete = () => {
//         db.close();
//       };
//     };
//   });
// };

export const postReviewLikeFromIndexedDB = (id: number, memberId: number) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);

    dbOpen.onupgradeneeded = (e: any) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("like")) {
        db.createObjectStore("like", { keyPath: "review" });
      }
    };

    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction("like", "readwrite");
      const objectStore = transaction.objectStore("like");

      const getRequest = objectStore.get(id);

      getRequest.onsuccess = (e: any) => {
        const existingEntry = e.target.result;

        if (existingEntry) {
          const memberIndex = existingEntry.member.indexOf(memberId);
          if (memberIndex > -1) {
            existingEntry.member.splice(memberIndex, 1); // memberId가 있으면 삭제
          } else {
            existingEntry.member.push(memberId); // memberId가 없으면 추가
          }
          const updateRequest = objectStore.put(existingEntry);

          updateRequest.onsuccess = (e: any) => {
            resolve(e.type);
            console.log(e);
          };

          updateRequest.onerror = (e: any) => {
            console.log(e);
            reject(e);
          };
        } else {
          const newEntry = {
            review: id,
            member: [memberId],
          };
          const addRequest = objectStore.add(newEntry);

          addRequest.onsuccess = (e: any) => {
            resolve(e.type);
            console.log(e);
          };

          addRequest.onerror = (e: any) => {
            console.log(e);
            reject(e);
          };
        }

        transaction.oncomplete = () => {
          db.close();
        };
      };

      getRequest.onerror = (e: any) => {
        console.log(e);
        reject(e);
      };
    };

    dbOpen.onerror = (e: any) => {
      console.log(e);
      reject(e);
    };
  });
};
