import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import HamburgerMenu from "../../src/components/HamburgerMenu";
// import * as query from '../../src/query/getProfileQuery'
import * as useMeQuery from '../../src/hooks/useMeQuery'
// import * as reactQuery from 'react-query'
import { QueryClientProvider, QueryClient, QueryObserverResult } from "react-query";
// import { getProfileDto } from "../../src/dto/request/getProfile.dto";
// import { AxiosResponse } from "axios";
import { UserDto } from "../../src/dto/response/user.dto";
// import { renderHook } from '@testing-library/react-hooks'
// import { useMeQuery } from "../../src/hooks/useMeQuery";


describe('HamburgerMenu', () => {
    let hamburgerMenu: HTMLElement
    beforeEach(() => {
    })
    it('renders', () => {
        render(<QueryClientProvider client={new QueryClient()}>
            <HamburgerMenu />
        </QueryClientProvider>)
        hamburgerMenu = screen.getByTestId('hamburgerMenu');
        expect(hamburgerMenu).toBeDefined();
    })

    it('shows login and register button when not logged in', async () => {
        // const res: AxiosResponse<getProfileDto> = {
        //     data: undefined as unknown as getProfileDto,
        //     status: 200,
        //     config: {},
        //     headers: {},
        //     statusText: 'OK'
        // }

        const res: QueryObserverResult<void | UserDto> = {
            data: undefined, isFetching: false, isError: false, dataUpdatedAt: 1, error: null, errorUpdatedAt: 0, failureCount: 0, isFetched: true, isFetchedAfterMount: true, isIdle: false, isLoading: false, isLoadingError: false, isPlaceholderData: false, isPreviousData: false, isRefetchError: false, isStale: false, isSuccess: true, refetch: async () => { const a: any = 's'; return a }, remove: () => { }, status: 'success'
        }

        // jest.spyOn(query, 'getProfileQuery').mockImplementation(async () => res)
        jest.spyOn(useMeQuery, 'useMeQuery').mockImplementation(() =>
            res
        )

        await waitFor(() => {
            render(<QueryClientProvider client={new QueryClient()}>
                <HamburgerMenu />
            </QueryClientProvider>)

        })

        // expect(query.getProfileQuery).toBeCalled();
        const login = await screen.findByText('Login')
        expect(login).toBeDefined()
        const register = screen.getByText('Register')
        expect(register).toBeDefined()

    })
})
