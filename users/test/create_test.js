const assert = require("assert");
const User = require("../src/users");
describe("Creating records", () => {
  beforeEach(() => {});
  it("saves a user", (done) => {
    const user = new User({ name: "Daniel" });
    user.save().then(() => {
      // Has user been saved to db?
      assert(!user.isNew);
      done();
    });
  });
});
