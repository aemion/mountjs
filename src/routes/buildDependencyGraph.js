const graphlib = require('graphlib')

/**
 * Builds the dependency graph for the given route
 * @param {*} route The route from which to build the graph
 */
const buildDependencyGraph = (route) => {
  const servicesInvolved = route.servicesInvolved
  const graph = new graphlib.Graph()
  for (let i = 0; i < servicesInvolved.length; i++) {
    const serviceName = servicesInvolved[i].name
    if (route[serviceName] === undefined) {
      throw new Error(`Way to call service ${serviceName} undefined`)
    }
    graph.setNode(serviceName, Object.assign({ requestLaunched: false }, route[serviceName]))
  }
  for (let i = 0; i < servicesInvolved.length; i++) {
    for (let j = 0; j < servicesInvolved[i].needs.length; j++) {
      const dependencyName = servicesInvolved[i].needs[j]
      if (graph.node(dependencyName) === undefined) {
        throw new Error(`Dependency ${dependencyName} not declared`)
      }
      graph.setEdge(dependencyName, servicesInvolved[i].name)
    }
  }
  return graph
}

exports.buildDependencyGraph = buildDependencyGraph
