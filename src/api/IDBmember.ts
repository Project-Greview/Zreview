import CryptoJS from "crypto-js";
import { getMyWriteReviewFromIndexedDB } from "./IDBreview";

// const idb =
//   window.indexedDB ||
//   window.mozIndexedDB ||
//   window.webkitIndexedDB ||
//   window.msIndexedDB ||
//   window.shimIndexedDB;
const idb = window.indexedDB;

type PostDataType = {
  password: string;
  email: string;
  phone: string;
  name: string;
  nickname: string;
  thumbnail: string;
  location: string;
  myLatitude: number;
  myLongitude: number;
};
type getData = {
  isLogin: boolean;
  nickname: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  myLatitude: number;
  myLongitude: number;
  id: number;
  writeReview: number;
  writeComment: number;
};

/**
 * 회원가입 API
 * @param postData 회원가입 시 해당 사용자 데이터
 *      email: 사용자 이메일(로그인 아이디),
        password: 사용자 패스워드,
        phone: 사용자 휴대폰 번호,
        name: 사용자 성함,
        nickname: 사용자 닉네임,
        thumbnail: 사용자 프로필 이미지,
        location: 사용자가 지정한 동네명,
        myLatitude: 사용자가 지정한 동네명에대한 위도,
        myLongitude: 사용자가 지정한 동네명에대한 경도,
 */
const SecretKey: any | string = process.env.REACT_APP_CRYPTOJS_SECRET_KEY;
export const addMemberDataToIndexedDB = (postData: PostDataType) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);
    const encryptedPassword = CryptoJS.AES.encrypt(
      postData.password,
      SecretKey
    ).toString();
    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction("member", "readwrite");
      const memberDB = transaction.objectStore("member");

      const member = memberDB.put({
        email: postData.email,
        password: encryptedPassword,
        phone: postData.phone,
        name: postData.name,
        nickname: postData.nickname,
        thumbnail: "",
        location: postData.location,
        myLatitude: postData.myLatitude,
        myLongitude: postData.myLongitude,
      });
      member.onsuccess = (e) => {
        transaction.oncomplete = () => {
          db.close();
        };
        resolve(e.type);
        console.log(e.type);
      };

      member.onerror = (e) => {
        console.log("error", e);
        reject(e);
      };
    };
  });
};

// GET CHECK EMAIL
/**
 * 회원가입 시 이메일(아이디) 중복 체크
 * @param email 사용자가 입력한 이메일 주소
 * @param emailDomain 사용자가 입력한 이메일 도메인
 * @returns 중복이면 false 중복이 아니면 true
 */
export const getCheckMemberEmailDuplicationIndexedDB = (
  email: string,
  emailDomain: string
) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);
    dbOpen.onsuccess = () => {
      let db = dbOpen.result;
      const transaction = db.transaction("member", "readonly");
      const objectStore = transaction.objectStore("member");

      const request = objectStore.getAll();
      request.onsuccess = (e: any) => {
        const result = e.target.result;
        const matchedMember = result.find(
          (member: any) => member.email === email + "@" + emailDomain
        );
        if (matchedMember) {
          resolve(false);
        } else {
          resolve(true);
        }
      };

      request.onerror = (e) => {
        reject(e);
      };
    };
  });
};

// GET CHECK PHONE
/**
 * 회원가입 시 휴대폰번호 중복 체크
 * @param phone  사용자가 입력한 휴대폰 번호
 * @returns 중복이면 false 중복이 아니면 true
 */
export const getCheckMemberPhoneDuplicationIndexedDB = (phone: string) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);
    dbOpen.onsuccess = () => {
      let db = dbOpen.result;
      const transaction = db.transaction("member", "readonly");
      const objectStore = transaction.objectStore("member");

      const request = objectStore.getAll();
      request.onsuccess = async (e: any) => {
        const result = e.target.result;
        const matchedMember = result.find(
          (member: any) => member.phone === phone
        );
        if (matchedMember !== undefined) {
          resolve(false);
        } else {
          resolve(true);
        }
      };

      request.onerror = (e) => {
        reject(e);
      };
    };
  });
};

