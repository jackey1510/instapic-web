import { Box, IconButton, Link } from '@chakra-ui/react';
import React from 'react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import NLink from 'next/link'

interface EditDeletePostButtonsProps {
    id: number;
}

const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({ id }) => {
    return (<Box>
        <NLink href={`/post/edit/${id}`}>
            <IconButton as={Link} aria-label="Edit Post" icon={<EditIcon></EditIcon>}></IconButton>
        </NLink>

        <IconButton color='grey' onClick={() => { }} aria-label="Delete Post" icon={<DeleteIcon></DeleteIcon>}></IconButton>
    </Box>);
}
export default EditDeletePostButtons