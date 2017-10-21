enum _PropertyPathBrand {}
type PropertyPath = _PropertyPathBrand & string[]

type NullarySideEffector = () => void

export {
	PropertyPath,
	NullarySideEffector,
}
