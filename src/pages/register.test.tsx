import { render, screen } from '@testing-library/react';
import RegisterPage from './register';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

test('signup not allowed with invalid email', () => {
    const email = "thisemailisnotanemail";
    const password = "pass1234";

    render(<BrowserRouter>
        <RegisterPage name='Registration Page' />
    </BrowserRouter>);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('submit-btn');

    act(() => {
        userEvent.type(emailInput, email);
        userEvent.type(passwordInput, password);
        userEvent.click(emailInput)
    })

    expect(loginButton).toBeDisabled();
    const emailError = screen.getByRole('email-error');
    expect(emailError).toHaveTextContent('Email is invalid!');
});

test('signup not allowed with short password', () => {
    const email = "mock@email.com";
    const password = "pa";

    render(<BrowserRouter>
        <RegisterPage name='Registration Page' />
    </BrowserRouter>);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('submit-btn');

    act(() => {
        userEvent.type(passwordInput, password);
        userEvent.type(emailInput, email);
    })

    expect(loginButton).toBeDisabled();
    const passwordError = screen.getByRole('pwd-error');
    expect(passwordError).toHaveTextContent('Password is too short!');
});

test('signup not allowed with long password', () => {
    const email = "mock@email.com";
    const password = "password_that_is_too_long_for_our_login_form";

    render(<BrowserRouter>
        <RegisterPage name='Registration Page' />
    </BrowserRouter>);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('submit-btn');

    act(() => {
        userEvent.type(passwordInput, password);
        userEvent.type(emailInput, email);
    })

    expect(loginButton).toBeDisabled();
    const passwordError = screen.getByRole('pwd-error');
    expect(passwordError).toHaveTextContent('Password is too long!');
});

test('signup allowed', () => {
    const email = "mock@email.com";
    const password = "password123";

    render(<BrowserRouter>
        <RegisterPage name='Registration Page' />
    </BrowserRouter>);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('submit-btn');
    
    act(() => {
        userEvent.type(emailInput, email);
        userEvent.type(passwordInput, password);
    })
    
    expect(loginButton).not.toBeDisabled();
});
