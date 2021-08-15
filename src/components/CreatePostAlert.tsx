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
  const error = (
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

  const success = (
    <Alert status={uploadState} variant="subtle" mt={4}>
      <AlertIcon />
      Data uploaded to the server.
    </Alert>
  );
  let alert = null;
  if (uploadState === "error") {
    alert = error;
  }
  if (uploadState === "success") {
    alert = success;
  }

  return alert;
};
export default CreatePostAlert;
