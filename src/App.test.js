import React from "react";
import { shallow } from "enzyme";
import App from "./App";

describe("App", function() {
  describe("enzyme test with API", function() {
    it("should render structure", function() {
      const component = shallow(<App />);

      expect(component).to.have.tagName("div");
      expect(component).to.have.className("app");
      expect(component).to.have.length(1);

      const headerNode = component.find(".app-header");
      expect(headerNode).to.have.tagName("div");

      const titleNode = headerNode.find("p");
      expect(titleNode).to.have.text("Useful Links");

      const listNode = headerNode.find("ul");
      expect(listNode.children()).to.have.length(2);

      expect(listNode.childAt(0).find("a")).to.have.text("Jest");
      expect(listNode.childAt(1).find("a")).to.have.text("snapshot-test-app");
    });
  });

  describe("enzyme test using containsMatchingElement()", function() {
    it("should render structure", function() {
      const component = shallow(<App />);

      expect(component).to.containMatchingElement(
        <div className="app">
          <div className="app-header">
            <p>Useful Links</p>
            <ul>
              <li>
                <a href="https://jestjs.io">Jest</a>
              </li>
              <li>
                <a href="https://github.com/danchen/snapshot-test-app">
                  snapshot-test-app
                </a>
              </li>
            </ul>
          </div>
        </div>
      );
    });
  });

  describe("snapshot using toMatchSnapshot", function() {
    it("should render structure", function() {
      const component = shallow(<App />);

      expect(component).toMatchSnapshot();
    });

    it("should render primitive types", function() {
      expect('String').toMatchSnapshot();
      expect({}).toMatchSnapshot();
      expect([]).toMatchSnapshot();
    });
  });

  describe("snapshot using toMatchInlineSnapshot", function() {
    it("should render structure", function() {
      const component = shallow(<App />);

      // expect(component).toMatchInlineSnapshot();
    });
  });
});
