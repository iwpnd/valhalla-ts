export interface ErrorResponse {
    /**
     * for detailed run-down see
     * [here](https://valhalla.github.io/valhalla/api/turn-by-turn/api-reference/#http-status-codes-and-conditions)
     */
    status: string;
    status_message: string;
    error_code?: string;
    error?: string;
}
