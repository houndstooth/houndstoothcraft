// tslint:disable:variable-name member-ordering no-any no-unsafe-any max-file-line-count

import { Frame } from '../animation'
import {
	Address,
	AddressElement,
	ColorSet,
	Grid,
	ShapeColorIndex,
	StripePosition,
	Supertile,
	Unit,
} from '../components'
import { Layer, SettingsFunctionObject } from '../execute'
import { Dimensions, Px } from '../page'
import { Color, Path, Pixel } from '../render'
import { Coordinate, Outline, Radian } from '../space'
import { SettingsPath, SettingsStep } from '../store'
import { CouldBeSettingsFunctionObject } from './types'

// First order, singular

const Px: (px: number) => Px =
	(px: number): Px => px as any
const Frame: (frame: number) => Frame =
	(frame: number): Frame => frame as any
const Layer: (layer: number) => Layer =
	(layer: number): Layer => layer as any
const Radian: (radian: number) => Radian =
	(radian: number): Radian => radian as any
const ShapeColorIndex: (shapeColorIndex: number) => ShapeColorIndex =
	(shapeColorIndex: number): ShapeColorIndex => shapeColorIndex as any
const StripePosition: (stripePosition: number) => StripePosition =
	(stripePosition: number): StripePosition => stripePosition as any
const Unit: (unit: number) => Unit =
	(unit: number): Unit => unit as any
const AddressElement: (addressElement: number) => AddressElement =
	(addressElement: number): AddressElement => addressElement as any
const SettingsStep: (settingsStep: string) => SettingsStep =
	(settingsStep: string): SettingsStep => settingsStep as SettingsStep

// First order, plurals

// Frames not yet needed
const Layers: (layers: Array<number | Layer>) => Layer[] =
	(layers: Array<number | Layer>): Layer[] => layers as Layer[]
// Radians might be confusing because it's also natural to say "in radians"; I would call an array of them a Rotation
const ShapeColorIndices: (shapeColorIndices: Array<number | ShapeColorIndex>) => ShapeColorIndex[] =
	(shapeColorIndices: Array<number | ShapeColorIndex>): ShapeColorIndex[] =>
		shapeColorIndices.map((shapeColorIndex: number | ShapeColorIndex): ShapeColorIndex =>
			shapeColorIndex as any)
const StripePositions: (stripePositions: Array<StripePosition | number>) => StripePosition[] =
	(stripePositions: Array<StripePosition | number>): StripePosition[] =>
		stripePositions.map((stripePosition: number | StripePosition) =>
			stripePosition as any) as StripePosition[]
// Units might be confusing because it's also natural to say "in units"; see Coordinate for a type that is Unit[]
const Address: (address: Array<number | AddressElement>) => Address =
	(address: Array<number | AddressElement>): Address => address as any
const SettingsPath: (settingsPath: SettingsStep[] | Array<string | SettingsStep>) => SettingsPath =
	(settingsPath: SettingsStep[] | Array<string | SettingsStep>): SettingsPath => settingsPath as SettingsPath

// Second order, singular

const Supertile: (supertile: Grid<Array<number | ShapeColorIndex>>) => Supertile =
	(supertile: Grid<Array<number | ShapeColorIndex>>): Supertile =>
		supertile as Supertile
const Coordinate: (coordinate: Array<number | Unit>) => Coordinate =
	(coordinate: Array<Unit | number>): Coordinate =>
		coordinate.map((unit: Unit | number): Unit => unit as any) as Coordinate
const Pixel: (pixel: Array<number | Px>) => Pixel =
	(pixel: Array<number | Px>): Pixel => pixel.map((px: number | Px) => px as any) as Pixel
const Dimensions: (dimensions: Array<number | Px>) => Dimensions =
	(dimensions: Array<number | Px>): Dimensions =>
		dimensions.map((px: number | Px): Px => px as any) as Dimensions

// Second order, plural
const SettingsFunctionObjects: (settingsFunctionObjects: CouldBeSettingsFunctionObject) => SettingsFunctionObject =
	(settingsFunctionObjects: CouldBeSettingsFunctionObject): SettingsFunctionObject =>
		// tslint:disable-next-line:max-line-length
		settingsFunctionObjects.map(({ settingName, settingsFunction, settingsPath }: any): SettingsFunctionObject => ({
			settingName: SettingsStep(settingName),
			settingsFunction,
			settingsPath: SettingsPath(settingsPath),
		})) as any

// Third order, singular

const Outline: (outline: Array<Array<number | Unit> | Coordinate>) => Outline =
	(outline: Array<Array<number | Unit> | Coordinate>): Outline => outline.map(Coordinate)
const ColorSet: (colorSet: Color[]) => ColorSet =
	(colorSet: Color[]): ColorSet => colorSet as ColorSet
const Path: (path: Array<Array<number | Px> | Pixel>) => Path =
	(path: Array<Array<number | Px> | Pixel>): Path => path.map(Pixel) as Path

export {
	Address,
	AddressElement,
	ColorSet,
	Coordinate,
	Px,
	Dimensions,
	Frame,
	Layer,
	Layers,
	Outline,
	Path,
	Pixel,
	Radian,
	SettingsFunctionObjects,
	SettingsPath,
	SettingsStep,
	ShapeColorIndex,
	ShapeColorIndices,
	StripePosition,
	StripePositions,
	Supertile,
	Unit,
}
