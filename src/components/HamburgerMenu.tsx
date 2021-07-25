import React, { useEffect } from 'react'
import { useDisclosure, Button, Drawer, DrawerOverlay, Text, DrawerContent, DrawerCloseButton, DrawerBody, DrawerFooter, Link, Box, Stack, DrawerHeader, IconButton, } from '@chakra-ui/react'
import { DarkModeSwitch } from './DarkModeSwitch'
import { HamburgerIcon } from '@chakra-ui/icons'
import NextLink from './NextLink'
import { useRouter } from 'next/dist/client/router'
import NLink from 'next/link'
import { axiosQuery } from '../utils/axios'
import { useQuery, useMutation } from 'react-query'
import { getAccessToken, refreshToken } from '../utils/jwt'

interface HamburgerMenuProps {

}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    // const btnRef = React.useRef<string>()
    const router = useRouter();

    let token = getAccessToken();
    const meQuery = async () => {
        console.log('token:', token)

        if (!token) {
            token = await refreshToken();
        }
        console.log('token:', token)
        if (token) {
            return axiosQuery({ url: '/users/profile' }).catch(err => console.log(err))
        }
        return
    }



    const { data, isFetching, isSuccess, status } = useQuery('me', meQuery)
    const logoutMutation = () => {
        return axiosQuery({ url: "/auth/logout" }).catch(err => console.log(err))
    }
    const { isLoading, mutateAsync: logout } = useMutation('logout', logoutMutation, {

    })
    useEffect(() => {
        console.log(status)
        console.log(token);
    }, [status, token])

    let body = null;
    if (isFetching) {
        body = (<Box></Box>)
    }

    if (!data && isSuccess) {
        body = (
            <>

                <DrawerBody mt={4}>
                    <Stack spacing="8px">
                        <NextLink href="login" mr={2}><Text fontSize='2xl'>login</Text></NextLink>
                        <NextLink href="register"><Text fontSize='2xl'>register</Text></NextLink>
                    </Stack>
                </DrawerBody>
            </>

        );
    }
    if (data && isSuccess) {
        body = (
            <>
                <DrawerHeader borderBottomWidth="1px">
                    <Box mr={4}>{data.data.username}</Box>
                </DrawerHeader>
                <DrawerBody>
                    <Stack spacing="24px">
                        <NLink href="/create-post"><Button as={Link} mr={3}>Create Post</Button></NLink>
                        <Button
                            variant="link"
                            onClick={async () => { await logout(); router.reload() }}
                            isLoading={isLoading}>
                            Sign Out
                    </Button>
                    </Stack>
                </DrawerBody>

            </>
        );
    }

    return (
        <>
            <IconButton aria-label="Hamburger" icon={<HamburgerIcon />} colorScheme="teal" onClick={onOpen}>
                Open
            </IconButton>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />

                    {body}

                    <DrawerFooter>
                        <DarkModeSwitch />
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>)
}
export default HamburgerMenu