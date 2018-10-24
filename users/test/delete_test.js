const assert = require("assert");
const User = require("../src/users");

describe("Deleting a user", () => {
  let daniel;

  beforeEach(done => {
    daniel = new User({ name: "Daniel" });
    daniel.save().then(() => done());
  });

  it("model instance remove", done => {
    daniel
      .remove()
      .then(() => User.findOne({ name: "Daniel" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it("class method remove", () => {
    // User
  });

  it("class method findAndRemove", () => {});

  it("class method findByIdAndRemove", () => {});
});
