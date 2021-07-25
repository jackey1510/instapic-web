import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";

import React from "react";
import InputField from "../components/InputField";
import { MainLayout } from "../components/MainLayout";
// import { useIsAuth } from "../utils/useIsAuth";
// import { useRouter } from "next/router";

interface createPostProps { }

const createPost: React.FC<createPostProps> = ({ }) => {
  // useIsAuth();
  // const router = useRouter();
  // const [, createPost] = useCreatePostMutation();
  return (
    <MainLayout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async () => {
          // const { error } = await createPost({ input: values });
          // if (!error) {
          //   router.push("/");s
          // }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              placeholder="title"
              label="title"
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
