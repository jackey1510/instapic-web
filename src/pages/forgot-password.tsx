import { Box, Flex,  Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';

import React, { useState } from 'react'
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { creatUrqlClient } from '../utils/createUrqlClient';
import { useResetPasswordMutation } from '../generated/graphql';


const ForgotPassword: React.FC<{}> = ({ }) => {
	const [complete, setComplete] = useState(false)
	const [, resetPassword] = useResetPasswordMutation();
	return (<Wrapper variant="small">
      <Formik
        initialValues={{ email: ""}}
        onSubmit={async (values, ) => {
			(await resetPassword(values)) 
			setComplete(true);
        }}
      >
        {({ isSubmitting }) => complete? <Box>Please check your email</Box> :(
          <Form>
            <InputField
              name="email"
              placeholder="email"
				label="email"
				type="email"
            ></InputField>
           
			<Flex>
				<Button
				mt={4}
				type="submit"
				isLoading={isSubmitting}
				colorScheme="teal"
				>
				Forgot Password
				</Button>
			</Flex>
            
          </Form>
        )}
      </Formik>
    </Wrapper>);
 }

 export default withUrqlClient(creatUrqlClient)(ForgotPassword)

