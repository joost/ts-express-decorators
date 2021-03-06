import {inject} from "@tsed/testing";
import * as TypeORM from "typeorm";
import {TypeORMService} from "../../../../src/typeorm/services/TypeORMService";
import {Sinon} from "../../../tools";

describe("TypeORMService", () => {
  describe("createConnection()", () => {
    before(
      inject([TypeORMService], (service: TypeORMService) => {
        this.connectStub = Sinon.stub(TypeORM, "createConnection").returns(Promise.resolve("connection"));

        return (this.result = service.createConnection("key", {config: "config"} as any).then(() => {
          return service.createConnection("key", {config: "config"} as any);
        }));
      })
    );

    after(() => {
      this.connectStub.restore();
    });

    it("should call mongoose.connect", () => {
      this.connectStub.should.have.been.calledOnce;
      this.connectStub.should.have.been.calledWithExactly({config: "config"});
    });

    it("should return the instance of mongoose", () => {
      return this.result.should.eventually.eq("connection");
    });
  });
});
