import { authAxios, authorizeAxios } from "./apiConfig";
import { INSTANCE } from "./apiConfig";

export const METHODS = {
  get: "GET",
  post: "POST",
  put: "PUT",
  patch: "PATCH",
  delete: "DELETE",
};

export const callApi = async ({
  endPoint,
  method,
  params,
  payload,
  instanceType = INSTANCE.auth,
}) => {
  try {
    let API_INSTANCE = null;
    if (instanceType === INSTANCE.auth) {
      API_INSTANCE = authAxios;
    } else if (instanceType === INSTANCE.formInstance) {
      API_INSTANCE = authorizeFileInstance;
    } else {
      API_INSTANCE = authorizeAxios;
    }

    switch (method) {
      case METHODS.get: {
        const config = params ? { params: { ...params } } : {};
        return await API_INSTANCE.get(endPoint, config);
      }

      case METHODS.post: {
        return await API_INSTANCE.post(endPoint, { ...payload });
      }

      case METHODS.put: {
        return await API_INSTANCE.put(endPoint, { ...payload });
      }

      case METHODS.patch: {
        return await API_INSTANCE.patch(endPoint, { ...payload });
      }

      case METHODS.delete: {
        return await API_INSTANCE.delete(endPoint);
      }

      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  } catch (error) {
    console.error(`API call failed: ${error}`);
    throw error;
  }
};

export const login = (payload) => {
  console.log("login payload: ", payload);
  return authAxios.post("/login/", payload);
};

export const logout = (payload) => {
  console.log("logout payload: ", payload);
  return authAxios.post("/logout/", payload);
};

export const signUp = (payload) => {
  console.log("register payload: ", payload);
  return authAxios.post("/bakery/register/", payload);
};

export const sendEmailOtp = (payload) => {
  console.log("forget password payload: ", payload);
  return authAxios.post("/password/forget/", payload);
};

export const verifyOtp = (payload) => {
  console.log("Veriy Otp payload: ", payload);
  return authAxios.post("/password/otp-verify/", payload);
};

export const changePassword = (payload) => {
  console.log("change password payload: ", payload);
  return authAxios.post("/password/reset/", payload);
};
