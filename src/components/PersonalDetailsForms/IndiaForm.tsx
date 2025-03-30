import { Form, FormControl, Button } from "react-bootstrap";
import { Formik, Form as FormikForm, FieldProps, Field } from "formik";
import { FormGroup, FormLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Footer } from "../Footer";
import { INDPersonalDetails } from "../../types/PersonalDetails";
import { StateUpdater } from "./StateUpdater";
import { usePersonalDetails } from "../../state/state";
import { routes } from "../../config/routes";
import { GoBackButton } from "./GoBackButton";

const indiaPersonalDetailsSchema = Yup.object().shape({
  aadhaarNumber: Yup.string()
    .required("Aadhaar Number is required")
    .matches(/^\d{12}$/, "Aadhaar Number must be 12 digits"),
  state: Yup.string().required("State is required"),
  pinCode: Yup.string().required("Pin Code is required"),
});

export const IndiaForm = () => {
  const personalDetails = usePersonalDetails() as INDPersonalDetails;
  const navigate = useNavigate();
  return (
    <Formik<INDPersonalDetails>
      initialValues={
        personalDetails || {
          aadhaarNumber: "",
          state: "",
          pinCode: "",
        }
      }
      validationSchema={indiaPersonalDetailsSchema}
      onSubmit={() => {
        navigate(routes.imageUpload);
      }}
    >
      {({ errors, touched }) => {
        return (
          <FormikForm>
            <StateUpdater />
            <FormGroup>
              <Field name="aadhaarNumber">
                {({ field }: FieldProps) => (
                  <div>
                    <FormLabel>Aadhaar Number</FormLabel>
                    <FormControl
                      type="text"
                      {...field}
                      isInvalid={
                        touched.aadhaarNumber && !!errors.aadhaarNumber
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.aadhaarNumber}
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
              <Field name="pinCode">
                {({ field }: FieldProps) => (
                  <div className="m-t-20">
                    <FormLabel>Pin Code</FormLabel>
                    <FormControl
                      type="text"
                      {...field}
                      isInvalid={touched.pinCode && !!errors.pinCode}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.pinCode}
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
