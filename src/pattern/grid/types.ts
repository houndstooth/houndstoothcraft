enum _AddressBrand {}
interface AddressElement extends Number {
	// tslint:disable-next-line:no-any
	_AddressBrand: any,
}

type Address = _AddressBrand & AddressElement[]

type Grid<T> = T[][]

interface AddressAsParam {
	address: Address,
}

interface Referenced {
	thisPatternRef: number
}

interface ReferencedAddress extends AddressAsParam, Referenced {}

export {
	Address,
	AddressElement,
	Grid,
	AddressAsParam,
	Referenced,
	ReferencedAddress,
}
