enum _AddressBrand {}
interface AddressElement extends Number {
	// tslint:disable-next-line:no-any
	_AddressBrand: any,
}

type Address = _AddressBrand & AddressElement[]

type Grid<T> = T[][]

interface GridAddressAsParam {
	gridAddress: Address,
}

interface Referenced {
	thisPatternRef: number
}

interface ReferencedGridAddress extends GridAddressAsParam, Referenced {}

export {
	Address,
	AddressElement,
	Grid,
	GridAddressAsParam,
	Referenced,
	ReferencedGridAddress,
}
