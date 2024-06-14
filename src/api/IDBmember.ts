import CryptoJS from "crypto-js";

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
type PatchDataType = {
  nickname: string;
  thumbnail: string;
  location: string;
};
// POST MEMBER

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
export const getCheckMemberEmailDuplicationIndexedDB = (email: string) => {
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
          (member: any) => member.email === email
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
export const getCheckMemberPhoneDuplicationIndexedDB = (phone: string) => {
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
          (member: any) => member.phone === phone
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
export const getLoginMemberFromIndexedDB = (id: string, pw: string) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);

    dbOpen.onsuccess = () => {
      let db = dbOpen.result;
      const transaction = db.transaction("member", "readonly");
      const objectStore = transaction.objectStore("member");

      const request = objectStore.getAll();

      request.onsuccess = (e: any) => {
        const result = e.target.result;
        const matchedMember = result.find((member: any) => {
          const decryptedPassword = CryptoJS.AES.decrypt(
            member.password,
            SecretKey
          ).toString(CryptoJS.enc.Utf8);
          return member.email === id && decryptedPassword === pw;
        });
        if (matchedMember) {
          resolve({
            isLogin: true,
            nickname: matchedMember.nickname,
            name: matchedMember.name,
            email: matchedMember.email,
            phone: matchedMember.phone,
            location: matchedMember.location,
            myLatitude: matchedMember.myLatitude,
            myLongitude: matchedMember.myLongitude,
            id: matchedMember.id,
          });
        } else {
          resolve(false);
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
  console.log(patchData);
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
// GET MEMBER MINIMUN INFO
export const getMemberInfoFromIndexeDB = (id: number) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);

    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction("member", "readonly");
      const objectStore = transaction.objectStore("member");

      const request = objectStore.getAll();

      request.onsuccess = (e: any) => {
        console.log("성공?", e);
        resolve(e);
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
