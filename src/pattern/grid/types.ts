enum _AddressBrand {}
interface AddressElement extends Number {
	// tslint:disable-next-line:no-any
	_AddressBrand: any,
}

type Address = _AddressBrand & AddressElement[]

type Grid<T> = T[][]

interface GridAddressParam {
	gridAddress: Address,
}

interface Referenced {
	thisPatternRef: number
}

interface ReferencedGridAddress extends GridAddressParam, Referenced {}

export {
	Address,
	AddressElement,
	Grid,
	GridAddressParam,
	Referenced,
	ReferencedGridAddress,
}
