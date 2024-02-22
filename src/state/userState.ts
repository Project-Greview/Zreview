import { atom } from "recoil";

interface Registermember {
  email: string;
  password: string;
  phone: string;
  name: string;
  nickname: string;
}

export const leftMenuState = atom({
  key: "leftState",
  default: false,
});

export const isLoginState = atom({
  key: "loginState",
  default: false,
});
