import { Box, Button, Stack, Skeleton, Alert, AlertIcon } from "@chakra-ui/react";
import { Formik, Form } from "formik";

import React from "react";
import InputField from "../../../components/InputField";
import { useUpdatePostMutation } from "../../../generated/graphql";
import { withUrqlClient } from "next-urql";
import { creatUrqlClient } from "../../../utils/createUrqlClient";
import { PostLayout } from "../../../components/PostLayout";
import { useGetPostFromUrl } from "../../../utils/useGetPostFromUrl";
import { useRouter } from "next/router";
import { useIsAuth } from "../../../utils/useIsAuth";
const EditPost: React.FC<{}> = ({ }) => {
    useIsAuth();
    const router = useRouter();
    const [{ data, error, fetching }] = useGetPostFromUrl();
    const [, updatePost] = useUpdatePostMutation()

    if (fetching) {
        return (<PostLayout><Stack>
            <Skeleton height="100px" />
        </Stack></PostLayout>)
    }
    if (!data?.post || error) {
        return (
            <Alert status="error">
                <AlertIcon />
                {error ? error : "Post Not Found"}
            </Alert>
        )
    }


    return (
        <PostLayout variant="small">
            <Formik
                initialValues={{ text: data.post.text }}
                onSubmit={async (values) => {
                    const { error } = await updatePost({ text: values.text, id: data?.post?.id! });
                    if (!error) {
                        // router.push(`/post/${data?.post?.id}`);
                        router.back()
                    }
                }}
            >
                {({ isSubmitting }) => (
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
                            isLoading={isSubmitting}
                            colorScheme="teal"
                        >
                            update post
            </Button>
                    </Form>
                )}
            </Formik>
        </PostLayout>
    );
}
export default withUrqlClient(creatUrqlClient)(EditPost)