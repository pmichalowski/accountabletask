import { useCallback, useMemo } from "react";
import { PageHeading } from "../components/PageHeading";
import { countries } from "../config/countries";
import {
  useCountry,
  usePersonalDetails,
  useProfilePicture,
  useResetState,
} from "../state/state";
import styled from "styled-components";
import { PersonalDetails } from "../types/PersonalDetails";
import { Footer } from "../components/Footer";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { routes } from "../config/routes";
import { getSummary } from "../utils/getSummary";

export const Summary = () => {
  const country = useCountry();
  const selectedCountry = useMemo(
    () => countries.find((c) => c.code === country),
    [country]
  );
  const personalDetails = usePersonalDetails() as PersonalDetails;
  const profilePicture = useProfilePicture() as string;
  const navigate = useNavigate();
  const resetState = useResetState();

  const summary = useMemo(
    () => getSummary(country!, personalDetails),
    [country, personalDetails]
  );

  const handleSubmit = useCallback(() => {
    alert("Form submitted!");
    resetState();
    navigate(routes.country);
  }, [navigate, resetState]);

  return (
    <div>
      <PageHeading>Summary</PageHeading>
      <SummaryContainer>
        <SummaryItem>
          <SummaryItemLabel>Country</SummaryItemLabel>
          <SummaryItemValue>{selectedCountry?.name}</SummaryItemValue>
        </SummaryItem>

        {summary.map((item, index) => (
          <SummaryItem key={index}>
            <SummaryItemLabel>{item.label}</SummaryItemLabel>
            <SummaryItemValue>{item.value}</SummaryItemValue>
          </SummaryItem>
        ))}

        <SummaryItem>
          <SummaryItemLabel>Profile picture</SummaryItemLabel>
          <ProfilePicture src={profilePicture || ""} alt="Profile picture" />
        </SummaryItem>
      </SummaryContainer>

      <Footer>
        <Button
          variant="outline-primary"
          onClick={() => navigate(routes.imageUpload)}
        >
          Go back
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Submit
        </Button>
      </Footer>
    </div>
  );
};

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-top: 1.5rem;
`;

const SummaryItem = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e9ecef;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SummaryItemLabel = styled.span`
  font-weight: 600;
  color: #495057;
`;

const SummaryItemValue = styled.span`
  color: #212529;
`;

const ProfilePicture = styled.img`
  max-width: 300px;
  max-height: 300px;
`;
