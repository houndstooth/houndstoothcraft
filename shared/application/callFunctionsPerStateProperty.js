import accessStateObjectWithProperty from './accessStateObjectWithProperty'

export default ({ functionObjects }) => {
	functionObjects.forEach(functionObject => {
		const { nestedPropertyPath, propertyName, fn } = functionObject
		let stateObjectToCallFunctionOn = accessStateObjectWithProperty({ nestedPropertyPath, propertyName })
		stateObjectToCallFunctionOn[ propertyName ] = fn(stateObjectToCallFunctionOn[ propertyName ])
	})
}