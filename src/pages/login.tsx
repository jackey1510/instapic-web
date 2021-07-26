import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Flex, Link } from "@chakra-ui/react";

import InputField from "../components/InputField";

import NextLink from "next/link";
import { axiosQuery } from "../utils/axios";
import { useMutation } from "react-query";
import { useRouter } from "next/dist/client/router";
import { toErrorMap } from "../utils/toErrorMap";
import { setAccessToken } from "../utils/jwt";

import { MainLayout } from "../components/MainLayout";

interface loginProps {}

interface loginDto {
  usernameOrEmail: string;
  password: string;
}

export const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const loginMutation = (values: loginDto) => {
    return axiosQuery<{ accessToken: string }>({
      url: "/auth/login",
      data: values,
      method: "POST",
    });
  };
  const { mutateAsync: login } = useMutation("register", loginMutation);

  return (
    <MainLayout variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values: loginDto, { setErrors }) => {
          const res = await login(values, {}).catch((error) => {
            setErrors(toErrorMap(error.message));
          });

          if (res && res.data) {
            console.log("token", res.data.accessToken);
            setAccessToken(res.data.accessToken);
            return router.push("/");
          }
          return;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or Email"
            ></InputField>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="password"
                password
              ></InputField>
            </Box>
            <Flex>
              <NextLink href="/forgot-password">
                <Link mt={4} ml={"auto"}>
                  Forget Password?
                </Link>
              </NextLink>
            </Flex>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              login
            </Button>
          </Form>
        )}
      </Formik>
    </MainLayout>
  );
};

export default Login;
