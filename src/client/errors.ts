import { Response } from 'undici';

export class RequestError extends Error {
    response: Response;

    status: number;

    body?: object | null;

    constructor(message: string, response: Response, body?: object | null) {
        super(message);
        this.name = 'RequestError';
        this.response = response;
        this.status = response.status;
        this.body = body;
    }
}
