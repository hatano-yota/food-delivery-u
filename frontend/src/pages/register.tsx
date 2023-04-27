import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { registerUser } from "@/hooks/useRegisterUser";
import { userState } from "@/hooks/atom/user";

type RegisterInputs = {
  username: string;
  email: string;
  password: string;
};

const defaultValues = {
  username: "",
  email: "",
  password: "",
};

const register = () => {
  const setUser = useSetRecoilState(userState);
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const {
    control,
    handleSubmit,
  } = useForm<RegisterInputs>({
    defaultValues,
  });
  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    registerUser(data.username, data.email, data.password)
      .then((res: any) => setUser(res.data.user))
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="paper">
            <div className="header">
              <h2>ユーザー登録</h2>
            </div>
          </div>
          <section className="wrapper">
            <Form>
              <fieldset>
                <FormGroup>
                  <Label>ユーザー名：</Label>
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="くのう ととのう"
                        style={{ height: 50, fontSize: "1.2rem" }}
                        onChange={(e) => {
                          field.onChange(e);
                          setData({ ...data, username: e.target.value });
                        }}
                      />
                    )}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>メールアドレス：</Label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="email"
                        placeholder="dontcall@mystery.com"
                        style={{ height: 50, fontSize: "1.2rem" }}
                        onChange={(e) => {
                          field.onChange(e);
                          setData({ ...data, email: e.target.value });
                        }}
                      />
                    )}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>パスワード：</Label>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="password"
                        placeholder="password"
                        style={{ height: 50, fontSize: "1.2rem" }}
                        onChange={(e) => {
                          field.onChange(e);
                          setData({ ...data, password: e.target.value });
                        }}
                      />
                    )}
                  />
                </FormGroup>
                <span>
                  <a href="">
                    <small>パスワードをお忘れですか？</small>
                  </a>
                </span>
                <Button
                  style={{ float: "right", width: 120 }}
                  color="primary"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  登録
                </Button>
              </fieldset>
            </Form>
          </section>
        </Col>
      </Row>
      <style jsx>
        {`
          .paper {
            text-align: center;
            margin-top: 50px;
          }
          .header {
            width: 100%;
            margin-bottom: 30px;
          }
          .wrapper {
            padding: 10px 30px 20px 10px;
          }
        `}
      </style>
    </Container>
  );
};

export default register;
