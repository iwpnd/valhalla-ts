import qs from 'querystring';
import { fetch } from 'undici';
import { RequestError } from './errors';
import { Params, RequestOptions } from './types';

const resolveParamsPlaceholder = (path: string, params?: Params): string => {
    if (!params) return path;

    return Object.entries(params).reduce(
        (acc, [name, value]) =>
            acc.replace(`:${name}`, encodeURIComponent(value)),
        path
    );
};

const isJSON = (contentType: string): boolean => {
    const pattern =
        /^application\/(vnd\.geo\+json|geo\+json|json|json;charset=utf-8)$/i;
    return pattern.test(contentType);
};

export class RestClient {
    private readonly url: string;

    private readonly options?: RequestOptions;

    constructor(url: string, options?: RequestOptions) {
        this.url = url;
        this.options = options;
    }

    async request<T extends object | null = object>(
        path: string,
        options?: RequestOptions
    ): Promise<T> {
        const requestPath = resolveParamsPlaceholder(path, options?.params);

        const requestQuery = options?.query
            ? `?${qs.stringify(options.query)}`
            : '';

        const requestBody =
            typeof options?.body === 'object'
                ? JSON.stringify(options?.body)
                : undefined;

        const requestHeaders = {
            Accept: 'application/json',
            ...this.options?.headers,
            ...(requestBody && { 'Content-Type': 'application/json' }),
            ...options?.headers,
        };

        const requestURL = `${this.url}${requestPath}${requestQuery}`;
        const response = await fetch(requestURL, {
            ...this.options,
            method: 'GET',
            ...options,
            headers: requestHeaders,
            body: requestBody,
        });

        let content: T | null = null;
        const contentType = response.headers.get('Content-Type');

        if (contentType && isJSON(contentType.toLowerCase())) {
            content = (await response.json()) as T;
        }

        if (response.ok) {
            return content as T;
        }

        throw new RequestError(response.statusText, response, content);
    }

    async get<T extends object | null = object>(
        path: string,
        options?: RequestOptions
    ): Promise<T> {
        return this.request<T>(path, options);
    }

    async post<T extends object | null = object>(
        path: string,
        options?: RequestOptions
    ) {
        return this.request<T>(path, { ...options, method: 'POST' });
    }

    async put<T extends object | null = object>(
        path: string,
        options?: RequestOptions
    ) {
        return this.request<T>(path, { ...options, method: 'PUT' });
    }

    async delete<T extends object | null = object>(
        path: string,
        options?: RequestOptions
    ) {
        return this.request<T>(path, { ...options, method: 'DELETE' });
    }
}
