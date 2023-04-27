import { useSetRecoilState } from "recoil";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "@/hooks/useRegisterUser";
import { userState } from "@/hooks/atom/user";
import { ErrorMessage } from "@hookform/error-message";

const schema = yup.object().shape({
  username: yup.string().required("名前を入力してください").max(20, "20文字以下で入力してください"),
  email: yup
    .string()
    .required("メールアドレスを入力してください")
    .max(60, "60文字以下で入力してください")
    .matches(
      /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
      "メールアドレスの形式が不正です",
    ),
  password: yup
    .string()
    .required("パスワードを入力してください")
    .max(20, "20文字以下で入力してください")
    .min(8, "８文字以上必要です")
    .matches(
      /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d!@#$=%^&*()_+,.?;:'"<>{}[\]\\/\-|`~]*$/,
      "パスワードは半角英数字で入力し、少なくとも一文字以上の小文字、大文字、数字を含んでください",
    ),
});

type RegisterInputs = {
  username: string;
  email: string;
  password: string;
};

const DEFAULT_VALUES = {
  username: "",
  email: "",
  password: "",
};

const register = () => {
  const setUser = useSetRecoilState(userState);
  const { control, handleSubmit } = useForm<RegisterInputs>({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(schema),
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
                    render={({ field, formState: { errors } }) => (
                      <>
                        <Input
                          {...field}
                          type="text"
                          placeholder="くのう ととのう"
                          style={{ height: 50, fontSize: "1.2rem" }}
                        />
                        <ErrorMessage errors={errors} name={field.name} />
                      </>
                    )}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>メールアドレス：</Label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field, formState: { errors } }) => (
                      <>
                        <Input
                          {...field}
                          type="email"
                          placeholder="dontcall@mystery.com"
                          style={{ height: 50, fontSize: "1.2rem" }}
                        />
                        <ErrorMessage errors={errors} name={field.name} />
                      </>
                    )}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>パスワード：</Label>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field, formState: { errors } }) => (
                      <>
                        <Input
                          {...field}
                          type="password"
                          placeholder="password"
                          style={{ height: 50, fontSize: "1.2rem" }}
                        />
                        <ErrorMessage errors={errors} name={field.name} />
                      </>
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
                  onClick={handleSubmit(onSubmit)}
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
