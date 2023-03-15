interface ILoginUserToken {
  token: string;
}

interface IPayloadLogin {
  email: string;
  password: string;
}

export { ILoginUserToken, IPayloadLogin };
