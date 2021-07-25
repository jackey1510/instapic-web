import { Box } from '@chakra-ui/react';
import React from 'react';
import { MainLayout } from '../../components/MainLayout';


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
        <MainLayout>
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
        </MainLayout>
    );
}
export default FullPost