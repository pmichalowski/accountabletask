import { useFormikContext } from "formik";
import { useEffect } from "react";
import { useSetPersonalDetails } from "../../state/state";
import { PersonalDetails } from "../../types/PersonalDetails";

export const StateUpdater = () => {
  const formik = useFormikContext();
  const setPersonalDetails = useSetPersonalDetails();
  useEffect(() => {
    setPersonalDetails({
      ...(formik.values as PersonalDetails),
    });
  }, [formik.values, setPersonalDetails]);
  return <></>;
};
