import { Box, Button, Input } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/dist/client/router";

import React from "react";
import { useMutation } from "react-query";
import InputField from "../components/InputField";
import { MainLayout } from "../components/MainLayout";
import { axiosQuery } from "../utils/axios";
import { toErrorMap } from "../utils/toErrorMap";
import { useIsAuth } from "../utils/useIsAuth";

// import { useIsAuth } from "../utils/useIsAuth";
// import { useRouter } from "next/router";

interface createPostProps {}

const createPost: React.FC<createPostProps> = ({}) => {
  useIsAuth();
  interface createPostDto {
    text: string;
  }
  interface createPostResponse {
    fileName: string;
    photoUrl: string;
    signedUrl: string;
  }
  const router = useRouter();
  const createPostMutation = (data: createPostDto) => {
    return axiosQuery<createPostResponse>({
      url: "/posts",
      data,
      method: "post",
    });
  };

  const { mutateAsync: createPost } = useMutation(
    "createPost",
    createPostMutation
  );

  return (
    <MainLayout variant="small">
      <Formik
        initialValues={{ text: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await createPost(values).catch((err) => {
            setErrors(toErrorMap(err.message));
          });
          if (res) console.log(res);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="image"
              placeholder="image"
              label="image"
              type="file"
            ></InputField>

            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="type your post here"
                label="body"
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
    </MainLayout>
  );
};

export default createPost;