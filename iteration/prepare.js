const prepare = ({ iterationObject, nestedPropertyPath, iterations }) => {
    Object.entries(iterationObject).forEach(([ propertyName, iterationProperty ]) => {
        if (typeof iterationProperty == 'function') {
            iterations.push({ iterationFunction: iterationProperty, nestedPropertyPath, propertyName })
        } else if (iterationProperty) {
            const deeperPath = nestedPropertyPath.slice()
            deeperPath.push(propertyName)
            prepare({ iterationObject: iterationProperty, nestedPropertyPath: deeperPath, iterations })
        }
    })
    return iterations
}

export default prepare