import { AnimationSettingsTypePathShortcuts } from './settings/AnimationSettings'
import { ColorSettingsTypePathShortcuts } from './settings/ColorSettings'
import { GridSettingsTypePathShortcuts } from './settings/GridSettings'
import { LayerSettingsTypePathShortcuts } from './settings/LayerSettings'
import { StripeSettingsTypePathShortcuts } from './settings/StripeSettings'
import { TextureSettingsTypePathShortcuts } from './settings/TextureSettings'
import { TileSettingsTypePathShortcuts } from './settings/TileSettings'
import { ViewSettingsTypePathShortcuts } from './settings/ViewSettings'

type TypePathShortcuts =
	| AnimationSettingsTypePathShortcuts
	| ColorSettingsTypePathShortcuts
	| GridSettingsTypePathShortcuts
	| LayerSettingsTypePathShortcuts
	| StripeSettingsTypePathShortcuts
	| TextureSettingsTypePathShortcuts
	| TileSettingsTypePathShortcuts
	| ViewSettingsTypePathShortcuts

export { TypePathShortcuts }
