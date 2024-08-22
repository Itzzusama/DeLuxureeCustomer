import { post } from "../services/ApiRequest";
import { regEmail } from "../utils/constants";

const checkEmail = async (email, setError) => {
  if (!regEmail.test(email.trim())) {
    return true;
  }
  try {
    const ApiData = {
      email: email,
    };
    const response = await post("users/check-email", ApiData);
    if (response.data.success) {
      setError({
        emailError: false,
        show: true,
      });
      return false;
    } else {
      setError({
        emailError: true,
        show: true,
      });
      return true;
    }
  } catch (error) {
    console.log("Error", error.response.data.message);

    setError({
      emailError: true,
      show: true,
    });
    return true;
  }
};

export default checkEmail;
