import { FC } from 'react';

export interface IAuthContainerProps {
    header: string;
    children: any;
}

const AuthContainer: FC<IAuthContainerProps> = (props) => {
    const { header, children } = props;

    return (
        <div className="auth">
            <div className="auth-container">
                <div className="auth-header">
                    <h2>{header}</h2>
                </div>
                <div className="auth-form-container">{children}</div>
            </div>
        </div>
    );
};

export default AuthContainer;
