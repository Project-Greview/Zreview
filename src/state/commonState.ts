import { atom } from "recoil";

// interface

export const toastPopupState = atom<boolean>({
  key: "toastState",
  default: false,
});
