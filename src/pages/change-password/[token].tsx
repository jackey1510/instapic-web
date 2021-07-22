import { Box, Link } from "@chakra-ui/layout";
import { Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import NextLink from "next/link";
import React from "react";
import InputField from "../../components/InputField";
import Wrapper from "../../components/Wrapper";

export const ResetPassword: NextPage = () => {
  // const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={() => { }}
      // onSubmit={async (values, { setErrors }) => {
      // const token =
      //   typeof router.query.token === "string" ? router.query.token : "";
      // const res = await changePassword({
      //   newPassword: values.newPassword,
      //   token,
      // });

      // if (res.data?.changePassword.errors) {
      //   const errorMap = toErrorMap(res.data.changePassword.errors);
      //   if ("token" in errorMap) {
      //     setTokenError(errorMap.token);
      //   }
      //   return setErrors(errorMap);
      // }
      // if (res.data?.changePassword.user) {
      //   router.push("/");
      // }
      // }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="new Password"
              label="New Password"
              type="password"
            ></InputField>
            {(
              <Flex>
                <Box mr={2} color="red">
                  {}
                </Box>
                <NextLink href="/forgot-password">
                  <Link>Go forget again</Link>
                </NextLink>
              </Flex>
            )}
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              reset password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default ResetPassword;
