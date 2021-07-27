import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Input,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/dist/client/router";

import React, { useRef, useState } from "react";
import { useMutation } from "react-query";
import InputField from "../components/InputField";
import { MainLayout } from "../components/MainLayout";
import { axiosQuery } from "../utils/axios";
import { toErrorMap } from "../utils/toErrorMap";
import { useIsAuth } from "../utils/useIsAuth";
import FileInput from "../components/FileInput";
import { uploadPhotosToSignedUrl } from "../utils/uploadPhotos";

interface createPostProps {}

const createPost: React.FC<createPostProps> = ({}) => {
  useIsAuth();
  interface createPostDto {
    text: string;
    public: boolean;
    fileType: string;
  }
  interface createPostResponse {
    fileName: string;
    photoUrl: string;
    signedUrl: string;
  }

  const createPostMutation = (data: createPostDto) => {
    return axiosQuery<createPostResponse>({
      url: "/posts",
      data,
      method: "post",
    });
  };

  const router = useRouter();

  const { mutateAsync: createPost } = useMutation(
    "createPost",
    createPostMutation
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputFile, setInputFile] = useState<File>();
  const [uploadState, setUploadState] = useState<"error" | "success">();

  return (
    <MainLayout variant="small">
      <Formik
        initialValues={{ text: "", public: true }}
        onSubmit={async (values, { setErrors }) => {
          if (!inputFile) {
            setUploadState("error");
            return;
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
          setUploadState("error");
          return;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FileInput
              name="image"
              placeholder="Choose an image"
              label="image"
              acceptedFileTypes="image/*"
            >
              <Input
                type="file"
                accept={"image/*"}
                ref={inputRef}
                onChange={(event) => {
                  return setInputFile(event.target.files![0]);
                }}
                placeholder={"Choose an image"}
                alignContent="center"
                // style={{ display: "none" }}
              ></Input>
              {/* <Input
                placeholder={"Choose an image" || "Your file ..."}
                onClick={() => inputRef.current!.click()}
                name={"image"}
                id={"image"}
                value={inputFile?.name}
              /> */}
            </FileInput>

            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="type your post here"
                label="description"
              ></InputField>
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
          <AlertDescription>Your file is invalid.</AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" />
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
