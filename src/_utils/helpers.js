import Cookies from "js-cookie";

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
}) => {
  if (action === "remove") {
  } else {
    Cookies.set("token", token);
    Cookies.set("refreshToken", refreshToken);
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
  }
};
