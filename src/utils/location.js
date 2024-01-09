export function getLocationPathname(path) {
  const pathname = window.location.pathname.includes(path);
  if (path === "/main") {
    return 1;
  } else if (path === "/mylocation") {
    return 2;
  } else if (path === "/write") {
    return 3;
  } else if (path === "/save-list") {
    return 4;
  } else if (path === "mypage") {
    return 5;
  } else {
    return 0;
  }
}
