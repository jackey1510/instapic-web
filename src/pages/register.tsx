import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import InputField from "../components/InputField";
import { useMutation } from "react-query";
import { useRouter } from "next/dist/client/router";
import { toErrorMap } from "../utils/toErrorMap";
import { MainLayout } from "../components/MainLayout";
import PasswordField from "../components/PasswordField";
import { createUserDto } from "../dto/request/create-user.dto";
import { registerMutation } from "../query/registerMutation";

interface registerProps {}
export const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();

  const { mutateAsync: register } = useMutation("register", registerMutation);
  return (
    <MainLayout variant="small">
      <Formik
        initialValues={{
          username: "",
          password: "",
          email: "",
          passwordConfirm: "",
        }}
        onSubmit={async (values: createUserDto, { setErrors }) => {
          await register(values, {
            onSuccess: () => {
              return router.push("/login");
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
              <PasswordField
                name="password"
                placeholder="password"
                label="password"
              ></PasswordField>
            </Box>
            <Box mt={4}>
              <PasswordField
                name="passwordConfirm"
                placeholder="re-enter your password"
                label="password confirm"
              ></PasswordField>
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
