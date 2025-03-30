import { PersonalDetails } from "../types/PersonalDetails";
import {
  CANPersonalDetails,
  DEUPersonalDetails,
  INDPersonalDetails,
  UAEPersonalDetails,
  USAPersonalDetails,
} from "../types/PersonalDetails";

export const getSummary = (
  country: string,
  personalDetails: PersonalDetails
): { label: string; value: string }[] => {
  switch (country) {
    case "USA":
      return [
        {
          label: "Social Security Number",
          value: (personalDetails as USAPersonalDetails).socialSecurityNumber,
        },
        {
          label: "State",
          value: (personalDetails as USAPersonalDetails).state,
        },
        {
          label: "Zip Code",
          value: (personalDetails as USAPersonalDetails).zipCode,
        },
      ];
    case "UAE":
      return [
        {
          label: "Emirates ID",
          value: (personalDetails as UAEPersonalDetails).emiratesId,
        },
        {
          label: "Visa Type",
          value: (personalDetails as UAEPersonalDetails).visaType,
        },
        {
          label: "City",
          value: (personalDetails as UAEPersonalDetails).city,
        },
      ];
    case "IND":
      return [
        {
          label: "Aadhaar Number",
          value: (personalDetails as INDPersonalDetails).aadhaarNumber,
        },
        {
          label: "State",
          value: (personalDetails as INDPersonalDetails).state,
        },
        {
          label: "Pin Code",
          value: (personalDetails as INDPersonalDetails).pinCode,
        },
      ];
    case "DEU":
      return [
        {
          label: "Tax ID",
          value: (personalDetails as DEUPersonalDetails).taxId,
        },
        {
          label: "Bundesland",
          value: (personalDetails as DEUPersonalDetails).bundesland,
        },
        {
          label: "Postal Code",
          value: (personalDetails as DEUPersonalDetails).postalCode,
        },
      ];
    case "CAN":
      return [
        {
          label: "Social Insurance Number",
          value: (personalDetails as CANPersonalDetails).socialInsuranceNumber,
        },
        {
          label: "Province",
          value: (personalDetails as CANPersonalDetails).province,
        },
        {
          label: "Postal Code",
          value: (personalDetails as CANPersonalDetails).postalCode,
        },
      ];
    default:
      return [];
  }
};
