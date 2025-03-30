import { useState, useRef, ChangeEvent, useCallback } from "react";
import styled from "styled-components";
import { PageHeading } from "../components/PageHeading";
import { Button, Alert } from "react-bootstrap";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { routes } from "../config/routes";
import { useProfilePicture, useSetProfilePicture } from "../state/state";

export const ImageUpload = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profilePicture = useProfilePicture();
  const setProfilePicture = useSetProfilePicture();

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith("image/")) {
      return "Please select an image file.";
    }

    // (1MB = 1048576 bytes)
    if (file.size > 1048576) {
      return "Image size must be less than 1MB.";
    }

    return null;
  };

  const validateImageDimensions = (url: string): Promise<string | null> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        if (img.width > 600 || img.height > 600) {
          resolve("Image dimensions must be 600px x 600px or smaller.");
        } else {
          resolve(null);
        }
      };
      img.onerror = () => {
        resolve("Failed to load image for validation.");
      };
      img.src = url;
    });
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setProfilePicture(null);

    const fileError = validateFile(file);
    if (fileError) {
      setError(fileError);
      return;
    }

    const fileUrl = URL.createObjectURL(file);
    const dimensionError = await validateImageDimensions(fileUrl);
    if (dimensionError) {
      setError(dimensionError);
      URL.revokeObjectURL(fileUrl);
      return;
    }

    try {
      const base64Image = await convertToBase64(file);
      setProfilePicture(base64Image);
    } catch (err) {
      setError("Failed to process the image. Please try again.");
      console.error(err);
    }
  };

  const handleContinue = useCallback(() => {
    if (!profilePicture) {
      setError("Please upload an image before continuing.");
      return;
    }
    navigate(routes.summary);
  }, [navigate, profilePicture]);

  return (
    <div>
      <PageHeading>Step 3: Upload your picture</PageHeading>
      <ImageUploadContainer>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: "none" }}
        />
        <Button variant="outline-success" onClick={handleUploadButtonClick}>
          Upload
        </Button>

        {error && <Alert variant="danger">{error}</Alert>}

        {profilePicture && (
          <PreviewContainer>
            <h4>Preview:</h4>
            <ImagePreview src={profilePicture} alt="Preview" />
          </PreviewContainer>
        )}
      </ImageUploadContainer>
      <Footer>
        <Button
          variant="outline-primary"
          onClick={() => navigate(routes.personalDetails)}
        >
          Go back
        </Button>
        <Button onClick={handleContinue}>Continue</Button>
      </Footer>
    </div>
  );
};

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const PreviewContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImagePreview = styled.img`
  max-width: 300px;
  max-height: 300px;
`;
