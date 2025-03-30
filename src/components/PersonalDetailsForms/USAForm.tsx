import { Form, FormControl, Button } from "react-bootstrap";
import { Formik, Form as FormikForm, FieldProps, Field } from "formik";
import { FormGroup, FormLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Footer } from "../Footer";
import { USAPersonalDetails } from "../../types/PersonalDetails";
import { StateUpdater } from "./StateUpdater";
import { usePersonalDetails } from "../../state/state";
import { routes } from "../../config/routes";
import { GoBackButton } from "./GoBackButton";

const usaPersonalDetailsSchema = Yup.object().shape({
  socialSecurityNumber: Yup.string()
    .required("Social Security Number is required")
    .matches(
      /^\d{3}-\d{2}-\d{4}$/,
      "Social Security Number must be in format XXX-XX-XXXX"
    ),
  state: Yup.string().required("State is required"),
  zipCode: Yup.string()
    .required("ZIP Code is required")
    .matches(
      /^\d{5}(-\d{4})?$/,
      "ZIP Code must be in format XXXXX or XXXXX-XXXX"
    ),
});

export const USAForm = () => {
  const personalDetails = usePersonalDetails() as USAPersonalDetails;
  const navigate = useNavigate();
  return (
    <Formik<USAPersonalDetails>
      initialValues={
        personalDetails || {
          socialSecurityNumber: "",
          state: "",
          zipCode: "",
        }
      }
      validationSchema={usaPersonalDetailsSchema}
      onSubmit={() => {
        navigate(routes.imageUpload);
      }}
    >
      {({ errors, touched }) => {
        return (
          <FormikForm>
            <StateUpdater />
            <FormGroup>
              <Field name="socialSecurityNumber">
                {({ field }: FieldProps) => (
                  <div>
                    <FormLabel>Social Security Number</FormLabel>
                    <FormControl
                      type="text"
                      {...field}
                      isInvalid={
                        touched.socialSecurityNumber &&
                        !!errors.socialSecurityNumber
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.socialSecurityNumber}
                    </Form.Control.Feedback>
                  </div>
                )}
              </Field>
              <Field name="state">
                {({ field }: FieldProps) => (
                  <div className="m-t-20">
                    <FormLabel>State</FormLabel>
                    <FormControl
                      type="text"
                      {...field}
                      isInvalid={touched.state && !!errors.state}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.state}
                    </Form.Control.Feedback>
                  </div>
                )}
              </Field>
              <Field name="zipCode">
                {({ field }: FieldProps) => (
                  <div className="m-t-20">
                    <FormLabel>ZIP Code</FormLabel>
                    <FormControl
                      type="text"
                      {...field}
                      isInvalid={touched.zipCode && !!errors.zipCode}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.zipCode}
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
