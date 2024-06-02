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
};
type PatchDataType = {
  key: string;
  score: number;
};
// POST PLACE
// 리뷰 작성 API
export const addPlaceDataToIndexedDB = (postData: PostDataType) => {
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
// 리뷰 작성 후 해당 장소에 대한 점수 변경 API
export const patchPlaceDataFromIndexedDB = (patch_data: PatchDataType) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);
    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction("place", "readwrite");
      const placeDB = transaction.objectStore("place");

      const getRequest = placeDB.get(patch_data.key);

      getRequest.onsuccess = (e: any) => {
        const existingPlace = e.target.result;

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
// 작성된 모든 리뷰 데이터 가져오기 API
export const getAllPlaceDataFromIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);

    dbOpen.onsuccess = () => {
      let db = dbOpen.result;
      const transaction = db.transaction("place", "readonly");
      const placeDB = transaction.objectStore("place");
      const place = placeDB.getAll();

      place.onsuccess = (e: any) => {
        const data = e.target.result;
        // console.log("main", data);
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
// 작성된 리뷰 중 내 위치를 기반으로 5KM이내의 리뷰만 가져오기
export const getCalcPlaceDataFromIndexedDB = (lat: number, lon: number) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);

    dbOpen.onsuccess = () => {
      let db = dbOpen.result;
      const transaction = db.transaction("place", "readonly");
      const placeDB = transaction.objectStore("place");
      const place = placeDB.getAll();

      place.onsuccess = (e: any) => {
        const data = e.target.result;
        const calcPlaceRange = data.filter((place: any) => {
          const placeLatitude = place.location_lat;
          const placeLongitude = place.location_lon;

          const distance = calculateDistance(
            lat,
            lon,
            placeLatitude,
            placeLongitude
          );
          return distance <= 5;
        });
        resolve(calcPlaceRange);
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
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371; // 지구의 반지름 (단위: km)
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // km
  return distance;
}

// 각도를 라디안으로 변환하는 함수
function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

// GET TARGET PLACE
// 선택된 장소에 대한 리뷰 데이터 가져오기 API
export const getPlaceDataFromIndexedDB = (place_info: PostDataType) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);

    dbOpen.onsuccess = () => {
      let db = dbOpen.result;
      const transaction = db.transaction("place", "readonly");
      const objectStore = transaction.objectStore("place");

      const request = objectStore.getAll();

      request.onsuccess = (e: any) => {
        const result = e.target.result;
        resolve(
          result.filter(
            (result: PostDataType) =>
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
