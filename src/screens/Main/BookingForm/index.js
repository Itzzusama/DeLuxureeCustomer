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

// Validation Schema

const BookingForm = () => {
  const route = useRoute();
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
    name: Yup.string().required("Name is required"),
    bookDate: Yup.date().required("Booking Date is required"),
    bookTime: Yup.date().required("Booking Time is required"),
    location: Yup.string().required("Location is required"),
    phoneNumber: Yup.string()
      .test("isValidNumber", "Enter a valid phone number", function (value) {
        if (phoneInput.current) {
          return phoneInput.current.isValidNumber(value);
        }
        return true;
      })
      .required("Phone number is required"),
  });
  const onDateChange = (event, selectedDate, setFieldValue) => {
    if (event.type === "dismissed") {
      setDateData({ ...dateData, modal: false });
    } else {
      const dateObj = new Date(selectedDate);
      const date = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const year = dateObj.getFullYear();
      const formattedDate = `${year}-${month}-${date}`;
      setDateData({ date: formattedDate, modal: false });
      setFieldValue("bookDate", selectedDate);
    }
  };

  const onTimeChange = (event, selectedTime, setFieldValue) => {
    if (event.type === "dismissed") {
      setTimeData({ ...timeData, modal: false });
    } else {
      const timeObj = new Date(selectedTime);
      const hours = String(timeObj.getHours()).padStart(2, "0");
      const minutes = String(timeObj.getMinutes()).padStart(2, "0");
      const formattedTime = `${hours}:${minutes}`;
      setTimeData({ time: formattedTime, modal: false });
      setFieldValue("bookTime", selectedTime);
    }
  };

  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    bookDate: "",
    bookTime: "",
    phoneNumber: "",
    location: "",
    latLng: {
      latitude: 0,
      longitude: 0,
    },
  });
  const handlePress = async (values) => {
    const {
      formattedNumber,
    } = phoneInput.current.getNumberAfterPossiblyEliminatingZero();
    const data = {
      note: values.description,
      amount: detail?.price,
      date: values?.bookDate,
      location: {
        address: values?.location,
        lat: values.latLng.latitude,
        lng: values.latLng.longitude,
      },
      name: values.name,
      phone: formattedNumber,
      service: detail?._id,
      time: values?.bookTime,
      category: detail?.cat?.type,
    };
    const apiData = {
      category: detail?.cat?.type,
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
            <CustomInput
              withLabel={"Full Name"}
              marginTop={5}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              error={touched.name && errors.name}
              placeholder={"Name"}
            />
            <Error error={errors.name} visible={touched.name} />
            <PhoneNumberInput
              phoneInput={phoneInput}
              value={values.phoneNumber}
              defaultValue={values.phoneNumber}
              onChangeText={(text) => {
                handleChange("phoneNumber")(text);
              }}
              error={touched.phoneNumber && errors.phoneNumber}
            />
            <Error error={errors.phoneNumber} visible={touched.phoneNumber} />
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
              showDatepicker={() =>
                setDateData({
                  ...dateData,
                  modal: true,
                })
              }
              onChange={(event, selectedDate) =>
                onDateChange(event, selectedDate, setFieldValue)
              }
              minDate={new Date()}
              error={touched.bookDate && errors.bookDate}
            />
            <Error error={errors.bookDate} visible={touched.bookDate} />
            <CustomText
              label={"Booking Time"}
              marginBottom={8}
              fontSize={14}
              fontFamily={fonts.semiBold}
              color={colors.black}
            />
            <DatePicker
              date={timeData.time}
              show={timeData.modal}
              showDatepicker={() =>
                setTimeData({
                  ...timeData,
                  modal: true,
                })
              }
              onChange={(event, selectedTime) =>
                onTimeChange(event, selectedTime, setFieldValue)
              }
              mode="time" // Pass mode prop to DatePicker
              error={touched.bookTime && errors.bookTime}
            />
            <Error error={errors.bookTime} visible={touched.bookTime} />
            <GooglePlaces
              withLabel={"Location"}
              marginTop={5}
              value={values.location}
              setValue={(location) => setFieldValue("location", location)}
              placeholder={"Location"}
              setLatLong={(latLong) => {
                setFieldValue("latLng", latLong);
              }}
              error={touched.location && errors.location}
            />
            <Error error={errors.location} visible={touched.location} />
            <CustomInput
              withLabel={"Note for Worker"}
              marginTop={5}
              placeholder={"Note"}
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
