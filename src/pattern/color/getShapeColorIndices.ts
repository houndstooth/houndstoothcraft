import { getSetting } from '../../app'
import * as to from '../../to'
import { codeUtilities } from '../../utilities'
import { Address, GridAddressParam } from '../grid'
import { main as applySwitcheroo } from './applySwitcheroo'
import { ColorAssignmentSettings } from './colorAssignmentSettings'
import { main as getBySupertile } from './getBySupertile'
import { main as getByWeave } from './getByWeave'
import {
	AssignmentMode,
	GetShapeColorIndices,
	GetShapeColorIndicesWithOffset,
	ShapeColorIndex,
	TransformShapeColorIndices,
	TransformShapeColorIndicesParams,
} from './types'

const getShapeColorIndices: GetShapeColorIndices =
	({ gridAddress }: GridAddressParam): ShapeColorIndex[] => {
		const shapeColorIndices: ShapeColorIndex[] = getIndices({ gridAddress })

		return maybeAdjustShapeColorIndices({ gridAddress, shapeColorIndices })
	}

const maybeAdjustShapeColorIndices: TransformShapeColorIndices =
	({ gridAddress, shapeColorIndices }: TransformShapeColorIndicesParams): ShapeColorIndex[] => {
		const {
			flipGrain,
			switcheroo,
			transformShapeColorIndices,
		}: ColorAssignmentSettings = getSetting.main('colorAssignmentSettings')

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
	({ gridAddress }: GridAddressParam): ShapeColorIndex[] => {
		const {
			offsetAddress,
			assignmentMode,
		}: ColorAssignmentSettings = getSetting.main('colorAssignmentSettings')

		// tslint:disable-next-line:max-line-length
		const getter: GetShapeColorIndicesWithOffset = assignmentMode === AssignmentMode.Weave ? getByWeave : getBySupertile

		const addressOffset: Address = offsetAddress ? offsetAddress({ gridAddress }) : to.Address([ 0, 0 ])

		return getter({ gridAddress, addressOffset })
	}

export { getShapeColorIndices as main }
