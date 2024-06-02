export function getLocationPathname(path: string) {
  const pathname = window.location.pathname.includes(path);
  if (path === "/main") {
    return 1;
  } else if (path === "/mylocation") {
    return 2;
  } else if (path === "/write") {
    return 3;
  } else if (path === "/bookmark") {
    return 4;
  } else if (path === "/mypage") {
    return 5;
  } else if (path === "/setting") {
    return 6;
  } else {
    return 0;
  }
}
// 주소에서 '동' 기준으로 문자열 추출
export function extractNeighborhood(address: any | string) {
  const regex = /(\S+동)\s/;
  const match = address.match(regex);

  if (match && match.length > 1) {
    return match[1];
  } else {
    return null;
  }
}
