import state from './state'

export default ({ nestedPropertyPath }) => {
	let stateObjectWithProperty = state
	nestedPropertyPath.forEach(pathStep => {
		stateObjectWithProperty = stateObjectWithProperty[ pathStep ]
	})
	return stateObjectWithProperty
}