// tslint:disable:max-file-line-count

import {
	AnimationSettingsPathShortcut,
	AnimationSettingsTypePathShortcuts,
} from './settings/AnimationSettings'
import {
	ColorAssignmentSettingsPathShortcut,
	ColorSettingsPathShortcut,
	ColorSettingsTypePathShortcuts,
} from './settings/ColorSettings'
import { GridSettingsPathShortcut, GridSettingsTypePathShortcuts } from './settings/GridSettings'
import { LayerSettingsPathShortcut, LayerSettingsTypePathShortcuts } from './settings/LayerSettings'
import {
	StripeCountContinuumSettingsPathShortcut,
	StripePositionSettingsPathShortcut,
	StripeSettingsPathShortcut,
	StripeSettingsTypePathShortcuts,
} from './settings/StripeSettings'
import {
	TextureSettingsPathShortcut,
	TextureSettingsTypePathShortcuts ,
} from './settings/TextureSettings'
import { TileSettingsPathShortcut, TileSettingsTypePathShortcuts } from './settings/TileSettings'
import { ViewSettingsPathShortcut, ViewSettingsTypePathShortcuts } from './settings/ViewSettings'

type TypePathShortcuts =
	| AnimationSettingsTypePathShortcuts
	| ColorSettingsTypePathShortcuts
	| GridSettingsTypePathShortcuts
	| LayerSettingsTypePathShortcuts
	| StripeSettingsTypePathShortcuts
	| TextureSettingsTypePathShortcuts
	| TileSettingsTypePathShortcuts
	| ViewSettingsTypePathShortcuts

export {
	// Settings type path shortcuts

	AnimationSettingsPathShortcut,
	ColorSettingsPathShortcut,
	ColorAssignmentSettingsPathShortcut,
	GridSettingsPathShortcut,
	LayerSettingsPathShortcut,
	StripeSettingsPathShortcut,
	StripeCountContinuumSettingsPathShortcut,
	StripePositionSettingsPathShortcut,
	TextureSettingsPathShortcut,
	TileSettingsPathShortcut,
	ViewSettingsPathShortcut,

	// General type path shortcuts

	TypePathShortcuts
}
