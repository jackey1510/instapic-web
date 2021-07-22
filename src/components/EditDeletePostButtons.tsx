import { Box } from '@chakra-ui/react';
import React from 'react';

interface EditDeletePostButtonsProps {
    id: number;
}

const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({ id }) => {
    // return (<Box>
    //     <NLink href={`/post/edit/${id}`}>
    //         <IconButton as={Link} aria-label="Edit Post" icon={<EditIcon></EditIcon>}></IconButton>
    //     </NLink>

    //     <IconButton color='grey' onClick={() => { deletePost({ id }) }} aria-label="Delete Post" icon={<DeleteIcon></DeleteIcon>}></IconButton>
    // </Box>);
    return (<Box>{id}</Box>)
}
export default EditDeletePostButtons