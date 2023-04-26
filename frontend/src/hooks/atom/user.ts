import { atom } from "recoil";
import { User } from "@/types/Types";

const EMPTY_USER = (id: number) => ({
  id: id,
  email: "",
  username: "",
  confirmed: false,
});

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});
