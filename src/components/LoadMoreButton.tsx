import React from 'react'
import { Flex, Button } from '@chakra-ui/react';
import { InfiniteQueryObserverResult } from 'react-query';

interface LoadMoreButtonProps {
    fetchNextPage(): Promise<InfiniteQueryObserverResult<void | any, Error>>
    isFetchingNextPage: boolean
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ fetchNextPage, isFetchingNextPage }) => {
    return (<Flex mt={4} justifyContent="center" alignItems="stretch">
        <Button
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
        >
            Load More
            </Button>
    </Flex>);
}
