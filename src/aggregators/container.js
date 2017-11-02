const constants = require('./constants')

module.exports = () => {
  const aggregators = []

  const wrappedAggregator = (aggregator) => {
    return function () {
      if (arguments['1'] === undefined) {
        arguments['1'] = {
          onDuplicate: constants.FAIL
        }
      }
      if (arguments['1'].onDuplicate === undefined) {
        arguments['1'].onDuplicate = constants.FAIL
      }
      if (Object.values(constants).indexOf(arguments['1'].onDuplicate) === -1) {
        // WARNING: set to FAIL by default if the constant is unknown
        arguments['1'].onDuplicate = constants.FAIL
      }
      return aggregator.apply(this, arguments)
    }
  }

  const registerAggregator = (aggregator) => {
    if (getAggregator(aggregator.name) !== undefined) {
      throw new Error(`Trying to register aggregator ${aggregator.name} twice`)
    }
    aggregators.push({
      name: aggregator.name,
      aggregator: wrappedAggregator(aggregator.strategy)
    })
  }

  const registerAggregators = (aggregators) => {
    for (let i = 0; i < aggregators.length; i++) {
      registerAggregator(aggregators[i])
    }
  }

  const getAggregator = (name) => {
    const aggregator = aggregators.find((aggregator) => aggregator.name === name)
    return aggregator === undefined ? undefined : aggregator.aggregator
  }

  return {
    registerAggregator,
    registerAggregators,
    getAggregator
  }
}
