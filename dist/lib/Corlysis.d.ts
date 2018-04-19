export declare type Callback = (error: Error | null, statusCode?: number) => void;
declare class Corlysis {
    private readonly db;
    private readonly user;
    private readonly password;
    private readonly serverURL;
    constructor(db: string, user: string, password: string, serverURL?: string);
    writeSimple(name: string, value: number, callback?: Callback): void;
    private makeRequest(body, callback?);
}
export default Corlysis;
