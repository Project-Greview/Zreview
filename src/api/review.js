const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

// POST REVIEW
export const addDataToIndexedDB = (postData) => {
  const dbOpen = idb.open("zreview", 1);
  dbOpen.onsuccess = () => {
    const db = dbOpen.result;
    const transaction = db.transaction("review", "readwrite");
    const reviewDB = transaction.objectStore("review");

    const users = reviewDB.put({
      place_name: postData.place_name,
      location_lat: postData.location_lag,
      location_lon: postData.location_lng,
      place_address: postData.place_address,
      contents: postData.contents,
      hashtag: postData.hashtag,
      score: postData.score,
      images: postData.images,
      created_at: postData.created_at,
      member: postData.member,
      views: postData.views,
      likes: postData.likes,
      comments: postData.comments,
    });

    users.onsuccess = () => {
      transaction.oncomplete = () => {
        db.close();
      };
    };

    users.onerror = (e) => {
      console.log("error", e);
    };
  };
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

      review.onsuccess = (e) => {
        const data = e.srcElement.result;
        resolve(data);
      };

      review.onerror = (e) => {
        console.log("error", e);
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
