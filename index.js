'use strict'

var stream = require('highland')

function range (start, end) {
  var started = typeof start !== 'function'
  var doesEnd = typeof end === 'function'
  return function consume (err, x, push, next) {
    if (err) {
      push(err)
      next()
    } else if (x === stream.nil) {
      push(null, x)
    } else {
      if (!started) {
        if (start(x)) {
          started = true
          push(null, x)
        }
        next()
      } else if (started && doesEnd) {
        if (end(x)) {
          push(null, x)
          next()
        } else {
          push(null, stream.nil)
        }
      } else {
        push(null, x)
        next()
      }
    }
  }
}

module.exports = range
