interface Window {
  Magnolia: any;
}
declare let window: Window;

export const API = (uri: string, method: string = "GET", body: object = {}): Promise<Response> => {
  return fetch(`${window.Magnolia}${uri}`);
};
