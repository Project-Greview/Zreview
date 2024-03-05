const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

// POST REVIEW
export const addDataToIndexedDB = (postData) => {
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

      review.onsuccess = (e) => {
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
export const getAllTargetDataFromIndexedDB = (target_name) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);

    dbOpen.onsuccess = () => {
      let db = dbOpen.result;
      const transaction = db.transaction("review", "readonly");
      const objectStore = transaction.objectStore("review");

      const request = objectStore.getAll();

      request.onsuccess = (e) => {
        const result = e.target.result;
        resolve(result.filter((result) => result.place_name === target_name));
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