// GET CHECK NICKNAME
export const getCheckMemberNicknameDuplicationIndexedDB = (
  nickname: string
) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);

    dbOpen.onsuccess = () => {
      let db = dbOpen.result;
      const transaction = db.transaction("member", "readonly");
      const objectStore = transaction.objectStore("member");

      const request = objectStore.getAll();
      request.onsuccess = (e: any) => {
        const result = e.target.result;
        const matchedMember = result.find(
          (member: any) => member.nickname === nickname
        );
        if (matchedMember) {
          resolve(false);
        } else {
          resolve(true);
        }
      };

      request.onerror = (e) => {
        reject(e);
      };
    };
  });
};

// GET LOGIN
export const getLoginMemberFromIndexedDB = async (id: string, pw: string) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);

    dbOpen.onsuccess = () => {
      let db = dbOpen.result;
      const transaction = db.transaction("member", "readonly");
      const objectStore = transaction.objectStore("member");

      const request = objectStore.getAll();

      request.onsuccess = async (e: any) => {
        const result = e.target.result;
        const matchedMember = result.find((member: any) => {
          const decryptedPassword = CryptoJS.AES.decrypt(
            member.password,
            SecretKey
          ).toString(CryptoJS.enc.Utf8);
          return member.email === id && decryptedPassword === pw;
        });

        if (matchedMember) {
          try {
            const getMyInfo: any | getData = await getMemberInfoFromIndexedDB(
              matchedMember.id
            );
            resolve({
              isLogin: true,
              nickname: getMyInfo.nickname,
              name: getMyInfo.name,
              email: getMyInfo.email,
              phone: getMyInfo.phone,
              location: getMyInfo.location,
              myLatitude: getMyInfo.myLatitude,
              myLongitude: getMyInfo.myLongitude,
              id: getMyInfo.id,
              writeReview: getMyInfo.writeReview,
              writeComment: getMyInfo.writeComment,
            });
          } catch (error) {
            console.log(error);
            reject(error);
          }
        } else {
          resolve(null);
        }
      };
      request.onerror = (e) => {
        reject(e);
      };
    };
  });
};

// PATCH MY PROFILE
export const patchMyProfileFromIndexedDB = (id: number, patchData: any) => {
  return new Promise((resolve, reject) => {
    const dbOpen = indexedDB.open("zreview", 1);

    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction("member", "readwrite");
      const memberDB = transaction.objectStore("member");

      const currentUser = memberDB.get(id);

      currentUser.onsuccess = (e: any) => {
        const data = e.target.result;
        if (data) {
          // Update only the fields provided in patchData
          for (const key in patchData) {
            if (patchData.hasOwnProperty(key)) {
              data[key] = patchData[key];
            }
          }
          const updateRequest = memberDB.put(data);

          updateRequest.onsuccess = (e) => {
            console.log(e);
            resolve(e);
          };
          updateRequest.onerror = (e) => {
            console.error(e);
            reject(e);
          };
        } else {
          reject(
            new Error(
              "해당 사용자 ID가 일치하는 정보가 없습니다. 관리자에게 문의해주세요."
            )
          );
        }
      };

      currentUser.onerror = (e) => {
        console.error(e);
        reject(e);
      };
    };

    dbOpen.onerror = (e) => {
      console.error(e);
      reject(e);
    };
  });
};
// GET MEMBER MINIMUM INFO
export const getMemberInfoFromIndexedDB = async (id: number) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);
    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction("member", "readonly");
      const objectStore = transaction.objectStore("member");

      const request = objectStore.get(id);
      request.onsuccess = (e: any) => {
        const result = e.target.result;
        const writerReview = () => {
          return getMyWriteReviewFromIndexedDB(result.id, "review");
        };
        const commentReview = () => {
          return getMyWriteReviewFromIndexedDB(result.id, "comment");
        };

        resolve({
          ...result,
          writeReview: writerReview.length,
          writeComment: commentReview.length,
        });
      };

      request.onerror = (e) => {
        reject(e);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
};
