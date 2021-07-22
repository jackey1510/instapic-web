import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { useMutation } from "react-query";
import { axiosQuery } from "../utils/axios";
import { useRouter } from "next/dist/client/router";

interface registerProps { }

interface registerDto {
  username: string
  email: string
  password: string
}

export const Register: React.FC<registerProps> = ({ }) => {
  const router = useRouter();
  // const [, register] = useRegisterMutation();

  const registerQuery = (values: registerDto) => {
    return axiosQuery({ url: 'users/register', data: values, method: 'POST' })
  }
  const { status, mutate: register, data } = useMutation('register', registerQuery)
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        onSubmit={async (values: registerDto) => {
          console.log(values);
          await register(values);
          // if (res.data?.register.errors) {
          //   return setErrors(toErrorMap(res.data.register.errors));
          // }
          console.log(status)
          // console.log(status)
          // if (status === 'error') {
          //   return console.error(error)
          // }

          if (status === 'success') {
            if (data && data?.status > 299) {
              return console.log(data?.data)
            }

            return router.push("/");
          }
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
                type="password"
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
    </Wrapper>
  );
};

export default Register;
