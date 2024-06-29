// const idb =
//   window.indexedDB ||
//   window.mozIndexedDB ||
//   window.webkitIndexedDB ||
//   window.msIndexedDB ||

import { getMemberInfoFromIndexedDB } from "./IDBmember";

//   window.shimIndexedDB;
const idb = window.indexedDB;

type PostDataType = {
  place_name: string;
  location_lat: number;
  location_lon: number;
  place_address: string;
  placeDepth3: string;
  content: string;
  hashtag: string;
  rating: number;
  images: unknown;
  created_at: Date;
  member_id: number;
  views: number;
  likes: number;
  comments: string;
  writer: string;
  profile: string;
};

// POST REVIEW
//
/**
 * 리뷰 등록 API
 * @param postData 리뷰 등록 시 저장되는 데이터
 *      place_name: 장소명,
        location_lat: 해당 장소 위도,
        location_lon: 해당 장소 경도,
        place_address: 해당 장소 주소,
        placeDepth3: 해당 장소에 대한 동 이름,
        content: 리뷰 내용,
        hashtag: 해시태그 (최대3개),
        score: 별점,
        images: 사진,
        created_at: 리뷰 작성일,
        member: 리뷰 작성자 고유 ID,
        views: 조회수,
        likes: 좋아요 수,
        comments: 댓글 수,
 * @returns 
 */
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
        placeDepth3: postData.placeDepth3,
        content: postData.content,
        hashtag: postData.hashtag,
        score: postData.rating,
        images: postData.images,
        created_at: postData.created_at,
        member: postData.member_id,
        views: postData.views,
        likes: postData.likes,
        comments: postData.comments,
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
/**
 * 전체 리뷰 가져오기
 * @returns review data
 */
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

/**
 * 선택된 리뷰에 대한 상세 리뷰 가져오기 API
 */
export const getDataFromIndexedDB = (id: number) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);
    dbOpen.onsuccess = () => {
      let db = dbOpen.result;
      const transaction = db.transaction("review", "readonly");
      const reviewDB = transaction.objectStore("review");
      const review = reviewDB.get(id);

      review.onsuccess = (e: any) => {
        const result = e.target.result;
        resolve(result);
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

/**
 * 선택된 장소에 대한 리뷰 데이터 가져오기 API
 * @param target_name
 * @returns
 */
export const getAllTargetDataFromIndexedDB = (target_name: string) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);

    dbOpen.onsuccess = () => {
      let db = dbOpen.result;
      const transaction = db.transaction("review", "readonly");
      const objectStore = transaction.objectStore("review");

      const request = objectStore.getAll();

      request.onsuccess = async (e: any) => {
        const result = e.target.result;
        try {
          const filterData = result.filter(
            (result: any) => result.place_name === target_name
          );
          // 게시글 작성 시 작성자의 고유 ID를 사용하여 사용자 정보 데이터 가져오기
          const getWriter = filterData.map((item: any) =>
            getMemberInfoFromIndexedDB(item.member)
          );
          const memberInfos: any = await Promise.all(getWriter);
          resolve(
            filterData.map((item: any, index: number) => ({
              ...item,
              writer: memberInfos[index].nickname,
              profile: memberInfos[index].thumbnail,
            }))
          );
        } catch (error) {
          console.log(error);
        }
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

/**
 * 현재 위치 기반의 해시태그 랭킹
 * @param lat 사용자의 현재 위치 위도
 * @param lon 사용자의 현재 위치 경도
 * @returns 현재 접속한 위치 기반에서 작성된 게시글에 추가된 해시태그 랭킹
 */
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
export const getHashtagRankingFromIndexedDB = (lat: number, lon: number) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);

    dbOpen.onsuccess = () => {
      let db = dbOpen.result;
      const transaction = db.transaction("review", "readonly");
      const objectStore = transaction.objectStore("review");

      const request = objectStore.getAll();

      request.onsuccess = (e: any) => {
        const result = e.target.result;

        const calcPlaceRange = result.filter((place: any) => {
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

        const hashtags = calcPlaceRange
          .map((result: any) => result.hashtag)
          .flat();
        const top5Hashtags = generateHashtagRanking(hashtags).slice(0, 5);
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
// 현재위치 기반 계산하기
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

/**
 * 내가 설정한 지역에 대한 리뷰 가져오기 API
 * @param location 사용자가 등록한 내 동네명
 * @returns 해당 동네에서 작성된 리뷰 가져오기
 */
export const getMyLocationReviewFromIndexedDB = (location: string) => {
  // [EDIT] 추후 내가 등록한 동네기준으로만 가져오게 변경
  // [EDIT] nickname 을 동네이름으로
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);

    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction("review", "readonly");
      const objectStore = transaction.objectStore("review");

      const request = objectStore.getAll();

      request.onsuccess = (e: any) => {
        const result = e.target.result;
        resolve(
          result.filter((result: any) => result.placeDepth3 === location)
        );
        // [EDIT] result.writer 를 글 등록 시 location(depth3)으로 변경 필요
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
/**
 * 내가 작성한 리뷰 가져오기 API
 * @param id 사용자 고유 ID
 * @param type 마이페이지 내 탭메뉴 타입 (review, comment)
 * @returns 해당 사용자가 작성한 리뷰, 댓글, 좋아요 리턴
 */
export const getMyWriteReviewFromIndexedDB = (id: number, type: string) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);
    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction(type, "readonly");
      const objectStore = transaction.objectStore(type);

      const request = objectStore.getAll();

      if (type !== "like") {
        request.onsuccess = (e: any) => {
          const result = e.target.result;
          resolve(result.filter((result: any) => result.member === id));
        };
      } else {
        request.onsuccess = async (e: any) => {
          const result = e.target.result;
          try {
            const reviewResults = await Promise.all(
              result
                .filter((item: any) => item.type === "review")
                .map(async (item: any) => {
                  const filteredMembers = item.member.filter(
                    (memberId: any) => memberId === id
                  );
                  const additionalData: any = await getDataFromIndexedDB(
                    Number(item.id.replace("-review", ""))
                  );
                  const getWriter: any = await getMemberInfoFromIndexedDB(
                    additionalData?.member
                  );
                  return filteredMembers.length > 0
                    ? {
                        ...item,
                        member: filteredMembers,
                        additionalData,
                        writer: getWriter.nickname,
                        profile: getWriter.thumbnail,
                      }
                    : null;
                })
            );
            const filteredReviewResults = reviewResults.filter(
              (item: any) => item !== null
            );

            const commentResults = result
              .filter((item: any) => item.type === "comment")
              .map((item: any) => {
                const filteredMembers = item.member.filter(
                  (memberId: any) => memberId === id
                );
                return filteredMembers.length > 0
                  ? { ...item, member: filteredMembers }
                  : null;
              })
              .filter((item: any) => item !== null);

            resolve({
              review: filteredReviewResults,
              comment: commentResults,
            });
          } catch (error) {
            console.error(error);
            reject(error);
          }
        };
      }

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
