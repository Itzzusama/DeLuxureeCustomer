import { post } from "../services/ApiRequest";

const checkPhone = async (phoneInput, phone, setErrorPhone) => {
  const checkValid = phoneInput.current?.isValidNumber(phone);
  const {
    formattedNumber,
  } = phoneInput.current.getNumberAfterPossiblyEliminatingZero();
  const data = {
    phone: formattedNumber,
  };
  try {
    const response = await post("users/check-phone", data);
    if (response.data.success) {
      setErrorPhone({
        emailError: false,
        show: true,
      });
      return false;
    } else {
      setErrorPhone({
        emailError: true,
        show: true,
      });
      return true;
    }
  } catch (error) {
    if (error?.response?.data?.message == "Phone already existed") {
      setErrorPhone({
        emailError: true,
        show: true,
      });
    }

    return true;
  }
};

export default checkPhone;
