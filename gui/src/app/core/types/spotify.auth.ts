export interface SpotifyCode {
    code: string,
    state?: string
}

export class SpotifyAuth {
    accessToken?: string;
    tokenType?: string;
    expiresIn?: number;
    received?: number;
    authenticated: boolean = false;
    error?: string;

    constructor () {
        this.received = Date.now();
    }
}
