// const idb =
//   window.indexedDB ||
//   window.mozIndexedDB ||
//   window.webkitIndexedDB ||
//   window.msIndexedDB ||
//   window.shimIndexedDB;
const idb = window.indexedDB;

type PostDataType = {
  place_name: string;
  location_lat: number;
  location_lon: number;
  place_address: string;
  content: string;
  hashtag: string;
  rating: number;
  images: unknown;
  created_at: Date;
  member: string;
  views: number;
  likes: number;
  comments: string;
  writer: string;
  profile: string;
};
// POST REVIEW
export const addDataToIndexedDB = (postData: PostDataType) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);
    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction("review", "readwrite");
      const reviewDB = transaction.objectStore("review");

      const review = reviewDB.put({
        place_name: postData.place_name,
        location_lat: postData.location_lat,
        location_lon: postData.location_lon,
        place_address: postData.place_address,
        content: postData.content,
        hashtag: postData.hashtag,
        score: postData.rating,
        images: postData.images,
        created_at: postData.created_at,
        member: postData.member,
        views: postData.views,
        likes: postData.likes,
        comments: postData.comments,
        writer: postData.writer,
        profile: postData.profile,
      });

      review.onsuccess = (e) => {
        transaction.oncomplete = () => {
          db.close();
        };
        resolve(e.type);
        console.log(e.type);
      };

      review.onerror = (e) => {
        console.log("error", e);
        reject(e);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
};
// GET REVIEW
export const getAllDataFromIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);

    dbOpen.onsuccess = () => {
      let db = dbOpen.result;
      const transaction = db.transaction("review", "readonly");
      const reviewDB = transaction.objectStore("review");
      const review = reviewDB.getAll();

      review.onsuccess = (e: any) => {
        const data = e.srcElement.result;
        resolve(data);
      };

      review.onerror = (e) => {
        console.log("error", e);
        reject(e);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
};

// GET DETAIL REVIEW
export const getDataFromIndexedDB = () => {
  const dbOpen = idb.open("zreview", 1);
  const id = 5;
  dbOpen.onsuccess = () => {
    let db = dbOpen.result;
    const transaction = db.transaction("review", "readonly");
    const reviewDB = transaction.objectStore("review");
    const review = reviewDB.get(id);

    review.onsuccess = (e) => {
      console.log(e);
    };

    review.onerror = (e) => {
      console.log("error", e);
    };

    transaction.oncomplete = () => {
      db.close();
    };
  };
};

// GET TARGET REVIEW
export const getAllTargetDataFromIndexedDB = (target_name: string) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);

    dbOpen.onsuccess = () => {
      let db = dbOpen.result;
      const transaction = db.transaction("review", "readonly");
      const objectStore = transaction.objectStore("review");

      const request = objectStore.getAll();

      request.onsuccess = (e: any) => {
        const result = e.target.result;
        resolve(
          result.filter((result: any) => result.place_name === target_name)
        );
      };

      request.onerror = (e) => {
        console.log("error", e);
        reject(e);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
};

const generateHashtagRanking = (hashtags: object[]) => {
  const hashtagCounts: any = {};

  // 해시태그 카운트
  hashtags.forEach((tag: any) => {
    if (hashtagCounts[tag]) {
      hashtagCounts[tag]++;
    } else {
      hashtagCounts[tag] = 1;
    }
  });

  // 해시태그를 등장 횟수에 따라 정렬
  const sortedHashtags = Object.keys(hashtagCounts).sort(
    (a, b) => hashtagCounts[b] - hashtagCounts[a]
  );
  const top5Hashtags = sortedHashtags.slice(0, 5);
  return top5Hashtags;
};
// GET HASHTAG RANKING
export const getHashtagRankingFromIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);

    dbOpen.onsuccess = () => {
      let db = dbOpen.result;
      const transaction = db.transaction("review", "readonly");
      const objectStore = transaction.objectStore("review");

      const request = objectStore.getAll();

      request.onsuccess = (e: any) => {
        const result = e.target.result;
        const hashtags = result.map((result: any) => result.hashtag).flat();
        const top5Hashtags = generateHashtagRanking(hashtags);
        resolve(top5Hashtags);
      };

      request.onerror = (e) => {
        console.log("error", e);
        reject(e);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
};

// GET MY WRITE REVIEW
export const getMyWriteReviewFromIndexedDB = (id: number, nickname: string) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);

    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction("review", "readonly");
      const objectStore = transaction.objectStore("review");

      const request = objectStore.getAll();

      request.onsuccess = (e: any) => {
        const result = e.target.result;
        resolve(result.filter((result: any) => result.writer === nickname));
      };

      request.onerror = (e) => {
        console.log("error", e);
        reject(e);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
};
// POST COMMENT
export const addCommentFromIndexedDB = (
  id: number,
  nickname: string,
  writerId: number,
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
        writerNickname: nickname,
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
// POST RECOMMENT
export const addReCommentFromIndexedDB = () => {
  return new Promise((resolve, rejcet) => {
    const dbOpen = idb.open("zreview", 1);
  });
};
