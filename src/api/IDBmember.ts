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
