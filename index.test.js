const { describe } = require("yargs");

describe("get users", () =>{
    test("it should get the Users", () => {
        expect(Letter.get()).not.toBe([]);
    });
});