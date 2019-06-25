const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');
const chai = require('chai');
const chaiEnzyme = require('chai-enzyme');
const chaiJestSnapshot = require('chai-jest-snapshot');

Enzyme.configure({ adapter: new EnzymeAdapter() });
chai.use(chaiJestSnapshot);
chai.use(chaiEnzyme());

// Make sure chai and jasmine ".not" play nice together
const originalNot = Object.getOwnPropertyDescriptor(chai.Assertion.prototype, 'not').get;
Object.defineProperty(chai.Assertion.prototype, 'not', {
  get() {
    Object.assign(this, this.assignedNot);

    return originalNot.apply(this);
  },
  set(newNot) {
    this.assignedNot = newNot;
    return newNot;
  }
});

// Combine both jest and chai matchers on expect
const jestExpect = global.expect;

global.expect = actual => {
  const originalMatchers = jestExpect(actual);
  const chaiMatchers = chai.expect(actual);
  const combinedMatchers = Object.assign(chaiMatchers, originalMatchers);

  return combinedMatchers;
};

Object.keys(jestExpect).forEach(key => (global.expect[key] = jestExpect[key]));
