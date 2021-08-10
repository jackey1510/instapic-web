import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Flex, Link } from "@chakra-ui/react";

import InputField from "../components/InputField";

import NextLink from "next/link";
import { useMutation } from "react-query";
import { useRouter } from "next/dist/client/router";
import { toErrorMap } from "../utils/toErrorMap";

import { MainLayout } from "../components/MainLayout";
import PasswordField from "../components/PasswordField";
import { loginDto } from "../dto/request/login.dto";
import { loginMutation } from "../query/loginMutation";
import { useJwtAuth } from "../hooks/useJwtAuth";

interface loginProps { }

export const Login: React.FC<loginProps> = () => {
  const router = useRouter();

  const { mutateAsync: login } = useMutation("register", loginMutation);
  const { setAccessToken } = useJwtAuth();

  return (
    <MainLayout variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values: loginDto, { setErrors }) => {
          const res = await login(values, {}).catch((error) => {
            setErrors(toErrorMap(error.message));
          });

          if (res && res.data) {
            setAccessToken(res.data.accessToken);
            return router.push((router.query?.next as string) || "/");
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
              <PasswordField
                name="password"
                placeholder="password"
                label="password"
              ></PasswordField>
            </Box>
            <Flex>
              <NextLink href="/register">
                <Link mt={4} ml={"auto"}>
                  New to Instapic?
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
