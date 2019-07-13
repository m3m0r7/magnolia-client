interface WindowInterface {
  Magnolia: any;
}
declare let window: WindowInterface;

export const camera = () => {
  return window.Magnolia.uri_camera_path;
};

export const call = (uri: string, method: string = "GET", body: object = {}): Promise<Response> => {
  const options: any = {
    mode: 'cors',
    credentials: 'include',
  };
  if (method === 'POST') {
    options.method = method;
    options.cache = 'no-cache';
    options.headers = {
      'Content-Type': 'application/json; charset=utf-8',
    };
    options.body = JSON.stringify(body);
  }
  return fetch(`${window.Magnolia.uri_api_path}${uri}`, options);
};
