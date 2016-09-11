var expect = require('chai').expect

var _ = require('highland')
var range = require('./')

describe('range', function () {
  it('should work unbounded', function (done) {
    _([0, 1, 2, 3, 4]).consume(range())
      .collect().toCallback(function (err, result) {
        expect(err).to.not.exist
        expect(result).to.eql([0, 1, 2, 3, 4])
        done()
      })
  })
  it('should work with lower bound', function (done) {
    _([0, 1, 2, 3, 4])
      .consume(range(function start (x) { return x > 1 }))
      .collect().toCallback(function (err, result) {
        expect(err).to.not.exist
        expect(result).to.eql([2, 3, 4])
        done()
      })
  })

  it('should work with upper bound', function (done) {
    _([0, 1, 2, 3, 4])
      .consume(range(undefined, function end (x) { return x < 4 }))
      .collect().toCallback(function (err, result) {
        expect(err).to.not.exist
        expect(result).to.eql([0, 1, 2, 3])
        done()
      })
  })

  it('should work with both bounds', function (done) {
    _([0, 1, 2, 3, 4])
      .consume(range(
        function start (x) { return x > 1 },
        function end (x) { return x < 4 }))
      .collect().toCallback(function (err, result) {
        expect(err).to.not.exist
        expect(result).to.eql([2, 3])
        done()
      })
  })
})
