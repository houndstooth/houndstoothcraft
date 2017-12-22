enum _AddressBrand {}
interface AddressElement extends Number {
	// tslint:disable-next-line:no-any
	_AddressBrand: any,
}

type Address = _AddressBrand & AddressElement[]

interface AddressAsParam {
	address: Address,
}

type Grid<T> = T[][]

export {
	Address,
	AddressAsParam,
	AddressElement,
	Grid,
}
