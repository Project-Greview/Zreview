// const idb =
//   window.indexedDB ||
//   window.mozIndexedDB ||
//   window.webkitIndexedDB ||
//   window.msIndexedDB ||
const idb = window.indexedDB;

/**
 * 게시물 좋아요 API
 * @param id 게시물 고유 ID
 * @param memberId 좋아요 누르는 사용자 고유 ID
 * @returns 해당 게시물 좋아요
 */
export const postReviewLikeFromIndexedDB = (id: number, memberId: number) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);

    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction(["like", "review"], "readwrite");
      const likeStore = transaction.objectStore("like");
      const reviewStore = transaction.objectStore("review");

      const getLikeRequest = likeStore.get(id);

      getLikeRequest.onsuccess = (e: any) => {
        const existingLike = e.target.result;
        let updateLikes = false;
        let liked = false;

        if (existingLike) {
          const memberIndex = existingLike.member.indexOf(memberId);
          if (memberIndex > -1) {
            existingLike.member.splice(memberIndex, 1); // memberId가 있으면 삭제
            liked = false; // 좋아요를 취소했으므로 false
          } else {
            existingLike.member.push(memberId); // memberId가 없으면 추가
            liked = true; // 좋아요를 추가했으므로 true
          }
          updateLikes = true;
          likeStore.put(existingLike);
        } else {
          const newLike = {
            review: id,
            member: [memberId],
          };
          likeStore.add(newLike);
          updateLikes = true;
          liked = true; // 새로운 좋아요이므로 true
        }

        if (updateLikes) {
          const getReviewRequest = reviewStore.get(id);

          getReviewRequest.onsuccess = (e: any) => {
            const review = e.target.result;
            if (review) {
              if (liked) {
                review.likes += 1; // 새로운 좋아요를 추가한 경우
              } else {
                review.likes -= 1; // 기존에 있었던 좋아요를 삭제한 경우
              }
              reviewStore.put(review);
            }
          };

          getReviewRequest.onerror = (e) => {
            console.log("Error updating likes in review", e);
            reject(e);
          };
        }

        transaction.oncomplete = () => {
          db.close();
          resolve(liked); // 좋아요 상태 반환
        };
      };

      getLikeRequest.onerror = (e) => {
        console.log("Error fetching like", e);
        reject(e);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };

    dbOpen.onerror = (e) => {
      console.log("Error opening database", e);
      reject(e);
    };
  });
};

// 좋아요 가져오기
export const getReviewLikeFromIndexedDB = (memberId: number) => {
  return new Promise((resolve, reject) => {
    const dbopen = idb.open("zreview", 1);
    dbopen.onsuccess = () => {
      const db = dbopen.result;
      const transaction = db.transaction("like", "readonly");
      const objectStore = transaction.objectStore("like");

      const request = objectStore.getAll();

      request.onsuccess = (e: any) => {
        const result = e.target.result;
      };

      request.onerror = (e) => {
        console.log(e);
        reject(e);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
};
