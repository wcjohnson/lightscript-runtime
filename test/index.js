var assert = require("assert")

var hasLength = require("../hasLength")
var hasProps = require("../hasProps")
var isMatch = require("../isMatch")

describe('hasLength', () => {
  it('should work', () => {
    assert(!hasLength(null))
    assert(!hasLength({}, 1))
    assert(!hasLength("a string", 2, 3))
    assert(hasLength([], 0))
    assert(hasLength([1], 1))
    assert(hasLength([1], 1, 1))
    assert(!hasLength([1, 2], 1, 1))
    assert(hasLength([1, 2, 3], 2))
    assert(!hasLength([1, 2, 3], 1, 2))
  })
})

describe('hasProps', () => {
  it('should work', () => {
    assert(!hasProps(null))
    assert(!hasProps("a string"))
    assert(!hasProps(1))
    assert(!hasProps(false))
    assert(hasProps(function() {}, "bind"))
    assert(hasProps({a: "a"}, "a"))
    assert(!hasProps({a: "a"}, "b"))
  })
})

describe('isMatch', () => {
  class Foo {}
  class FooChild extends Foo {}
  class FooSibling {}

  class Bar {
    static [Symbol.matches](x) {
      return x === "bar"
    }
  }

  function OldSchoolCool() {}

  it('should work', () => {
    assert(isMatch(Number, 1))
    assert(!isMatch(Number, "1"))

    assert(isMatch(String, "hi"))
    assert(!isMatch(String, 1))

    assert(isMatch(Boolean, true))
    assert(!isMatch(Boolean, null))
    assert(!isMatch(Boolean, 0))

    assert(isMatch(Foo, new Foo()))
    assert(isMatch(Foo, new FooChild()))
    assert(isMatch(FooChild, new FooChild()))
    assert(!isMatch(FooChild, new Foo()))
    assert(!isMatch(Foo, new FooSibling()))
    assert(!isMatch(Foo, null))
    assert(!isMatch(Foo, {}))
    assert(!isMatch(Foo, Foo))

    assert(isMatch(OldSchoolCool, new OldSchoolCool()))

    assert(isMatch(Bar, "bar"))
  })
})
