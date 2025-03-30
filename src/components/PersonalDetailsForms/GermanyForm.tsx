import { Form, FormControl, Button } from "react-bootstrap";
import { Formik, Form as FormikForm, FieldProps, Field } from "formik";
import { FormGroup, FormLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Footer } from "../Footer";
import { DEUPersonalDetails } from "../../types/PersonalDetails";
import { StateUpdater } from "./StateUpdater";
import { usePersonalDetails } from "../../state/state";
import { routes } from "../../config/routes";
import { GoBackButton } from "./GoBackButton";

const germanyPersonalDetailsSchema = Yup.object().shape({
  taxId: Yup.string()
    .required("Tax ID is required")
    .matches(/^\d{11}$/, "Tax ID must be 11 digits"),
  bundesland: Yup.string().required("Bundesland is required"),
  postalCode: Yup.string().required("Postal Code is required"),
});

export const GermanyForm = () => {
  const personalDetails = usePersonalDetails() as DEUPersonalDetails;
  const navigate = useNavigate();
  return (
    <Formik<DEUPersonalDetails>
      initialValues={
        personalDetails || {
          taxId: "",
          bundesland: "",
          postalCode: "",
        }
      }
      validationSchema={germanyPersonalDetailsSchema}
      onSubmit={() => {
        navigate(routes.imageUpload);
      }}
    >
      {({ errors, touched }) => {
        return (
          <FormikForm>
            <StateUpdater />
            <FormGroup>
              <Field name="taxId">
                {({ field }: FieldProps) => (
                  <div>
                    <FormLabel>Tax ID</FormLabel>
                    <FormControl
                      type="text"
                      {...field}
                      isInvalid={touched.taxId && !!errors.taxId}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.taxId}
                    </Form.Control.Feedback>
                  </div>
                )}
              </Field>
              <Field name="bundesland">
                {({ field }: FieldProps) => (
                  <div className="m-t-20">
                    <FormLabel>Bundesland</FormLabel>
                    <FormControl
                      type="text"
                      {...field}
                      isInvalid={touched.bundesland && !!errors.bundesland}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.bundesland}
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
