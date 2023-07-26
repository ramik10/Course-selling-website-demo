import { atom } from "recoil";

export const onCloseSignup = atom({
    key: "onCloseSignup",
    default: false,
});
export const onCloseLogin = atom({
    key: "onCloseLogin",
    default: false,
});