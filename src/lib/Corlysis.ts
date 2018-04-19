import request from "request";

const SERVER = "https://corlysis.com:8086";

export type Callback = (error: Error | null, statusCode?: number) => void;

class Corlysis {
  constructor(
    private readonly db: string,
    private readonly user: string,
    private readonly password: string,
    private readonly serverURL: string = SERVER
  ) {}

  public writeSimple(name: string, value: number, callback?: Callback): void {
    const body = `${name} value=${value}`;

    this.makeRequest(body, callback);
  }

  private makeRequest(body: string, callback?: Callback): void {
    request.post(
      {
        body,
        headers: {
          "content-type": "application/octet-stream"
        },
        url: `${this.serverURL}/write?db=${this.db}&u=${this.user}&p=${
          this.password
        }`
      },
      (err, response, data) => {
        if (callback) {
          callback(
            err,
            response && "statusCode" in response
              ? response.statusCode
              : undefined
          );
        }
      }
    );
  }
}

export default Corlysis;
