// tslint:disable:variable-name

import { Frame } from '../animation'
import { Address, ColorSet, ShapeColorIndex, StripePosition, Supertile, Unit } from '../components'
import { Layer } from '../execute'
import { Dimension } from '../page'
import { Color } from '../render'
import { ColorRange } from '../render/types/ColorRange'
import { Coordinate, Outline, Radian } from '../space'
import { SettingsPath, SettingsStep } from '../store'

const Frame: (frame: number) => Frame = frame => frame as any
const Layer: (layer: number) => Layer = layer => layer as any
const Radian: (radian: number) => Radian = radian => radian as any
const Unit: (unit: number) => Unit = unit => unit as any
const Dimension: (dimension: number) => Dimension = dimension => dimension as any
const StripePosition: (stripePosition: number) => StripePosition = stripePosition => stripePosition as any
const ShapeColorIndex: (shapeColorIndex: number) => ShapeColorIndex = shapeColorIndex => shapeColorIndex as any
const SettingsStep: (settingsStep: string) => SettingsStep = settingsStep => settingsStep as any

const Layers: (layers: Array<number | Layer>) => Layer[] = layers => layers as any
const Dimensions: (dimensions: Array<number | Dimension>) => Dimension[] = dimensions => dimensions as any

// tslint:disable-next-line:member-ordering
const Color: (color: { r?: ColorRange, g?: ColorRange, b?: ColorRange, a }) => Color = color => color as any

const ColorSet: (colorSet: Color[]) => ColorSet = colorSet => colorSet as any

const Outline: (outline: Array<Array<number | Unit> | Coordinate>) => Outline = outline => outline.map(Coordinate)

const Coordinate: (coordinate: Array<number | Unit>) => Coordinate = coordinate =>
	coordinate.map(dimension => dimension as any) as Coordinate

const ShapeColorIndices: (shapeColorIndices: Array<number | ShapeColorIndex>) => ShapeColorIndex[] =
	shapeColorIndices =>
		shapeColorIndices.map(shapeColorIndex => shapeColorIndex as any) as ShapeColorIndex[]

const Address: (address: Array<number | Address>) => Address[] = address =>
	address.map(index => index as any) as Address[]

const StripePositions: (stripePositions: Array<StripePosition | number>) => StripePosition[] = stripePositions =>
	stripePositions.map(stripePosition => stripePosition as any) as StripePosition[]

const Supertile: (supertile: number[][][]) => Supertile = supertile => supertile as any

const SettingsPath: (settingsPath: Array<string | SettingsStep>) => SettingsPath = settingsPath => settingsPath as any

export {
	Address,
	Color,
	ColorSet,
	Coordinate,
	Dimension,
	Dimensions,
	Frame,
	Layer,
	Layers,
	Outline,
	SettingsPath,
	Radian,
	SettingsStep,
	StripePosition,
	StripePositions,
	Supertile,
	ShapeColorIndex,
	ShapeColorIndices,
	Unit,
}
