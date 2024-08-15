import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import Layout from "../../../components/Layout";
import { colors } from "../../../utils/colors";
import fonts from "../../../assets/fonts";
import { className } from "../../../global-styles";
import ProfileHeader from "../../../components/ProfileHeader";
import CustomButton from "../../../components/CustomButton";
import {
  Help,
  History,
  Lock,
  Next,
  Person,
  Security,
} from "../../../assets/images";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../../components/CustomText";
const PolicySection = ({ title, details }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.title}>{title}</Text>
    {details.map((item, index) => (
      <Text key={index} style={styles.detail}>
        - {item}
      </Text>
    ))}
  </View>
);
const policies = [
  {
    title: "1. Booking and Cancellations",
    details: [
      "Appointments must be booked at least 48 hours in advance.",
      "Cancellations or rescheduling must be made 24 hours prior to the appointment.",
      "A cancellation fee of 50% of the service cost will apply for late cancellations or no-shows.",
    ],
  },
  {
    title: "2. Payment Terms",
    details: [
      "All services must be paid in full at the time of booking.",
      "Subscription services will be billed automatically on a monthly basis via Stripe.",
    ],
  },
  {
    title: "3. Service Limitations",
    details: [
      "Additional hours beyond the maximum service time will incur an extra charge of $50 per hour.",
      "Priority areas will be addressed first; if additional hours are required, a new booking must be made.",
    ],
  },
  {
    title: "4. Client Responsibilities",
    details: [
      "Clients must ensure that dishes are washed and/or dried prior to a Kitchen Refresh to be included in the organization.",
      "Clients must provide access to the premises during the scheduled service time.",
    ],
  },
  {
    title: "5. Quality Assurance",
    details: [
      "If you are not satisfied with the service provided, please contact us within 24 hours, and we will address your concerns promptly.",
    ],
  },
  {
    title: "6. Health and Safety",
    details: [
      "Our team follows strict health and safety protocols to ensure the well-being of our clients and staff.",
      "Please inform us of any specific requirements or concerns.",
    ],
  },
  {
    title: "7. Confidentiality",
    details: [
      "We respect your privacy and will maintain the confidentiality of all personal and property information.",
    ],
  },
];
const Policy = () => {
  const navigation = useNavigation();
  return (
    <Layout title={"Privacy Policy"} isScroll>
      <View style={className("mt-5")}>
        {policies.map((policy, index) => (
          <PolicySection
            key={index}
            title={policy.title}
            details={policy.details}
          />
        ))}
      </View>
    </Layout>
  );
};

export default Policy;
const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  detail: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: fonts.regular,
    color: colors.blk2,
  },
});
