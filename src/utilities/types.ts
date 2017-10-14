enum _PropertyPathBrand {}
type PropertyPath = _PropertyPathBrand & string[]

enum _NullarySideEffectorBrand {}
type NullarySideEffector = _NullarySideEffectorBrand & { (): void }

export {
	PropertyPath,
	NullarySideEffector,
}
