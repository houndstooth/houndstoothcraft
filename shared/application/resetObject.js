// Because these objects are read-only at the top level due to being imported as modules,
// as an inconvenience we must reassign each of their immediate keys.
export default  ({ objectToReset, objectToResetTo }) => {
	Object.keys(objectToResetTo).forEach(key => objectToReset[ key ] = objectToResetTo[ key ])
}