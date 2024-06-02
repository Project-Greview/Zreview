import { openDB } from "idb";

export const indexedDBStart = () => {
  const indexedDB = window.indexedDB;
  const dbName = "zreview";
  const request = indexedDB.open(dbName, 1);
  request.onupgradeneeded = (e: any) => {
    const db = e.target.result;
    const reviewStore = db.createObjectStore("review", {
      keyPath: "id",
      autoIncrement: true,
    });
    const memberStore = db.createObjectStore("member", {
      keyPath: "id",
      autoIncrement: true,
    });
    const commentStore = db.createObjectStore("comment", {
      keyPath: "id",
      autoIncrement: true,
    });
    const placeStore = db.createObjectStore("place", {
      keyPath: "id",
      autoIncrement: true,
    });
    const hashtagStore = db.createObjectStore("hashtag", {
      keyPath: "id",
      autoIncrement: true,
    });
    console.log("Object stores created successfully");
  };
  request.onsuccess = (e: any) => {
    // console.log("Database opened successfully");
    // console.log(
    //   navigator.storage.estimate().then((response) => console.log(response))
    // );
  };
  request.onerror = (e: any) => {
    console.error("Error opening database:", e.target.error);
  };
};

// import { openDB } from "idb";

// export const indexedDBStart = async () => {
//   const indexedDB = window.indexedDB;
//   const dbName = "zreview";

//   const existingDb = await openDB(dbName, 0);
//   const creationTime = await existingDb.metadata.creationTime;
//   existingDb.close();
//   const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
//   const shouldDelete =
//     creationTime && Date.now() - creationTime > oneWeekInMilliseconds;

//   if (shouldDelete) {
//     console.log("Deleting outdated database...");
//     indexedDB.deleteDatabase(dbName);
//   }

//   const request = indexedDB.open(dbName, 1);

//   request.onupgradeneeded = (e:any) => {
//     const db = e.target.result;
//     const reviewStore = db.createObjectStore("review", {
//       keyPath: "id",
//       autoIncrement: true,
//     });
//     const memberStore = db.createObjectStore("member", {
//       keyPath: "id",
//       autoIncrement: true,
//     });
//     console.log("Object stores created successfully");
//   };

//   request.onsuccess = (e:any) => {
//     console.log("Database opened or created successfully");
//     console.log(
//       navigator.storage.estimate().then((response) => console.log(response))
//     );
//   };

//   request.onerror = (e:any) => {
//     console.error("Error opening database:", e.target.error);
//   };
// };
