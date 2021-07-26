import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import InputField from "../../../components/InputField";
import { MainLayout } from "../../../components/MainLayout";

const EditPost: React.FC<{}> = ({}) => {
  // if (fetching) {
  //     return (<PostLayout><Stack>
  //         <Skeleton height="100px" />
  //     </Stack></PostLayout>)
  // }
  // if (!data?.post || error) {
  //     return (
  //         <Alert status="error">
  //             <AlertIcon />
  //             {error ? error : "Post Not Found"}
  //         </Alert>
  //     )
  // }

  return (
    <MainLayout variant="small">
      <Formik
        initialValues={{ text: "" }}
        onSubmit={async () => {
          // const { error } = await updatePost({ text: values.text, id: data?.post?.id! });
          // if (!error) {
          //     // router.push(`/post/${data?.post?.id}`);
          //     router.back()
          // }
        }}
      >
        {({}) => (
          <Form>
            {/* <InputField
                            name="title"
                            placeholder="title"
                            label="title"
                        ></InputField> */}
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="type your post here"
                label="text"
              ></InputField>
            </Box>
            <Button
              mt={4}
              type="submit"
              // isLoading={}
              colorScheme="teal"
            >
              update post
            </Button>
          </Form>
        )}
      </Formik>
    </MainLayout>
  );
};
export default EditPost;
