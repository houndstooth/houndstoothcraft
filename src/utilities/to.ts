// tslint:disable:variable-name

import { Frame } from '../animation'
import { Address, StripePosition, Supertile, TileColorIndex, Unit } from '../components'
import { Layer } from '../execute'
import { Dimension } from '../page'
import { Coordinate, Outline, Radian } from '../space'
import { SettingsPath, SettingsStep } from '../store'

const Frame: (frame: number) => Frame = frame => frame as any
const Layer: (layer: number) => Layer = layer => layer as any
const Radian: (radian: number) => Radian = radian => radian as any
const Unit: (unit: number) => Unit = unit => unit as any
const Dimension: (dimension: number) => Dimension = dimension => dimension as any
const StripePosition: (stripePosition: number) => StripePosition = stripePosition => stripePosition as any
const TileColorIndex: (tileColorIndex: number) => TileColorIndex = tileColorIndex => tileColorIndex as any
const SettingsStep: (settingsStep: string) => SettingsStep = settingsStep => settingsStep as any

const Layers: (layers: Array<number | Layer>) => Layer[] = layers => layers as any
const Dimensions: (dimensions: Array<number | Dimension>) => Dimension[] = dimensions => dimensions as any

const Outline: (outline: Array<Array<number | Unit> | Coordinate>) => Outline = outline => outline.map(Coordinate)

const Coordinate: (coordinate: Array<number | Unit>) => Coordinate = coordinate =>
	coordinate.map(dimension => dimension as any) as Coordinate

const TileColorIndices: (tileColorIndices: Array<number | TileColorIndex>) => TileColorIndex[] = tileColorIndices =>
	tileColorIndices.map(tileColorIndex => tileColorIndex as any) as TileColorIndex[]

const Address: (address: number[]) => Address = address =>
	address.map(index => index as any) as Address

const StripePositions: (stripePositions: Array<StripePosition | number>) => StripePosition[] = stripePositions =>
	stripePositions.map(stripePosition => stripePosition as any) as StripePosition[]

const Supertile: (supertile: number[][][]) => Supertile = supertile => supertile as any

const SettingsPath: (settingsPath: Array<string | SettingsStep>) => SettingsPath = settingsPath => settingsPath as any

export {
	Address,
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
	TileColorIndex,
	TileColorIndices,
	Unit,
}
