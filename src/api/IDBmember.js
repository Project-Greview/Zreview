import CryptoJS from "crypto-js";

const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

// POST MEMBER
export const addMemberDataToIndexedDB = (postData) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);
    dbOpen.onsuccess = () => {
      const db = dbOpen.result;
      const transaction = db.transaction("member", "readwrite");
      const memberDB = transaction.objectStore("member");

      const member = memberDB.put({
        email: postData.email,
        password: postData.password,
        phone: postData.phone,
        name: postData.name,
        nickname: postData.nickname,
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
      };
    };
  });
};

// GET LOGIN
export const getLoginMemberFromIndexedDB = (id, pw) => {
  return new Promise((resolve, reject) => {
    const dbOpen = idb.open("zreview", 1);

    dbOpen.onsuccess = () => {
      let db = dbOpen.result;
      const transaction = db.transaction("member", "readonly");
      const objectStore = transaction.objectStore("member");

      const request = objectStore.getAll();

      request.onsuccess = (e) => {
        const result = e.target.result;
        const matchedMember = result.find(
          (member) => member.email === id && member.password === pw
        );
        if (matchedMember) {
          resolve(true);
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
