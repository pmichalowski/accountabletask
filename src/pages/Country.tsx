import {
  Button,
  FormGroup,
  FormSelect,
  FormControl,
  Form,
} from "react-bootstrap";
import { Footer } from "../components/Footer";
import { PageHeading } from "../components/PageHeading";
import { Field, Form as FormikForm, Formik, FieldProps } from "formik";
import { object, string } from "yup";
import {
  useCountry,
  useSetCountry,
  useSetPersonalDetails,
} from "../state/state";
import { countries } from "../config/countries";
import { useNavigate } from "react-router-dom";
import { routes } from "../config/routes";

const countrySchema = object({
  country: string()
    .required("This is a required field")
    .oneOf(
      countries.map((c) => c.code),
      `The country has to be one of the following: ${countries
        .map((c) => c.name)
        .join(", ")}`
    ),
});

export const Country = () => {
  const country = useCountry();
  const setCountry = useSetCountry();
  const setPersonalDetails = useSetPersonalDetails();
  const navigate = useNavigate();
  return (
    <div>
      <PageHeading>Step 1: Choose your country</PageHeading>
      <Formik
        initialValues={{ country: country || "" }}
        validationSchema={countrySchema}
        onSubmit={(values) => {
          setCountry(values.country);
          navigate(routes.personalDetails);
        }}
      >
        {({ errors }) => (
          <FormikForm>
            <FormGroup>
              <Field name="country">
                {({ field }: FieldProps) => (
                  <>
                    <FormControl
                      as={FormSelect}
                      {...field}
                      isInvalid={!!errors.country}
                      onChange={(e) => {
                        field.onChange(e);
                        setPersonalDetails(null);
                      }}
                    >
                      <option value="" disabled>
                        Select a country
                      </option>
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </FormControl>
                    <Form.Control.Feedback type="invalid">
                      {errors.country}
                    </Form.Control.Feedback>
                  </>
                )}
              </Field>
            </FormGroup>
            <Footer>
              <Button type="submit">Continue</Button>
            </Footer>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};
