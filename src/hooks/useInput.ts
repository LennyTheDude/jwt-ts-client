import { useState } from 'react';
import useValidation from './useValidation';
import IInputValidations from '../interfaces/IInputValidations';

export const useInput = (name: string, initialValue: string, validations: IInputValidations) => {
    const [value, setValue] = useState<string>(initialValue);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const valid = useValidation(name, value, validations);

    const onChange = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setValue(target.value);
    };

    const onBlur = () => {
        setIsDirty(true);
    };

    return {
        value,
        isDirty,
        onChange,
        onBlur,
        ...valid
    };
};
