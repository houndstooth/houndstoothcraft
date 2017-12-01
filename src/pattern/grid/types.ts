import { PageElement } from '../../app'

enum _AddressBrand {}

type Address = _AddressBrand & AddressElement[]

interface AddressElement extends Number {
	// tslint:disable-next-line:no-any
	_AddressBrand: any,
}

type Grid<T> = T[][]

interface GridAddressParam {
	readonly gridAddress: Address,
}

interface Unit extends Number {
	// tslint:disable-next-line:no-any
	_UnitsBrand: any,
}

interface ReferencedGridAddress extends GridAddressParam, Referenced {}

interface Referenced {
	thisPatternRef: number
}

interface BuildGridProgressIntervalFunctionParams {
	progressBar?: PageElement,
	progressMessage?: PageElement,
}

export {
	Address,
	AddressElement,
	Grid,
	GridAddressParam,
	ReferencedGridAddress,
	Referenced,
	BuildGridProgressIntervalFunctionParams,
	Unit,
}
