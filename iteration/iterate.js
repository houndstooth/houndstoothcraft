import state from '../state'

export default ({ iterations }) => {
    iterations.forEach(iteration => {
        const { nestedPropertyPath, propertyName, iterationFunction } = iteration
        let stateObjectToCallAnimationFunctionOn = state
        nestedPropertyPath.forEach(pathStep => {
            stateObjectToCallAnimationFunctionOn = stateObjectToCallAnimationFunctionOn[pathStep]
        })
        stateObjectToCallAnimationFunctionOn[propertyName] = iterationFunction(
            stateObjectToCallAnimationFunctionOn[propertyName]
        )
    })
}