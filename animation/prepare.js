const prepare = ({ animationObject, nestedPropertyPath, animations }) => {
    Object.entries(animationObject).forEach(([ propertyName, animationProperty ]) => {
        if (typeof animationProperty == 'function') {
            animations.push({ animationFunction: animationProperty, nestedPropertyPath, propertyName })
        } else if (animationProperty) {
            const deeperPath = nestedPropertyPath.slice()
            deeperPath.push(propertyName)
            prepare({ animationObject: animationProperty, nestedPropertyPath: deeperPath, animations })
        }
    })
    return animations
}

export default prepare