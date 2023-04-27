import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { login } from "@/hooks/useRegisterUser";
import { useSetRecoilState } from "recoil";
import { userState } from "@/hooks/atom/user";

type LoginInputs = {
  email: string;
  password: string;
};

const defaultValues = {
  email: "",
  password: "",
};

const Login = () => {
  const setUser = useSetRecoilState(userState);
  const [data, setData] = useState({ email: "", password: "" });
  const { control, handleSubmit } = useForm<LoginInputs>({
    defaultValues,
  });
  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    handleLogin();
  };
  const handleLogin = () => {
    login(data.email, data.password)
      .then((res: any) => {
        setUser(res.data.user);
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="paper">
            <div className="header">
              <h2>ログイン</h2>
            </div>
          </div>
          <section className="wrapper">
            <Form>
              <fieldset>
                <FormGroup>
                  <Label>メールアドレス：</Label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="email"
                        name="identifier"
                        style={{ height: 50, fontSize: "1.2rem" }}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange(e);
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
                        style={{ height: 50, fontSize: "1.2rem" }}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange(e);
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
                  ログイン
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

export default Login;
