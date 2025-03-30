import { Form, FormControl, Button } from "react-bootstrap";
import { Formik, Form as FormikForm, FieldProps, Field } from "formik";
import { FormGroup, FormLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Footer } from "../Footer";
import { UAEPersonalDetails } from "../../types/PersonalDetails";
import { StateUpdater } from "./StateUpdater";
import { usePersonalDetails } from "../../state/state";
import { routes } from "../../config/routes";
import { GoBackButton } from "./GoBackButton";

const uaePersonalDetailsSchema = Yup.object().shape({
  emiratesId: Yup.string()
    .required("Emirates ID is required")
    .matches(
      /^\d{3}-\d{4}-\d{7}-\d{1}$/,
      "Emirates ID must be in format XXX-XXXX-XXXXXXX-X"
    ),
  visaType: Yup.string().required("Visa Type is required"),
  city: Yup.string().required("City is required"),
});

export const UAEForm = () => {
  const personalDetails = usePersonalDetails() as UAEPersonalDetails;
  const navigate = useNavigate();
  return (
    <Formik<UAEPersonalDetails>
      initialValues={
        personalDetails || {
          emiratesId: "",
          visaType: "",
          city: "",
        }
      }
      validationSchema={uaePersonalDetailsSchema}
      onSubmit={() => {
        navigate(routes.imageUpload);
      }}
    >
      {({ errors, touched }) => {
        return (
          <FormikForm>
            <StateUpdater />
            <FormGroup>
              <Field name="emiratesId">
                {({ field }: FieldProps) => (
                  <div>
                    <FormLabel>Emirates ID</FormLabel>
                    <FormControl
                      type="text"
                      {...field}
                      isInvalid={touched.emiratesId && !!errors.emiratesId}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.emiratesId}
                    </Form.Control.Feedback>
                  </div>
                )}
              </Field>
              <Field name="visaType">
                {({ field }: FieldProps) => (
                  <div className="m-t-20">
                    <FormLabel>Visa Type</FormLabel>
                    <FormControl
                      type="text"
                      {...field}
                      isInvalid={touched.visaType && !!errors.visaType}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.visaType}
                    </Form.Control.Feedback>
                  </div>
                )}
              </Field>
              <Field name="city">
                {({ field }: FieldProps) => (
                  <div className="m-t-20">
                    <FormLabel>City</FormLabel>
                    <FormControl
                      type="text"
                      {...field}
                      isInvalid={touched.city && !!errors.city}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.city}
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
