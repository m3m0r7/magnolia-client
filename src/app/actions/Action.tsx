export const Login = (type: string, result: any = {}) => {
  return {
    type,
    user: result,
  }
};

export const Setting = (type: string) => {
  return {
    type,
  };
}
