import { getCookie } from "utils/cookies";

export function loginGET(id: string, pw: string) {
  return new Promise((resolve, reject) => {
    const dummyId = getCookie("dummyId");
    const dummyPw = getCookie("dummyPw");
    if (id === dummyId && pw === dummyPw) {
      return resolve(true);
    } else {
      return reject(false);
    }
  });
}
