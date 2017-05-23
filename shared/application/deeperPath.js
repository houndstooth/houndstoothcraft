export default ({ nestedPropertyPath, propertyName }) => {
	const deeperPath = nestedPropertyPath.slice()
	deeperPath.push(propertyName)
	return deeperPath
}