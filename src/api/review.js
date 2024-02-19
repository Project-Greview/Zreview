export const addDataToIndexedDB = (postData) => {
  const idb =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;
  const dbOpen = idb.open("zreview", 1);
  dbOpen.onsuccess = () => {
    const db = dbOpen.result;
    const transaction = db.transaction("review", "readwrite");
    const reviewDB = transaction.objectStore("review");

    const users = reviewDB.put({
      place_name: postData.place_name,
      location_lat: postData.location_lag,
      location_lng: postData.location_lng,
      place_address: postData.place_address,
      contents: postData.contents,
      hashtag: postData.hashtag,
      score: postData.score,
      images: postData.images,
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
