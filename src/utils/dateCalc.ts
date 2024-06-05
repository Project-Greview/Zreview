export const calcDate = (getDate: Date, nowDate: Date) => {
  const yearCalc = nowDate.getFullYear() - getDate.getFullYear();
  const monthCalc = nowDate.getMonth() - getDate.getMonth();
  const dateCalc: string = (
    (nowDate.getTime() - getDate.getTime()) /
    (1000 * 3000 * 24)
  ).toFixed(0);
  if (yearCalc > 0) {
    return yearCalc + "년 전";
  } else if (monthCalc > 0) {
    return monthCalc + "달 전";
  } else if (dateCalc === "0") {
    return "오늘";
  } else {
    return dateCalc + "일 전";
  }
};

export const formattedDate = (date: Date) => {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
