const FAIL = require('./constants').FAIL
const KEEP_FIRST = require('./constants').KEEP_FIRST

const flattenerStrategy = (results, config) => {
  const aggregatedResult = {}
  for (let result in results) {
    for (let resultProperty in results[result]) {
      if (aggregatedResult[resultProperty] !== undefined) {
        if (config.onDuplicate === FAIL) {
          throw new Error(`Duplicate key ${resultProperty} in result`)
        } else if (config.onDuplicate === KEEP_FIRST) {
          continue
        }
      }
      aggregatedResult[resultProperty] = results[result][resultProperty]
    }
  }
  return aggregatedResult
}

module.exports = exports.flattenerStrategy = flattenerStrategy
