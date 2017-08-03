[![Build Status](https://travis-ci.org/houndstooth/web-render.svg?branch=master)](https://travis-ci.org/houndstooth/web-render)

# Houndstooth web-render

Check it out at [https://houndstooth.cfapps.io](https://houndstooth.cfapps.io).

## development

```
git clone https://github.com/houndstooth/web-render.git
cd web-render
npm run setup
npm test & npm start
```

This will set up your environment and give you a dev web-render on localhost:8080 and Karma on :9876.

Each effect gets its own submodule and its own tests within that repo, which the parent repo Karma discovers.

## state hierarchy

In short:
- [store](#store)
    - [houndstooth](#houndstooth)
        - [pattern](#pattern)
            - [setting](#setting)  

### store
- example instances
	- `store`
	- `INITIAL_STORE`
- contents
	- `mainHoundstooth` — a [houndstooth](#houndstooth)
	- other stuff such as `lastSavedAnimationFrame`

### houndstooth
- example instances
	- `HOUNDSTOOTH_DEFAULTS`
	- `HOUNDSTOOTH_STRUCTURE`
	- `houndstoothEffects`
	- `houndstoothOverrides`
	- `mainHoundstooth`
- contents — all [patterns](#pattern)
	- `basePattern`
	- `animationsPattern`
	- `iterationsPattern`

A houndstooth consists of a small set of [patterns](#pattern) which, by virtue of being required to conform to the same structure, are able to interact by mapping onto each other.

The houndsteeth whose names begin with the word "houndstooth" are understood to be not ready-to-go, but rather layers to be composed into a desired finished houndstooth. Such finished houndsteeth are named to instead end with the word "houndstooth". Think of it this way: the former are *for/of houndstooth*, the latter *are houndstooth*, but both types conform to the same houndstooth structure.

That houndstooth structure, by the way, is captured in the constant `HOUNDSTOOTH_STRUCTURE`, and at this time looks like this: only base, animations, and iterations patterns. If you try to add any other sort, you should see the error message: 

```
attempted to compose a houndstooth with an unrecognized pattern
```

An "effect", such as the cmyktooth effect, is just a type of houndstooth intended to be composed, along with defaults and overrides, into a main houndstooth.

When you compose a houndstooth, you do so by composing each houndstooth layer's animations patterns into a finished animations pattern, each houndstooth layer's iterations patterns into a finished animations pattern, and each houndstooth layer's base patterns into a finished base pattern.

### pattern
- example instances
	- `basePattern`
	- `animationsPattern`
	- `iterationsPattern` 
	- `PATTERN_STRUCTURE`
- contents — all [settings](#setting) 
	- `colorSettings`
	- `gridSettings`
	- etc.

A pattern conforms to the `PATTERN_STRUCTURE`, a defined model of all the possible [settings](#setting) and how they nest in each other (all the way down to the leaves). If you try to add any other settings, you should see the error message: 

```
attempted to compose a pattern with an unrecognized setting
```

### setting
- example instances
	- `colorSettings`
	- `gridSettings`
	- `viewSettings`
	- `tileSettings`
	- `stripeSettings`
	- `animationSettings`
	- `iterationSettings`
- contents — all [settings](#setting)
	- Yes, it's settings all the way down from here. One does eventually arrive at leaves such as `tileSizeSetting` or `zoomOnCanvasCenter`.

The key difference between a [pattern](#pattern) and a setting:

- settings are focused; they each configure one specific aspect of a pattern, such as its colors, view, or grid. Yes, a specific aspect such as this may have various facets, e.g. the view has `canvasSize` and `zoom`, but these are still aspectually related. 
- patterns are heterogenous; they are collections of such focused settings.

For clarity and brevity, avoid referring to instances of patterns and settings by using the words "pattern" or "setting" as modifiers on other generic nouns, e.g. "a settings object", or a "pattern structure". The latter case in particular would undesirably overload the word "structure" to refer to both instances and a class (the all-important `PATTERN_STRUCTURE`). The words "pattern" and "setting" alone, used as nouns, should suffice to refer to instances of patterns and settings. This naming scheme may seem a bit odd in the case of settings, given that the word is plural, but I think in the end we will find that considering e.g. `colorSettings` to be a "setting" itself will cause less headaches than any alternative nomenclature.

Note that both an `animationsPattern` pattern and an `animationSettings` setting exist. This is not a mistake. The animations pattern consists of functions that map onto a base pattern, following the `PATTERN_STRUCTURE`, to cause their shared parent [houndstooth](#houndstooth) to animate. The animations settings configure that animation with settings including the frame rate. Conceivably, an animations pattern could even animate the animation settings, to e.g. cause the frame rate to slow over time. 

Both `iterationsPattern` and `iterationSettings` exist as well, for the same reason.

## execution & component hierarchy

In short:
- [animation](#animation)
	- [iteration](#iteration)
		- [grid](#grid)
			- [tile](#tile)
				- [shape](#shape)

### animation

When `animating` is false, essentially only a single animation frame is drawn.

Typically:
- the canvas is cleared in-between each animation frame

Potentially:
- clearing can be disabled to make some weird effects

When `exportFrames` is set to `true`, the next animation frame will not be rendered until the current one has finished saving. This may negatively impact the in-browser experience, but it is a solution if your houndstooth is too computationally expensive to watch at the desired frame rate; simply export the frames and assemble them into a video using a tool such as ImageJ.

### iteration

Whether [animating](#animation) or not, you may find that your houndstooth is best described not as a single [grid](#grid) of [tiles](#tile), but as many layers of such grids. 

Of course, when iterating, your grids should each have at least some (semi-)transparent areas in order to allow lower layers to show through.

One is always technically iterating, even if one is essentially only drawing a single iteration frame.

When both animating and iterating, the described set of iterations are drawn once for each animation frame. Of course, if your pattern is complex and your frame rate is fast, you may experience lag if you call for many iterations.

Differences between iterations and animations:
- Animation frames typically occur in very quick succession (maximal frame rate for maximal persistence of vision effect). Iterations, however, are considered to occur instantaneously/simultaneously. They are non-temporal; just a breaking down of a single image in a single moment in time into multiple layers.
- Animation frame neighbors are often very similar looking. If they weren't, the animation wouldn't be smooth, or wouldn't be considered to be animation at all.  Neighboring iteration frames, however, may look completely different from one another, or may look quite similar. It all depends on the intended effect.

### grid

A `grid` represents a tiling of the plane. It creates many `gridAddress`es and calls the [tile](#tile) function on each one.

Typically:
- a grid would receive something like "two-dimensional, sixteen by sixteen tiles", meaning it would generate 256 (16^2) addresses: \[ \[ 0, 0 \], \[ 0, 1 \] ... \[ 15, 15 \] \]

`gridAddress` has no units. It does not necessarily have a direct correlation with pixels on the canvas. It is abstract. It is a coordinate system for identifying tiles relative to each other, which of course can be (and is typically) used to position them next to each other on the canvas, but can be purposed otherwise. 

### tile

A tile represents a repeating portion of a pattern. A tile converts a `gridAddress` into `tileOrigin`, `tileSize`, and `tileColors`.

Typically: 
- `tileOrigin` defaults to multiplying each dimension of the `gridAddress` by the `tileSizeSetting`.
- `tileSize` also (naturally) defaults to the `tileSizeSetting`.
- A tile 

Potentially:
- (e.g. in the "houndsmorphosis" effect) each tile has its own size, and its origin is a complex function of address, some of which even result in no tile.
- A tile can receive a custom shapes function

Both `tileOrigin` and `tileSize` are expressed in units called "units". Units will be the same as pixels unless one changes the zoom from the default of 1 in the `viewSettings`.

A tile 
- can be pretty complex, but it understood to be the topmost repeating element
- can break down into multiple shapes, yes, but all of these shapes should have the same origin and size, so that they fit together into a tile; otherwise, why are you grouping them into something you consider a tile?
- also gathers an `outlineFunction` (or many of them) which it will pass on

### shape

A shape converts a `tileOrigin`, `tileSize`, and `outlineFunction` into an `outline`, and converts `tileColors` into a `color`.
A shape has only a single color and outline.

This outline then gets rotated, scrolled, and sized per any view settings until it represents what we're actually going to see on the screen. 

Then shape chooses a color out of the set of colors given it from the tile using the colorIndex (typically it just cycles through, but more complex orderings are possible).

The final step of shape is to pass on the outline and color to a single render call.
