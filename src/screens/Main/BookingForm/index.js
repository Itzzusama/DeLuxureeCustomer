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
    location: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    street: Yup.string().required("Street is required"),
    zip: Yup.string().required("Zip code is required"),
    phoneNumber: Yup.string().test(
      "isValidNumber",
      "Enter a valid phone number",
      function (value) {
        if (phoneInput.current) {
          return phoneInput.current.isValidNumber(value);
        }
        return false;
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
    const timeObj = new Date(selectedTime);
    const formattedTime = moment(timeObj).format("HH:mm:ss");

    setTimeData({
      time: formattedTime,
      modal: false,
    });
    setFieldValue("bookTime", selectedTime);
  };

  const [initialValues, setInitialValues] = useState({
    description: "",
    bookDate: "",
    bookTime: "",
    phoneNumber: "",
    location: "",
    latLng: {
      latitude: 0,
      longitude: 0,
    },
    street: "",
    apartmentnumber: "",
    city: "",
    state: "",
    zip: "",
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
        lat: 0,
        lng: 0,
      },
      name: userData?.name,
      phone: formattedNumber,
      service: detail?._id,
      time: values?.bookTime,
      category: detail?.cat?._id,
      street: values?.street,
      apartmentnumber: values?.apartmentnumber,
      city: values?.city,
      state: values?.state,
      zip: values?.zip,
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
            <CustomInput
              withLabel={"Address"}
              placeholder={"Address"}
              onChangeText={handleChange("location")}
              onBlur={handleBlur("location")}
              value={values.location}
              error={touched.location && errors.location}
            />

            <Error error={errors.location} visible={touched.location} />
            <CustomInput
              withLabel={"Street"}
              placeholder={"Street"}
              onChangeText={handleChange("street")}
              onBlur={handleBlur("street")}
              value={values.street}
              error={touched.street && errors.street}
            />

            <Error error={errors.street} visible={touched.street} />
            <CustomInput
              withLabel={"Apartment Number"}
              placeholder={"Apartment Number"}
              onChangeText={handleChange("apartmentnumber")}
              onBlur={handleBlur("apartmentnumber")}
              value={values.apartmentnumber}
              error={touched.apartmentnumber && errors.apartmentnumber}
            />

            <Error
              error={errors.apartmentnumber}
              visible={touched.apartmentnumber}
            />
            <CustomInput
              withLabel={"City"}
              placeholder={"City"}
              onChangeText={handleChange("city")}
              onBlur={handleBlur("city")}
              value={values.city}
              error={touched.city && errors.city}
            />

            <Error error={errors.city} visible={touched.city} />
            <CustomInput
              withLabel={"State"}
              placeholder={"State"}
              onChangeText={handleChange("state")}
              onBlur={handleBlur("state")}
              value={values.state}
              error={touched.state && errors.state}
            />

            <Error error={errors.state} visible={touched.state} />
            <CustomInput
              withLabel={"Zip Code"}
              placeholder={"Zip Code"}
              onChangeText={handleChange("zip")}
              onBlur={handleBlur("zip")}
              value={values.zip}
              error={touched.zip && errors.zip}
            />

            <Error error={errors.zip} visible={touched.zip} />
            <CustomInput
              withLabel={"Notes"}
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
