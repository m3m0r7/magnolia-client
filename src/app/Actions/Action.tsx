export const Login = (type: string, result: any = {}) => {
  return {
    type: type,
    user: result,
  }
};
