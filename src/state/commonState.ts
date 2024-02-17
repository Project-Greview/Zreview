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

// KEYFRAME ANIMATION STATE
export const shakeAnimationState = atom<boolean>({
  key: "shakeState",
  default: false,
});
