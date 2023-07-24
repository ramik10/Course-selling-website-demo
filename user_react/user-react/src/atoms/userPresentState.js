import { atom } from "recoil";

export const userPresentState = atom({
    key:"userPresentState",
    default: null,
});
export const isLoadingState = atom({
    key:"isLoading",
    default: true,
});