const customStrategy = (results, config) => {
  if (config.method === undefined) {
    throw new Error(`Method parameter must be defined in config for custom aggregator`)
  }
  if (typeof config.method !== 'function') {
    throw new Error(`Method parameter must be a function for custom aggregator`)
  }
  return config.method.call(this, results, config)
}

module.exports = exports.customStrategy = customStrategy
