import React from 'react'
import { Box, IconButton, Link } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import NLink from 'next/link';
import { useDeletePostMutation } from '../generated/graphql';

interface EditDeletePostButtonsProps {
    id: number;
}

const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({ id }) => {
    const [, deletePost] = useDeletePostMutation();
    return (<Box>
        <NLink href={`/post/edit/${id}`}>
            <IconButton as={Link} aria-label="Edit Post" icon={<EditIcon></EditIcon>}></IconButton>
        </NLink>

        <IconButton color='grey' onClick={() => { deletePost({ id }) }} aria-label="Delete Post" icon={<DeleteIcon></DeleteIcon>}></IconButton>
    </Box>);
}
export default EditDeletePostButtons