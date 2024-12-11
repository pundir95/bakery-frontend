import Cookies from "js-cookie";
import { baseURL } from "@/_Api Handlers/apiConfig";

export const returnAddressInfo = (addressComponents) => {
  if (addressComponents) {
    console.log(addressComponents, "addressComponents");
    const countryObj = addressComponents?.find((component) =>
      component.types.includes("country")
    );

    const stateObj = addressComponents?.find((component) =>
      component.types.includes("administrative_area_level_1")
    );

    const cityObj = addressComponents?.find(
      (component) =>
        component.types.includes("locality") ||
        component.types.includes("sublocality") ||
        component.types.includes("administrative_area_level_2") ||
        component.types.includes("route")
    );
    const city = cityObj?.long_name;

    return {
      country: countryObj?.short_name || null,
      state: stateObj?.short_name || null,
      city: cityObj?.long_name || null,
    };
  }
};

export const manageUserAuthorization = ({
  action,
  token = null,
  refreshToken = null,
  firstName = null,
  lastName = null,
}) => {
  if (action === "remove") {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    Cookies.remove("firstName");
    Cookies.remove("lastName");
  } else {
    Cookies.set("token", token);
    Cookies.set("refreshToken", refreshToken);
    Cookies.set("firstName", firstName)
    Cookies.set("lastName", lastName);
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
  }
};

export const createPreview = (imagePreview) => {
  const newPreview = imagePreview.substring(1)
  return `${baseURL}${newPreview}`;
};
