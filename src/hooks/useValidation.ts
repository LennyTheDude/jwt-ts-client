import { useEffect, useState } from 'react';

export default (name: string, value: string, validations: any) => {
    const [isEmptyError, setIsEmptyError] = useState<boolean>(true);
    const [isEmailError, setIsEmailError] = useState<boolean>(false);
    const [minLengthError, setMinLengthError] = useState<boolean>(false);
    const [maxLengthError, setMaxLengthError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("can't be empty!");
    const [inputValid, senInputValid] = useState<boolean>(false);

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'isEmpty':
                    setIsEmptyError(value ? false : true);
                    break;
                case 'minLength':
                    setMinLengthError(value.length < validations[validation] ? true : false);
                    break;
                case 'maxLength':
                    setMaxLengthError(value.length > validations[validation] ? true : false);
                    break;
                case 'isEmail':
                    const re = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm; // eslint-disable-line no-case-declarations
                    if (!re.test(value.toLowerCase())) {
                        setIsEmailError(true);
                    } else {
                        setIsEmailError(false);
                    }
                    break;
                default:
                    break;
            }
        }
    }, [value]);

    useEffect(() => {
        if (isEmptyError) {
            setErrorMessage(`${name} can't be empty!`);
            senInputValid(false);
        } else if (isEmailError) {
            setErrorMessage(`${name} is invalid!`);
            senInputValid(false);
        } else if (minLengthError) {
            setErrorMessage(`${name} is too short!`);
            senInputValid(false);
        } else if (maxLengthError) {
            setErrorMessage(`${name} is too long!`);
            senInputValid(false);
        } else {
            setErrorMessage('');
            senInputValid(true);
        }
    }, [isEmptyError, isEmailError, minLengthError, maxLengthError]);

    return {
        errorMessage,
        inputValid
    };
};
