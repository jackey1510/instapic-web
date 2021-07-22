import { Box, Flex, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React from 'react'
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';


const ForgotPassword: React.FC<{}> = ({ }) => {
	return (<Wrapper variant="small">
		<Formik
			initialValues={{ email: "" }}
			onSubmit={async () => {
				// (await resetPassword(values))
				// setComplete(true);
			}}
		>
			{({ isSubmitting }) => true ? <Box>Please check your email</Box> : (
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

export default (ForgotPassword)

