export type USAPersonalDetails = {
  socialSecurityNumber: string;
  state: string;
  zipCode: string;
};

export type UAEPersonalDetails = {
  emiratesId: string;
  visaType: string;
  city: string;
};

export type INDPersonalDetails = {
  aadhaarNumber: string;
  state: string;
  pinCode: string;
};

export type DEUPersonalDetails = {
  taxId: string;
  bundesland: string;
  postalCode: string;
};

export type CANPersonalDetails = {
  socialInsuranceNumber: string;
  province: string;
  postalCode: string;
};

export type PersonalDetails =
  | USAPersonalDetails
  | UAEPersonalDetails
  | INDPersonalDetails
  | DEUPersonalDetails
  | CANPersonalDetails;
