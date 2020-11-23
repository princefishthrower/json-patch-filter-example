export class ApiService {

    private readonly endpoint: string;
    private readonly headers: Headers;
    private readonly redirectUri: string | null;

    constructor(endpoint: string, redirectUri: string | null = null) {
        this.redirectUri = redirectUri;
        this.endpoint = `/api/${endpoint}`.replace("//", "/");
        this.headers = new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
        });
    }

    public async get<T>(method: string | null = null): Promise<T> {
        const uri = this.endpoint + (method === null ? '' : '/' + method);
        const response = await fetch(uri);
        return this.ensureValidResponse<T>(response);
    }

    public async patch(data: any, success: () => void, failed: (value: any) => void): Promise<void> {
        const init: RequestInit = {
            method: "PATCH",
            body: JSON.stringify(data),
            redirect: "follow",
            headers: this.headers
        };

        const response = await fetch(this.endpoint, init);
        if (response.ok) {
            success();
        } else {
            try {
                var error = (await response.json()) as any;
                failed(error);
            } catch {
                failed("Unknown error.");
            }
        }
    }

    private async ensureValidResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            throw Error(`Request to ${this.endpoint} failed.`);
        }

        return (await response.json()) as T;
    }
}
