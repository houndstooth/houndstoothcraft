// tslint:disable:variable-name member-ordering no-any no-unsafe-any max-file-line-count

// First order, singular

import { Dimensions, Path, Pixel, Px, SettingsFunctionObject, SettingsPath, SettingsStep } from '../app'
import {
	Address,
	AddressElement,
	ColorSet,
	Coordinate,
	Grid,
	Outline,
	Radian,
	ShapeColorIndex,
	StripePosition,
	Supertile,
	Unit,
} from '../pattern'
import { Color, Frame, Layer } from '../types'
import { CouldBeSettingsFunctionObject } from './types'

const Px: (_: number) => Px =
	(px: number): Px => px as any
const Frame: (_: number) => Frame =
	(frame: number): Frame => frame as any
const Layer: (_: number) => Layer =
	(layer: number): Layer => layer as any
const Radian: (_: number) => Radian =
	(radian: number): Radian => radian as any
const ShapeColorIndex: (_: number) => ShapeColorIndex =
	(shapeColorIndex: number): ShapeColorIndex => shapeColorIndex as any
const StripePosition: (_: number) => StripePosition =
	(stripePosition: number): StripePosition => stripePosition as any
const Unit: (_: number) => Unit =
	(unit: number): Unit => unit as any
const AddressElement: (_: number) => AddressElement =
	/* istanbul ignore next */
	(addressElement: number): AddressElement => addressElement as any
const SettingsStep: (_: string) => SettingsStep =
	(settingsStep: string): SettingsStep => settingsStep as SettingsStep

// First order, plurals

// Frames not yet needed
const Layers: (_: Array<number | Layer>) => Layer[] =
	(layers: Array<number | Layer>): Layer[] => layers as Layer[]
// Radians might be confusing because it's also natural to say "in radians"; I would call an array of them a Rotation
const ShapeColorIndices: (_: Array<number | ShapeColorIndex>) => ShapeColorIndex[] =
	(shapeColorIndices: Array<number | ShapeColorIndex>): ShapeColorIndex[] =>
		shapeColorIndices.map((shapeColorIndex: number | ShapeColorIndex): ShapeColorIndex =>
			shapeColorIndex as any)
const StripePositions: (_: Array<StripePosition | number>) => StripePosition[] =
	(stripePositions: Array<StripePosition | number>): StripePosition[] =>
		stripePositions.map((stripePosition: number | StripePosition) =>
			stripePosition as any) as StripePosition[]
// Units might be confusing because it's also natural to say "in units"; see Coordinate for a type that is Unit[]
const Address: (_: Array<number | AddressElement>) => Address =
	(address: Array<number | AddressElement>): Address => address as any
const SettingsPath: (_: SettingsStep[] | Array<string | SettingsStep>) => SettingsPath =
	(settingsPath: SettingsStep[] | Array<string | SettingsStep>): SettingsPath => settingsPath as SettingsPath

// Second order, singular

const Supertile: (_: Grid<Array<number | ShapeColorIndex>>) => Supertile =
	(supertile: Grid<Array<number | ShapeColorIndex>>): Supertile =>
		supertile as Supertile
const Coordinate: (_: Array<number | Unit>) => Coordinate =
	(coordinate: Array<Unit | number>): Coordinate =>
		coordinate.map((unit: Unit | number): Unit => unit as any) as Coordinate
const Pixel: (_: Array<number | Px>) => Pixel =
	(pixel: Array<number | Px>): Pixel => pixel.map((px: number | Px) => px as any) as Pixel
const Dimensions: (_: Array<number | Px>) => Dimensions =
	(dimensions: Array<number | Px>): Dimensions =>
		dimensions.map((px: number | Px): Px => px as any) as Dimensions

// Second order, plural
const SettingsFunctionObjects: (_: CouldBeSettingsFunctionObject) => SettingsFunctionObject =
	(settingsFunctionObjects: CouldBeSettingsFunctionObject): SettingsFunctionObject =>
		// tslint:disable-next-line:max-line-length
		settingsFunctionObjects.map(({ settingName, settingsFunction, settingsPath }: any): SettingsFunctionObject => ({
			settingName: SettingsStep(settingName),
			settingsFunction,
			settingsPath: SettingsPath(settingsPath),
		})) as any

// Third order, singular

const Outline: (_: Array<Array<number | Unit> | Coordinate>) => Outline =
	(outline: Array<Array<number | Unit> | Coordinate>): Outline => outline.map(Coordinate)
const ColorSet: (_: Color[]) => ColorSet =
	(colorSet: Color[]): ColorSet => colorSet as ColorSet
const Path: (_: Array<Array<number | Px> | Pixel>) => Path =
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
