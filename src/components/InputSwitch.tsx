import { FormControl, FormErrorMessage, FormLabel, Switch, SwitchProps, Flex } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type InputSwitchProps = InputHTMLAttributes<HTMLInputElement> & SwitchProps & {
    name: string;
    label: string
}

export const InputSwitch: React.FC<InputSwitchProps> = ({
    label,
    size: _,
    ...props
}) => {
    const [field, { error }] = useField(props);

    return (
        <FormControl isInvalid={!!error}>
            <Flex align="center">
                <FormLabel htmlFor={field.name}>{label}</FormLabel>
                <Switch ml="auto"
                    {...field}
                    {...props}
                    id={field.name}
                />
            </Flex>

            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
}
export default InputSwitch