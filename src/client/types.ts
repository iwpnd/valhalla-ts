import { RequestInit } from 'undici';

export type Headers = Record<string, string>;

export type Params = Record<string, string | number>;

export type Query = Record<
    string,
    | string
    | string[]
    | number
    | number[]
    | boolean
    | boolean[]
    | null
    | undefined
>;

export interface RequestOptions extends Omit<RequestInit, 'body'> {
    headers?: Headers;
    params?: Params;
    query?: Query;
    body?: object;
    timeout?: number;
}
