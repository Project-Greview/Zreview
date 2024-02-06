import { atom } from "recoil";

// interface

export const toastPopupState = atom<boolean>({
  key: "toastState",
  default: false,
});

export const paginationState = atom<number>({
  key: "pagination",
  default: 1,
});
