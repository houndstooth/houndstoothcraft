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

type GridAddressFunction = (_: GridAddressParam) => void

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
}

export {
	Address,
	AddressElement,
	Grid,
	GridAddressParam,
	GridAddressFunction,
	ReferencedGridAddress,
	Referenced,
	BuildGridProgressIntervalFunctionParams,
	Unit,
}
