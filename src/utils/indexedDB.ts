import { openDB } from "idb";

export const indexedDBStart = () => {
  const indexedDB = window.indexedDB;
  const dbName = "zreview";
  const request = indexedDB.open(dbName, 1);
  request.onupgradeneeded = (event: any) => {
    const db = event.target.result;
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
    console.log("Object stores created successfully");
  };
  request.onsuccess = (event: any) => {
    console.log("Database opened successfully");
  };
  request.onerror = (event: any) => {
    console.error("Error opening database:", event.target.error);
  };
};
