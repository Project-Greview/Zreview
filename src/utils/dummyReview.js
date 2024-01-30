import { useState } from "react";
import { getCookie } from "./cookies";
import dummyHashtag from "../json/dummyHashTag.json";
import dummyTitle from "../json/dummyTitle.json";
import dummyContents from "../json/dummyContent.json";

let nextId = 1;

let UserLat = getCookie("UserLat");
let UserLon = getCookie("UserLon");

const getRandomTitle = () => {
  const titles = dummyTitle.title;
  const randomIndex = Math.floor(Math.random() * titles.length);
  return titles[randomIndex].name;
};
const getRandomContent = () => {
  const contents = dummyContents.content;
  const randomIndex = Math.floor(Math.random() * contents.length);
  return contents[randomIndex].name;
};
const getRandumHashTagType = (type) => {
  const availableHashtags = dummyHashtag[type];
  const selectedHashtag =
    availableHashtags[Math.floor(Math.random() * availableHashtags.length)];

  return selectedHashtag.name;
};
const getRandomCategory = () => {
  return Math.random() < 0.5 ? "good" : "not_good";
};

export function generateRandomData() {
  return {
    // id: getRandomNumber(1, 100),
    id: nextId++,
    title: getRandomTitle(),
    member: generateRandomString(2),
    content: getRandomContent(),
    location_lat: getRandomLatitude(),
    location_lon: getRandomLongitude(),
    created_at: getRandomDate(),
    updated_at: getRandomDate(),
    hashtag: [
      getRandumHashTagType(getRandomCategory()),
      getRandumHashTagType(getRandomCategory()),
      getRandumHashTagType(getRandomCategory()),
    ],
    views: getRandomNumber(1, 100),
    rating: getRandomNumber(1, 5),
  };
}

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateRandomString = (length) => {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const getRandomLatitude = () =>
  getRandomNumber(33.2491, 37.8779) + Math.random();

const getRandomLongitude = () =>
  getRandomNumber(126.9994, 129.9993) + Math.random();

// const getRandomLatitude = () => {
//   if (UserLat) {
//     const randomOffset = Math.random() * 0.1 - 0.05; // -0.05 ~ +0.05 범위의 랜덤 값
//     const adjustedLat = Math.floor(UserLat.toFixed(7)) + randomOffset; // 정수 부분 제거
//     const decimalLat = adjustedLat + Math.random().toFixed(7); // 소수점 숫자만 랜덤
//     const radius = 20000; // 20km
//     const distance = Math.sqrt(
//       Math.pow(radius, 2) - Math.pow(adjustedLat - UserLat, 2)
//     );
//     const randomLat = adjustedLat + distance * Math.random();
//     return Math.max(33.2491, Math.min(37.8779, randomLat)); // 33 ~ 38 범위 내로 제한
//   } else {
//     return getRandomNumber(33.2491, 37.8779) + Math.random();
//   }
// };

// const getRandomLongitude = () => {
//   if (UserLon) {
//     const randomOffset = Math.random() * 0.1 - 0.05; // -0.05 ~ +0.05 범위의 랜덤 값
//     const adjustedLon = Math.floor(UserLon.toFixed(7)) + randomOffset; // 정수 부분 제거
//     const decimalLon = adjustedLon + Math.random().toFixed(7); // 소수점 숫자만 랜덤
//     const radius = 20000; // 20km
//     const distance = Math.sqrt(
//       Math.pow(radius, 2) - Math.pow(adjustedLon - UserLon, 2)
//     );
//     const randomLon = adjustedLon + distance * Math.random();
//     return Math.max(126.9994, Math.min(129.9993, randomLon)); // 125 ~ 130 범위 내로 제한
//   } else {
//     return getRandomNumber(126.9994, 129.9993) + Math.random();
//   }
// };

const getRandomDate = () =>
  new Date(
    getRandomNumber(2000, 2023),
    getRandomNumber(0, 11),
    getRandomNumber(1, 28)
  ).toISOString();

const DataGenerator = () => {
  const [jsonDataArray, setJsonDataArray] = useState([]);

  const saveDataToState = () => {
    const randomData = generateRandomData();
    setJsonDataArray((prevDataArray) => [...prevDataArray, randomData]);
  };

  return (
    <div>
      <button onClick={saveDataToState}>Generate and Save Data</button>
      {jsonDataArray.map((data, index) => (
        <pre key={index}>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ))}
    </div>
  );
};

export default DataGenerator;
