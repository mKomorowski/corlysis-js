"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const request_1 = __importDefault(require("request"));
const sinon_1 = __importDefault(require("sinon"));
const Corlysis_1 = __importDefault(require("../../lib/Corlysis"));
describe("Corlysis", () => {
    const db = "db";
    const user = "user";
    const password = "password";
    const corlysis = new Corlysis_1.default(db, user, password, "localhost");
    let requestStub;
    beforeEach(() => {
        requestStub = sinon_1.default.stub(request_1.default, "post");
    });
    afterEach(() => {
        requestStub.restore();
    });
    context("writeSimple method", () => {
        it("should call request with correct data", () => {
            const expectedOptions = {
                body: "test value=1.2",
                headers: { "content-type": "application/octet-stream" },
                url: "localhost/write?db=db&u=user&p=password"
            };
            corlysis.writeSimple("test", 1.2);
            assert_1.default(requestStub.withArgs(expectedOptions).calledOnce);
        });
        it("should pass error to callback if callback is passed", done => {
            const error = new Error("error");
            requestStub.yields(error);
            corlysis.writeSimple("test", 1.2, err => {
                assert_1.default.deepEqual(error, err);
                done();
            });
        });
        it("should pass response.statusCode if callback is passed", done => {
            const statusCode = 204;
            requestStub.yields(null, { statusCode });
            corlysis.writeSimple("test", 1.2, (err, code) => {
                assert_1.default.equal(err, null);
                assert_1.default.equal(code, statusCode);
                done();
            });
        });
    });
});
