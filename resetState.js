import state from './state'

export default ({ objectToResetStateTo }) => {
	Object.keys(objectToResetStateTo).forEach(key => {
		state[ key ] = Object.assign({}, objectToResetStateTo[ key ])
	})
}