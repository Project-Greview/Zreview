import React, { useState } from "react";
import dummyHashtag from "../json/dummyHashTag.json";
import dummyTitle from "../json/dummyTitle.json";
import dummyContents from "../json/dummyContent.json";

let nextId = 1;

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

const getRandomLatitude = () => getRandomNumber(33, 38) + Math.random();

const getRandomLongitude = () => getRandomNumber(125, 130) + Math.random();

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
