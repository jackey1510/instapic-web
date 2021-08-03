import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/dist/client/router";

import React, { useState } from "react";
import { useMutation } from "react-query";
import InputField from "../components/InputField";
import { MainLayout } from "../components/MainLayout";
import { toErrorMap } from "../utils/toErrorMap";
import { useIsAuth } from "../utils/useIsAuth";
import FileInput from "../components/FileInput";
import { uploadPhotosToSignedUrl } from "../utils/uploadPhotos";
import InputSwitch from "../components/InputSwitch";
import { createPostMutation } from "../query/createPostMutation";

interface createPostProps { }

const createPost: React.FC<createPostProps> = ({ }) => {
  useIsAuth();

  const router = useRouter();

  const { mutateAsync: createPost } = useMutation(
    "createPost",
    createPostMutation
  );
  const [inputFile, setInputFile] = useState<File>();
  const [uploadState, setUploadState] = useState<"error" | "success">();

  return (
    <MainLayout variant="small">
      <Formik
        initialValues={{ text: "", public: true }}
        onSubmit={async (values, { setErrors }) => {
          if (!inputFile) {
            return setUploadState("error");
          }
          //create post and get signed url
          const res = await createPost({
            fileType: inputFile.type.split("/").pop()!,
            ...values,
          }).catch((err) => {
            return setErrors(toErrorMap(err.message));
          });
          //upload to signed url
          if (res) {
            if (await uploadPhotosToSignedUrl(inputFile, res.data.signedUrl)) {
              setUploadState("success");
              return router.push("/");
            }
          }
          return setUploadState("error");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FileInput
              name="image"
              label="image"
              setInputFile={setInputFile}
            >
            </FileInput>

            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="type your post here"
                label="description"
              ></InputField>
            </Box>
            <Box mt={4}>
              <InputSwitch
                name="public"
                label="public your post?"
              ></InputSwitch>
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              create post
            </Button>
          </Form>
        )}
      </Formik>
      {uploadState === "error" ? (
        <Alert status={uploadState} mt={4}>
          <AlertIcon />
          <AlertTitle mr={2}>Upload Failed!</AlertTitle>
          <AlertDescription>Your input is invalid.</AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" onClick={() => setUploadState(undefined)} />
        </Alert>
      ) : uploadState === "success" ? (
        <Alert status={uploadState} variant="subtle" mt={4}>
          <AlertIcon />
          Data uploaded to the server.
        </Alert>
      ) : null}
    </MainLayout>
  );
};

export default createPost;
