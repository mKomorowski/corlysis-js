"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const SERVER = "https://corlysis.com:8086";
class Corlysis {
    constructor(db, user, password, serverURL = SERVER) {
        this.db = db;
        this.user = user;
        this.password = password;
        this.serverURL = serverURL;
    }
    writeSimple(name, value, callback) {
        const body = `${name} value=${value}`;
        this.makeRequest(body, callback);
    }
    makeRequest(body, callback) {
        request_1.default.post({
            body,
            headers: {
                "content-type": "application/octet-stream"
            },
            url: `${this.serverURL}/write?db=${this.db}&u=${this.user}&p=${this.password}`
        }, (err, response, data) => {
            if (callback) {
                callback(err, response && "statusCode" in response
                    ? response.statusCode
                    : undefined);
            }
        });
    }
}
exports.default = Corlysis;
