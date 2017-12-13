import { codeUtilities, to } from '../../utilities'
import { Address, GridAddressAsParam } from '../grid'
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
	({ gridAddress }: GridAddressAsParam): ShapeColorIndex[] => {
		const shapeColorIndices: ShapeColorIndex[] = getIndices({ gridAddress })

		return maybeAdjustShapeColorIndices({ gridAddress, shapeColorIndices })
	}

const maybeAdjustShapeColorIndices: TransformShapeColorIndices =
	({ gridAddress, shapeColorIndices }: TransformShapeColorIndicesParams): ShapeColorIndex[] => {
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
				gridAddress,
				shapeColorIndices: maybeAdjustedShapeColorIndices,
			})
		}
		if (transformShapeColorIndices) {
			maybeAdjustedShapeColorIndices = transformShapeColorIndices({
				gridAddress,
				shapeColorIndices: maybeAdjustedShapeColorIndices,
			})
		}

		return maybeAdjustedShapeColorIndices
	}

const getIndices: GetShapeColorIndices =
	({ gridAddress }: GridAddressAsParam): ShapeColorIndex[] => {
		const {
			offsetAddress,
			assignmentMode,
		}: ColorAssignmentSettings = patternState.colorSettings.colorAssignmentSettings

		// tslint:disable-next-line:max-line-length
		const getter: GetShapeColorIndicesWithOffset = assignmentMode === AssignmentMode.Weave ? getByWeave : getBySupertile

		const addressOffset: Address = offsetAddress ? offsetAddress({ gridAddress }) : to.Address([ 0, 0 ])

		return getter({ gridAddress, addressOffset })
	}

export default getShapeColorIndices
