import assert from "assert";
import request from "request";
import sinon from "sinon";
import Corlysis from "../../lib/Corlysis";

describe("Corlysis", () => {
  const db = "db";
  const user = "user";
  const password = "password";
  const corlysis = new Corlysis(db, user, password, "localhost");
  let requestStub: any;

  beforeEach(() => {
    requestStub = sinon.stub(request, "post");
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

      assert(requestStub.withArgs(expectedOptions).calledOnce);
    });

    it("should pass error to callback if callback is passed", done => {
      const error = new Error("error");
      requestStub.yields(error);

      corlysis.writeSimple("test", 1.2, err => {
        assert.deepEqual(error, err);
        done();
      });
    });

    it("should pass response.statusCode if callback is passed", done => {
      const statusCode = 204;
      requestStub.yields(null, { statusCode });

      corlysis.writeSimple("test", 1.2, (err, code) => {
        assert.equal(err, null);
        assert.equal(code, statusCode);
        done();
      });
    });
  });
});
