import state from '../state'

export default ({ animations }) => {
    animations.forEach(animation => {
        const { nestedPropertyPath, propertyName, animationFunction } = animation
        let stateObjectToCallAnimationFunctionOn = state
        nestedPropertyPath.forEach(pathStep => {
            stateObjectToCallAnimationFunctionOn = stateObjectToCallAnimationFunctionOn[pathStep]
        })
        stateObjectToCallAnimationFunctionOn[propertyName] = animationFunction(
            stateObjectToCallAnimationFunctionOn[propertyName]
        )
    })
}