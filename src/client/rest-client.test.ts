import { MockAgent, setGlobalDispatcher } from 'undici';
import { RequestError } from './errors';
import { RestClient } from './rest-client';

const mockAgent = new MockAgent({ connections: 1 });

setGlobalDispatcher(mockAgent);
mockAgent.disableNetConnect();

describe('http-client', () => {
    const url = 'http://localhost:3000';
    const client = new RestClient(url);

    const mockPool = mockAgent.get(url);

    describe('request', () => {
        it.each([
            'application/json',
            'application/geo+json',
            'application/vnd.geo+json',
        ])('should request with content type: %s', async (contentType) => {
            mockPool
                .intercept({
                    path: '/resource/foobar?foo=bar',
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                })
                .defaultReplyHeaders({ 'content-type': contentType })
                .reply(200, { message: 'hype' });

            await expect(
                client.request('/resource/:resource', {
                    params: { resource: 'foobar' },
                    query: { foo: 'bar' },
                    headers: { Accept: 'application/json' },
                })
            ).resolves.toEqual({
                message: 'hype',
            });
        });

        it('should request without substition path parameters', async () => {
            mockPool
                .intercept({
                    path: '/resource',
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                })
                .defaultReplyHeaders({ 'content-type': 'application/json' })
                .reply(200, { message: 'hype' });

            await expect(
                client.request('/resource', {
                    headers: { Accept: 'application/json' },
                })
            ).resolves.toEqual({
                message: 'hype',
            });
        });
    });

    describe('GET', () => {
        it('should perform GET request', async () => {
            mockPool
                .intercept({
                    path: '/resource/baguette',
                    method: 'GET',
                })
                .defaultReplyHeaders({ 'content-type': 'application/json' })
                .reply(200, {});

            await expect(
                client.get('/resource/:id', {
                    params: { id: 'baguette' },
                })
            ).resolves.toEqual({});
        });

        it('should perform GET request and throw RequestError', async () => {
            mockPool
                .intercept({
                    path: '/resource/baguette',
                    method: 'GET',
                })
                .defaultReplyHeaders({ 'content-type': 'application/json' })
                .reply(404, { message: 'not found' });

            await expect(() =>
                client.get('/resource/:id', {
                    params: { id: 'baguette' },
                })
            ).rejects.toThrow(RequestError);
        });
    });

    describe('POST', () => {
        it('should perform POST request', async () => {
            mockPool
                .intercept({
                    path: '/resource/baguette',
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ message: 'hype' }),
                })
                .defaultReplyHeaders({ 'content-type': 'application/json' })
                .reply(200, {});

            await expect(
                client.post('/resource/:id', {
                    params: { id: 'baguette' },
                    body: { message: 'hype' },
                })
            ).resolves.toEqual({});
        });

        it('should perform POST request and throw RequestError', async () => {
            mockPool
                .intercept({
                    path: '/resource/baguette',
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ message: 'hype' }),
                })
                .defaultReplyHeaders({ 'content-type': 'application/json' })
                .reply(404, { message: 'not found' });

            await expect(() =>
                client.post('/resource/:id', {
                    params: { id: 'baguette' },
                    body: { message: 'hype' },
                })
            ).rejects.toThrow(RequestError);
        });
    });

    describe('PUT', () => {
        it('should perform PUT request', async () => {
            mockPool
                .intercept({
                    path: '/resource/baguette',
                    method: 'PUT',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ message: 'hype' }),
                })
                .defaultReplyHeaders({ 'content-type': 'application/json' })
                .reply(200, {});

            await expect(
                client.put('/resource/:id', {
                    params: { id: 'baguette' },
                    body: { message: 'hype' },
                })
            ).resolves.toEqual({});
        });

        it('should perform PUT request and throw RequestError', async () => {
            mockPool
                .intercept({
                    path: '/resource/baguette',
                    method: 'PUT',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ message: 'hype' }),
                })
                .defaultReplyHeaders({ 'content-type': 'application/json' })
                .reply(404, { message: 'not found' });

            await expect(() =>
                client.put('/resource/:id', {
                    params: { id: 'baguette' },
                    body: { message: 'hype' },
                })
            ).rejects.toThrow(RequestError);
        });
    });

    describe('DELETE', () => {
        it('should perform DELETE request', async () => {
            mockPool
                .intercept({
                    path: '/resource/baguette',
                    method: 'DELETE',
                })
                .defaultReplyHeaders({ 'content-type': 'application/json' })
                .reply(200, {});

            await expect(
                client.delete('/resource/:id', {
                    params: { id: 'baguette' },
                })
            ).resolves.toEqual({});
        });

        it('should perform DELETE request and throw RequestError', async () => {
            mockPool
                .intercept({
                    path: '/resource/baguette',
                    method: 'DELETE',
                })
                .defaultReplyHeaders({ 'content-type': 'application/json' })
                .reply(404, { message: 'not found' });

            await expect(() =>
                client.delete('/resource/:id', {
                    params: { id: 'baguette' },
                })
            ).rejects.toThrow(RequestError);
        });
    });
});
