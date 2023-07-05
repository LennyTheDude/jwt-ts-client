import { FC } from 'react';

export default interface IRoute {
    path: string;
    name: string;
    component: FC<any>;
    exact: boolean;
    props?: unknown;
}
