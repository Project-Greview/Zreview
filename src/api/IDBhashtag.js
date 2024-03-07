const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

// POST HASHTAG RANKING
export const getHashtagRankingFromIndexedDB = (hashtagData) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);

    dbOpen.onsuccess = () => {
      let db = dbOpen.result;
      const transaction = db.transaction("hashtag", "readonly");
      const hashtagDB = transaction.objectStore("hashtag");

      const hashtag = hashtagDB.put({
        hashtag: hashtagData.hashtag,
        place_depth_3_name: hashtagData.place_name,
        review_id: hashtagData.id,
      });

      hashtag.onsuccess = (e) => {
        transaction.oncomplete = () => {
          db.close();
        };
        resolve(e.type);
        console.log(e.type);
      };

      hashtag.onerror = (e) => {
        console.log("error", e);
        reject(e);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
};
