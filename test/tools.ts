import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import * as SinonLib from "sinon";
import {SinonStub} from "sinon";
import * as SinonChai from "sinon-chai";
import {$log} from "ts-log-debug";

Chai.should();
Chai.use(SinonChai);
Chai.use(ChaiAsPromised);

const expect = Chai.expect;
const assert = Chai.assert;
// tslint:disable-next-line: variable-name
const Sinon = SinonLib;

export interface LogStub {
  $log: any;
  stub: any;
  restore: any;
  reset: any;
  info: SinonStub;
  debug: SinonStub;
  error: SinonStub;
  warn: LogStub;
  trace: LogStub;
}

const $logStub: LogStub = {
  $log: $log as any,
  info: Sinon.stub(),
  debug: Sinon.stub(),
  error: Sinon.stub(),
  warn: Sinon.stub(),
  trace: Sinon.stub(),
  // tslint:disable-next-line
  stub: function() {
    this.info = Sinon.stub($log, "info");
    this.debug = Sinon.stub($log, "debug");
    this.error = Sinon.stub($log, "error");
    this.warn = Sinon.stub($log, "warn");
    this.trace = Sinon.stub($log, "trace");
  },
  // tslint:disable-next-line
  restore: function() {
    this.info.restore();
    this.debug.restore();
    this.error.restore();
    this.warn.restore();
    this.trace.restore();
  },
  // tslint:disable-next-line
  reset: function() {
    this.info.reset();
    this.debug.reset();
    this.error.reset();
    this.warn.reset();
    this.trace.reset();
  }
} as any;

$logStub.stub();

const stub = (t: any): SinonStub => t;
const restore = (t: any) => t.restore();

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});

export {expect, assert, Sinon, SinonChai, $logStub, stub, restore};
