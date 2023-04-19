import { atom } from "recoil";
import { EMPTY_USER, User } from "@/lib/User";

export const userState = atom<User | null>({
  key: "userState",
  default: EMPTY_USER,
});
