import { AddressAsParam } from '../../../pattern'
import { PatternIdAsParam } from '../pattern'

interface ExecuteTileParams extends AddressAsParam, PatternIdAsParam {}

interface UpdateProgressParams {
	currentLayerValue: number,
	endLayerValue: number,
	percentage: number,
}

export {
	ExecuteTileParams,
	UpdateProgressParams,
}
