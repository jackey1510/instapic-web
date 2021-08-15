import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LoadMoreButton } from "../../src/components/LoadMoreButton";

describe('LoadMoreButton', () => {
    it('renders and loadMore on clink', () => {
        const fetchNextPage = jest.fn()
        render(<LoadMoreButton fetchNextPage={fetchNextPage} isFetchingNextPage={false} />)
        expect(screen.getByText('Load More')).toBeDefined()
        waitFor(() => {
            fireEvent.click(screen.getByRole('button'))
            expect(fetchNextPage).toBeCalled();
        })
    })
})
