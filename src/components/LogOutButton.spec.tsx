import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LogOutButton } from "../../src/components/LogOutButton";
import * as logoutMutation from "../../src/query/logoutMutation";
import router from "next/dist/client/router";

describe('LogOutButton', () => {
    it('renders and logout on click', () => {
        jest.spyOn(logoutMutation, 'logoutMutation').mockImplementation(async () => { })
        jest.spyOn(router, 'push').mockImplementation(async () => true)
        render(<LogOutButton isLoading={false} logout={logoutMutation.logoutMutation} />)
        expect(screen.getByText('Sign Out')).toBeDefined()
        waitFor(() => {
            fireEvent.click(screen.getByRole('button'))
            expect(logoutMutation.logoutMutation).toBeCalled();
            expect(router.push).toBeCalled();
        })

    })
})