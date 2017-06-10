# highland-range

[![Build Status](https://travis-ci.org/szdavid92/highland-range.svg?branch=master)](https://travis-ci.org/szdavid92/highland-range)


Filter a range from a [highland](https://github.com/caolan/highland) stream.
This is an optimized filter when you know that your stream is ordered with respect to
the filter predicate, ie. your predicate will hold for all consecutive
items after the first one it holds for.

You can supply a predicate `start` for defining the start of the range,
and an `end` to define the end. Both are optional.

In some other languages these are called `dropUntil` and `takeWhile` respectively,
but I didn't fancy creating two separate libraries.

## Install

```
npm install highland-range
```

## Examples:

```js

var _ = require('highland')
var range = require('highland-range')
_([0, 1, 2, 3, 4])
  .consume(range()) // => 0, 1, 2, 3, 4
_([0, 1, 2, 3, 4])
  .consume(range(function start (x) { return x > 1 }))
  // => 2, 3, 4

_([0, 1, 2, 3, 4]).consume(range(undefined, function end (x) { return x < 4 }))
 // => 0, 1, 2, 3

 _([0, 1, 2, 3, 4])
  .consume(range(
    function start (x) { return x > 1 },
    function end (x) { return x < 4 }))
  // => 2, 3

```

Note that it is your responsibility to make sure that actual data satisfies
total ordering with respect to the predicates.

You can work with arbitrary data types.

## Usage

`range(start, end)`

Accepts a `start` and an `end` function (both optional), and returns a highland
stream.

 - `start` should accept a stream element and return a boolean meaning the predicate holds.
 While `false`, all items are dropped. This is sometimes called `dropUntil`.

 - `end` should accept a stream element and return a boolean meaning the predicate holds. Once `false`,
 this item and all consecutive ones are dropped. This is sometimes called `takeWhile`.

## Contributors

[@szdavid92](https://github.com/szdavid92) - David Szakallas

## License

Copyright (c) 2016 David Szakallas

MIT License
