import { Alert, AlertIcon, Heading, Skeleton, Stack, Flex, Box, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { PostLayout } from '../../components/PostLayout';
import { creatUrqlClient } from '../../utils/createUrqlClient';
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl';
import EditDeletePostButtons from '../../components/EditDeletePostButtons';
import { useMeQuery } from '../../generated/graphql';


const FullPost: React.FC<{}> = ({ }) => {
    const [{ data: me, fetching: fetchingme }] = useMeQuery()

    const [{ data, fetching }] = useGetPostFromUrl();
    if (fetching) {
        return (<PostLayout><Stack>
            <Skeleton height="100px" />
        </Stack></PostLayout>)
    }
    if (!data?.post) {
        return (
            <Alert status="error">
                <AlertIcon />
    Post Not Found
            </Alert>
        )
    }

    return (
        <PostLayout>
            <Box alignItems="stretch"
                p={5}
                shadow="md"
                borderWidth="1px">
                <Flex >
                    <Heading mb={4} fontSize="xl">{data.post.title}</Heading>
                    {!fetchingme && !(me?.me?.id === data.post.creator.id) ? null : <Box ml="auto"> <EditDeletePostButtons id={data.post.id} /></Box>}
                </Flex>
                <Text>{data?.post?.text}</Text>
            </Box>
        </PostLayout>
    );
}
export default withUrqlClient(creatUrqlClient, { ssr: true })(FullPost)