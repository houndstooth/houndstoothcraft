type PropertyPath = string[]

enum _NullarySideEffectorBrand {}
type NullarySideEffector = _NullarySideEffectorBrand & { (): void }

export {
	PropertyPath,
	NullarySideEffector,
}
