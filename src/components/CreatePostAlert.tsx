import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { uploadStatus } from "../types/types";

interface CreatePostAlertProps {
  uploadState: uploadStatus;
  setUploadState: (status: uploadStatus) => void;
}

export const CreatePostAlert: React.FC<CreatePostAlertProps> = ({
  uploadState,
  setUploadState,
}) => {
  if (uploadState === "error") {
    return (
      <Alert status={uploadState} mt={4}>
        <AlertIcon />
        <AlertTitle mr={2}>Upload Failed!</AlertTitle>
        <AlertDescription>Your input is invalid.</AlertDescription>
        <CloseButton
          position="absolute"
          right="8px"
          top="8px"
          onClick={() => setUploadState(undefined)}
        />
      </Alert>
    );
  }
  if (uploadState === "success") {
    return (
      <Alert status={uploadState} variant="subtle" mt={4}>
        <AlertIcon />
        Data uploaded to the server.
      </Alert>
    );
  }

  return null;
};
export default CreatePostAlert;
