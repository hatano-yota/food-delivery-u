import axios from "axios";
import Cookie from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// 新しいユーザーを登録
export const registerUser = (username: string, email: string, password: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/register`, { username, email, password })
      .then((res) => {
        Cookie.set("token", res.data.jwt, { expires: 7 });
        resolve(res);
        window.location.href = "/";
      })
      .catch((err) => {
        reject(err);
        console.log(err);
      });
  });
};

// ログイン処理
export const login = (identifier: boolean, password: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local`, { identifier, password })
      .then((res) => {
        Cookie.set("token", res.data.jwt, { expires: 7 });
        resolve(res);
        window.location.href = "/";
      })
      .catch((err) => {
        reject(err);
        console.log(err);
      });
  });
};
