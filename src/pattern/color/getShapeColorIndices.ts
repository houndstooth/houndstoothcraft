import { codeUtilities, to } from '../../utilities'
import { Address, AddressAsParam } from '../grid'
import { patternState } from '../patternState'
import applySwitcheroo from './applySwitcheroo'
import { ColorAssignmentSettings } from './colorAssignmentSettings'
import getBySupertile from './getBySupertile'
import getByWeave from './getByWeave'
import {
	AssignmentMode,
	GetShapeColorIndices,
	GetShapeColorIndicesWithOffset,
	ShapeColorIndex,
	TransformShapeColorIndices,
	TransformShapeColorIndicesParams,
} from './types'

const getShapeColorIndices: GetShapeColorIndices =
	({ address }: AddressAsParam): ShapeColorIndex[] => {
		const shapeColorIndices: ShapeColorIndex[] = getIndices({ address })

		return maybeAdjustShapeColorIndices({ address, shapeColorIndices })
	}

const maybeAdjustShapeColorIndices: TransformShapeColorIndices =
	({ address, shapeColorIndices }: TransformShapeColorIndicesParams): ShapeColorIndex[] => {
		const {
			flipGrain,
			switcheroo,
			transformShapeColorIndices,
		}: ColorAssignmentSettings = patternState.colorSettings.colorAssignmentSettings

		let maybeAdjustedShapeColorIndices: ShapeColorIndex[] = shapeColorIndices
		if (flipGrain) {
			maybeAdjustedShapeColorIndices = to.ShapeColorIndices(codeUtilities.reversed(shapeColorIndices))
		}
		if (switcheroo) {
			maybeAdjustedShapeColorIndices = applySwitcheroo({
				address,
				shapeColorIndices: maybeAdjustedShapeColorIndices,
			})
		}
		if (transformShapeColorIndices) {
			maybeAdjustedShapeColorIndices = transformShapeColorIndices({
				address,
				shapeColorIndices: maybeAdjustedShapeColorIndices,
			})
		}

		return maybeAdjustedShapeColorIndices
	}

const getIndices: GetShapeColorIndices =
	({ address }: AddressAsParam): ShapeColorIndex[] => {
		const {
			offsetAddress,
			assignmentMode,
		}: ColorAssignmentSettings = patternState.colorSettings.colorAssignmentSettings

		// tslint:disable-next-line:max-line-length
		const getter: GetShapeColorIndicesWithOffset = assignmentMode === AssignmentMode.Weave ? getByWeave : getBySupertile

		const addressOffset: Address = offsetAddress ? offsetAddress({ address }) : to.Address([ 0, 0 ])

		return getter({ address, addressOffset })
	}

export default getShapeColorIndices
