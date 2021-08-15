import {
  Box,
  Button
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useMutation } from "react-query";
import CreatePostAlert from "../components/CreatePostAlert";
import FileInput from "../components/FileInput";
import InputField from "../components/InputField";
import InputSwitch from "../components/InputSwitch";
import { MainLayout } from "../components/MainLayout";
import { useIsAuth } from "../hooks/useIsAuth";
import { createPostMutation } from "../query/createPostMutation";
import { toErrorMap } from "../utils/toErrorMap";
import { uploadPhotosToSignedUrl } from "../utils/uploadPhotos";


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
            ></FileInput>

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
      <CreatePostAlert setUploadState={setUploadState} uploadState={uploadState} />
    </MainLayout>
  );
};

export default createPost;
