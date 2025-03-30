import { Form, FormControl, Button } from "react-bootstrap";
import { Formik, Form as FormikForm, FieldProps, Field } from "formik";
import { FormGroup, FormLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Footer } from "../Footer";
import { CANPersonalDetails } from "../../types/PersonalDetails";
import { StateUpdater } from "./StateUpdater";
import { usePersonalDetails } from "../../state/state";
import { routes } from "../../config/routes";
import { GoBackButton } from "./GoBackButton";

const canadaPersonalDetailsSchema = Yup.object().shape({
  socialInsuranceNumber: Yup.string()
    .required("Social Insurance Number is required")
    .matches(
      /^\d{3}-\d{3}-\d{3}$/,
      "Social Insurance Number must be in format XXX-XXX-XXX"
    ),
  province: Yup.string().required("Province is required"),
  postalCode: Yup.string().required("Postal Code is required"),
});

export const CanadaForm = () => {
  const personalDetails = usePersonalDetails() as CANPersonalDetails;
  const navigate = useNavigate();
  return (
    <Formik<CANPersonalDetails>
      initialValues={
        personalDetails || {
          socialInsuranceNumber: "",
          province: "",
          postalCode: "",
        }
      }
      validationSchema={canadaPersonalDetailsSchema}
      onSubmit={() => {
        navigate(routes.imageUpload);
      }}
    >
      {({ errors, touched }) => {
        return (
          <FormikForm>
            <StateUpdater />
            <FormGroup>
              <Field name="socialInsuranceNumber">
                {({ field }: FieldProps) => (
                  <div>
                    <FormLabel>Social Insurance Number</FormLabel>
                    <FormControl
                      type="text"
                      {...field}
                      isInvalid={
                        touched.socialInsuranceNumber &&
                        !!errors.socialInsuranceNumber
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.socialInsuranceNumber}
                    </Form.Control.Feedback>
                  </div>
                )}
              </Field>
              <Field name="province">
                {({ field }: FieldProps) => (
                  <div className="m-t-20">
                    <FormLabel>Province</FormLabel>
                    <FormControl
                      type="text"
                      {...field}
                      isInvalid={touched.province && !!errors.province}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.province}
                    </Form.Control.Feedback>
                  </div>
                )}
              </Field>
              <Field name="postalCode">
                {({ field }: FieldProps) => (
                  <div className="m-t-20">
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl
                      type="text"
                      {...field}
                      isInvalid={touched.postalCode && !!errors.postalCode}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.postalCode}
                    </Form.Control.Feedback>
                  </div>
                )}
              </Field>
            </FormGroup>
            <Footer>
              <GoBackButton />
              <Button type="submit">Continue</Button>
            </Footer>
          </FormikForm>
        );
      }}
    </Formik>
  );
};
