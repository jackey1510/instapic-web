import { Box } from '@chakra-ui/react';
import React from 'react';
import { PostLayout } from '../../components/PostLayout';


const FullPost: React.FC<{}> = ({ }) => {

    // if (fetching) {
    //     return (<PostLayout><Stack>
    //         <Skeleton height="100px" />
    //     </Stack></PostLayout>)
    // }
    // if (!data?.post) {
    //     return (
    //         <Alert status="error">
    //             <AlertIcon />
    // Post Not Found
    //         </Alert>
    //     )
    // }

    return (
        <PostLayout>
            <Box alignItems="stretch"
                p={5}
                shadow="md"
                borderWidth="1px">
                {/* <Flex >
                    <Heading mb={4} fontSize="xl">{data.post.title}</Heading>
                    {!fetchingme && !(me?.me?.id === data.post.creator.id) ? null : <Box ml="auto"> <EditDeletePostButtons id={data.post.id} /></Box>}
                </Flex>
                <Text>{data?.post?.text}</Text> */}
            </Box>
        </PostLayout>
    );
}
export default FullPost