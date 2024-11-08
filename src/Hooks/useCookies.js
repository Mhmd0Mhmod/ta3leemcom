import Cookies from "js-cookie";

function useCookies() {
  // some code
  return {
    get: (name) => {
      // some code
      return Cookies.get(name);
    },
    set: (name, value) => {
      // some code
      Cookies.set(name, value);
    },
    remove: (name) => {
      // some code
      Cookies.remove(name);
    },
  };
}
export { useCookies };
