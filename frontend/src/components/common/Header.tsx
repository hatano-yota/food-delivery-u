import React, { useContext } from "react";
import { Nav, NavItem } from "reactstrap";
import Link from "@/components/common/Link";
import { useRecoilState } from "recoil";
import { userState } from "@/hooks/atom/user";

const Header = (): JSX.Element => {
  const [user, setUser] = useRecoilState(userState)
  return (
    <header>
      <style jsx>
        {`
          a {
            color: white;
          }
        `}
      </style>
      <Nav className="navbar navbar-dark bg-dark">
        <NavItem>
          <Link href="/">
            <a className="navbar-brand">ホーム</a>
          </Link>
        </NavItem>
        <NavItem className="ml-auto">
          {user ? (
            <Link href="/">
              <a
                className="nav-link"
                onClick={() => {
                  setUser(null);
                }}
              >
                ログアウト
              </a>
            </Link>
          ) : (
            <Link href="/login">
              <a className="nav-link">ログイン</a>
            </Link>
          )}
        </NavItem>
        <NavItem>
          {user ? (
            <h5 style={{ color: "white" }}>{user.username}</h5>
          ) : (
            <Link href="/register">
              <a className="nav-link">新規登録</a>
            </Link>
          )}
        </NavItem>
      </Nav>
    </header>
  );
};

export default Header;
