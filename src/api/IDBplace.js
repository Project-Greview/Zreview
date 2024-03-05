const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

// POST PLACE
export const addPlaceDataToIndexedDB = (postData) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);
    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction("place", "readwrite");
      const placeDB = transaction.objectStore("place");

      const place = placeDB.put({
        place_name: postData.place_name,
        location_lat: postData.location_lat,
        location_lon: postData.location_lon,
        place_address: postData.place_address,
        place_score: 500,
      });

      place.onsuccess = (e) => {
        transaction.oncomplete = () => {
          db.close();
        };
        resolve(e);
        console.log("place", e);
      };

      place.onerror = (e) => {
        reject(e);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
};

// PATCH TARGET PLACE
export const patchPlaceDataFromIndexedDB = (patch_data) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);
    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction("place", "readwrite");
      const placeDB = transaction.objectStore("place");

      const getRequest = placeDB.get(patch_data.key);

      getRequest.onsuccess = (event) => {
        const existingPlace = event.target.result;

        if (existingPlace) {
          const updatedScore = existingPlace.place_score + patch_data.score;

          existingPlace.place_score = updatedScore;
          placeDB.put(existingPlace);

          resolve(updatedScore);
        } else {
          reject(new Error("Place not found"));
        }
      };

      getRequest.onerror = (e) => {
        console.log("Error getting place", e);
        reject(e);
      };
    };

    dbOpen.onerror = (e) => {
      console.log("Error opening database", e);
      reject(e);
    };
  });
};

// GET ALL PLACE
export const getAllPlaceDataFromIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);

    dbOpen.onsuccess = () => {
      let db = dbOpen.result;
      const transaction = db.transaction("place", "readonly");
      const placeDB = transaction.objectStore("place");
      const place = placeDB.getAll();

      place.onsuccess = (e) => {
        const data = e.target.result;
        resolve(data);
      };

      place.onerror = (e) => {
        console.log("error", e);
        reject(e);
      };
      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
};

// GET TARGET PLACE
export const getPlaceDataFromIndexedDB = (place_info) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);

    dbOpen.onsuccess = () => {
      let db = dbOpen.result;
      const transaction = db.transaction("place", "readonly");
      const objectStore = transaction.objectStore("place");

      const request = objectStore.getAll();

      request.onsuccess = (e) => {
        const result = e.target.result;
        resolve(
          result.filter(
            (result) =>
              result.place_name === place_info.place_name &&
              result.place_address === place_info.place_address &&
              result.location_lat === place_info.location_lat &&
              result.location_lon === place_info.location_lon
          )
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
