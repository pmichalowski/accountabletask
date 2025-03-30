import { useMemo } from "react";
import { PageHeading } from "../components/PageHeading";
import { CanadaForm } from "../components/PersonalDetailsForms/CanadaForm";
import { GermanyForm } from "../components/PersonalDetailsForms/GermanyForm";
import { IndiaForm } from "../components/PersonalDetailsForms/IndiaForm";
import { UAEForm } from "../components/PersonalDetailsForms/UAEForm";
import { USAForm } from "../components/PersonalDetailsForms/USAForm";
import { useCountry } from "../state/state";
import { countries } from "../config/countries";

export const Details = () => {
  const country = useCountry();
  const selectedCountry = useMemo(() => {
    return countries.find((c) => c.code === country);
  }, [country]);
  return (
    <div>
      <PageHeading>
        Step 2: Enter your personal details for{" "}
        <strong>{selectedCountry?.name}</strong>:
      </PageHeading>
      {country === "USA" && <USAForm />}
      {country === "UAE" && <UAEForm />}
      {country === "IND" && <IndiaForm />}
      {country === "DEU" && <GermanyForm />}
      {country === "CAN" && <CanadaForm />}
    </div>
  );
};
