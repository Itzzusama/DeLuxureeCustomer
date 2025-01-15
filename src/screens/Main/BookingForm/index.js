import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import { View } from "react-native";
import fonts from "../../../assets/fonts";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import { DatePicker } from "../../../components/DatePicker";
import Layout from "../../../components/Layout";
import { className } from "../../../global-styles";
import Error from "../../../components/Error";
import { colors } from "../../../utils/colors";
import PhoneNumberInput from "../../../components/PhoneNumberInput";
import GooglePlaces from "../../../components/GooglePlaces";
import { post } from "../../../services/ApiRequest";
import { ToastMessage } from "../../../utils/ToastMessage";
import moment from "moment";
import { parsePhoneNumber } from "libphonenumber-js";
import { useSelector } from "react-redux";

// Validation Schema

const BookingForm = () => {
  const route = useRoute();
  const userData = useSelector((state) => state?.user?.loginUser);
  const { detail } = route.params;
  const phoneInput = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [dateData, setDateData] = useState({
    modal: false,
    date: "",
  });
  const [timeData, setTimeData] = useState({
    modal: false,
    time: "",
  });

  const validationSchema = Yup.object().shape({
    bookDate: Yup.date().required("Booking Date is required"),
    bookTime: Yup.date().required("Booking Time is required"),
    location: Yup.string().required("Location is required"),
    phoneNumber: Yup.string().test(
      "isValidNumber",
      "Enter a valid phone number",
      function (value) {
        if (userData?.phone?.length <= 2) {
          if (phoneInput.current) {
            return phoneInput.current.isValidNumber(value);
          }
          return false;
        }
        return true;
      }
    ),
  });

  const onDateChange = (selectedDate, setFieldValue) => {
      const dateObj = new Date(selectedDate);
      const formattedDate = moment(dateObj).format("YYYY-MM-DD");
      setDateData({ date: formattedDate, modal: false });
      setFieldValue("bookDate", selectedDate);
  };

  const onTimeChange = (selectedTime, setFieldValue) => {
    // if (event.type === "dismissed") {
    //   setTimeData({ ...timeData, modal: false });
    // } else {
      const timeObj = new Date(selectedTime);
      const formattedTime = moment(timeObj).format("HH:mm:ss");

      setTimeData({
        time: formattedTime,
        modal: false,
      });
      setFieldValue("bookTime", selectedTime);
    // }
  };

  const [initialValues, setInitialValues] = useState({
    description: "",
    bookDate: "",
    bookTime: "",
    phoneNumber: userData?.phone?.length > 2 ? userData?.phone : "",
    location: "",
    latLng: {
      latitude: 0,
      longitude: 0,
    },
  });

  const handlePress = async (values) => {
    const formattedNumber =
      userData?.phone?.length > 2
        ? userData.phone
        : phoneInput.current.getNumberAfterPossiblyEliminatingZero();
    const data = {
      note: values.description,
      amount: detail?.price,
      date: values?.bookDate,
      location: {
        address: values?.location,
        lat: values.latLng.latitude,
        lng: values.latLng.longitude,
      },
      name: userData?.name,
      phone: formattedNumber,
      service: detail?._id,
      time: values?.bookTime,
      category: detail?.cat?._id,
    };

    const apiData = {
      category: detail?.cat?._id,
      day: moment().format("ddd"),
      date: values?.bookDate,
      time: values?.bookTime,
      duration: Number(detail?.duration),
    };

    try {
      setLoading(true);
      const res = await post("order/check-employee", apiData);

      if (res?.data?.success) {
        const dataToSend = {
          ...data,
          userIds: res?.data?.users,
        };
        navigation.navigate("ConfirmBooking", {
          reqData: dataToSend,
          detail: detail,
        });
      } else {
        ToastMessage(res?.data?.message || "Something went wrong.");
      }
    } catch (err) {
      if (err.response?.status === 400) {
        const errorMessage = err.response?.data?.message || "Invalid request.";
        ToastMessage(errorMessage);
      } else {
        ToastMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={"Create Booking"} isScroll>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => handlePress(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <>
            {userData?.phone?.length <= 2 ? (
              <>
                <PhoneNumberInput
                  phoneInput={phoneInput}
                  value={values.phoneNumber}
                  defaultValue={values.phoneNumber}
                  onChangeText={(text) => {
                    handleChange("phoneNumber")(text);
                  }}
                  error={touched.phoneNumber && errors.phoneNumber}
                />
                <Error
                  error={errors.phoneNumber}
                  visible={touched.phoneNumber}
                />
              </>
            ) : null}
            <CustomText
              label={"Booking Date"}
              marginBottom={8}
              fontSize={14}
              fontFamily={fonts.semiBold}
              color={colors.black}
            />
            <DatePicker
              date={dateData.date}
              show={dateData.modal}
              placeHolder={"Booking Date"}
              showDatepicker={() =>
                setDateData({
                  ...dateData,
                  modal: true,
                })
              }
              hideDatepicker={() =>
                setDateData({
                  ...dateData,
                  modal: false,
                })
              }
              onChange={(selectedDate) =>
                onDateChange(selectedDate, setFieldValue)
              }
              minDate={new Date()}
              error={touched.bookDate && errors.bookDate}
            />
            <Error error={errors.bookDate} visible={touched.bookDate} />
            <CustomText
              label={"Booking time"}
              marginBottom={8}
              fontSize={14}
              fontFamily={fonts.semiBold}
              color={colors.black}
            />
            <DatePicker
              date={timeData.time}
              show={timeData.modal}
              placeHolder={"Booking time"}
              showDatepicker={() =>
                setTimeData({
                  ...timeData,
                  modal: true,
                })
              }
              hideDatepicker={() =>
                setTimeData({
                  ...timeData,
                  modal: false,
                })
              }
              onChange={(selectedTime) =>
                onTimeChange(selectedTime, setFieldValue)
              }
              mode="time"
              error={touched.bookTime && errors.bookTime}
            />
            <Error error={errors.bookTime} visible={touched.bookTime} />
            <GooglePlaces
              withLabel={"Location"}
              marginTop={5}
              value={values.location}
              setValue={(location) => {
                setFieldValue("location", location);
              }}
              placeholder={"Location"}
              setLatLong={(latLong) => {
                setFieldValue("latLng", latLong);
              }}
              error={touched.location && errors.location}
            />
            <Error error={errors.location} visible={touched.location} />
            <CustomInput
              withLabel={"Notes"}
              marginTop={5}
              placeholder={"Notes"}
              containerStyle={className("h-30")}
              textAlignVertical={"top"}
              multiline
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
              error={touched.description && errors.description}
            />
            <Error error={errors.description} visible={touched.description} />
            <CustomButton
              title={"Continue"}
              customStyle={className("my-8")}
              onPress={handleSubmit}
              loading={loading}
              disabled={loading}
            />
          </>
        )}
      </Formik>
    </Layout>
  );
};

export default BookingForm;
