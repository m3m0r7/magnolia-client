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

export const Page = (type: string, options: any = {}) => {
  return {
    type,
    ...options,
  }
};
