import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import InputField from "../components/InputField";
import { useMutation } from "react-query";
import { axiosQuery } from "../utils/axios";
import { useRouter } from "next/dist/client/router";
import { toErrorMap } from "../utils/toErrorMap";
import { MainLayout } from "../components/MainLayout";

interface registerProps {}

interface registerDto {
  username: string;
  email: string;
  password: string;
}

export const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const registerMutation = (values: registerDto) => {
    return axiosQuery({ url: "/users/register", data: values, method: "POST" });
  };
  const { mutateAsync: register } = useMutation("register", registerMutation);
  return (
    <MainLayout variant="small">
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        onSubmit={async (values: registerDto, { setErrors }) => {
          await register(values, {
            onSuccess: () => {
              return router.push("/");
            },
          }).catch((error) => {
            setErrors(toErrorMap(error.message));
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="username"
            ></InputField>
            <Box mt={4}>
              <InputField
                name="email"
                placeholder="email"
                label="email"
              ></InputField>
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="password"
                password
              ></InputField>
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </MainLayout>
  );
};

export default Register;
