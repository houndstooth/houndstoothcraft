import composePatterns from '../../../src/execute/composePatterns'
import consoleWrapper from '../../../src/utilities/consoleWrapper'

describe('compose patterns', () => {
	it('merges one pattern onto the other', () => {
		const patternToBeMergedOnto = {
			colorSettings: {
				assignment: {
					assignmentMode: 'yoda',
					switcheroo: 'death star',
				},
			},
			gridSettings: {
				gridSize: 'jedi',
			},
		}
		const patternToMerge = {
			colorSettings: {
				assignment: {
					assignmentMode: 'luke',
				},
			},
			gridSettings: {
				gridSize: 'sith',
			},
		}

		composePatterns({ patternToBeMergedOnto, patternToMerge })

		const expectedPattern = {
			colorSettings: {
				assignment: {
					assignmentMode: 'luke',
					switcheroo: 'death star',
				},
			},
			gridSettings: {
				gridSize: 'sith',
			},
		}
		expect(expectedPattern).toEqual(patternToBeMergedOnto)
	})

	it('errors when it notices that a setting being merged onto the pattern does not fit into the pattern structure, and then does not merge it', () => {
		spyOn(consoleWrapper, 'error')
		const patternToBeMergedOnto = {}
		const patternToMerge = {
			colorSettings: {
				assignment: {
					probablyAnAccident: {
						assignmentMode: 'yoda',
						switcheroo: 'death star',
					},
				},
			},
		}

		composePatterns({ patternToBeMergedOnto, patternToMerge })

		const expectedPattern = {}
		expect(expectedPattern).toEqual(patternToBeMergedOnto)
		expect(consoleWrapper.error).toHaveBeenCalledWith('attempted to compose a pattern with an unrecognized setting: colorSettings.assignment.probablyAnAccident')
	})

	it('recognizes color objects', () => {
		const patternToBeMergedOnto = {
			colorSettings: {
				backgroundColor: { r: 100, g: 200, b: 0, a: 1 },
			},
		}
		const patternToMerge = {
			colorSettings: {
				backgroundColor: { r: 3, g: 3, b: 3, a: 1 },
			},
		}

		composePatterns({ patternToBeMergedOnto, patternToMerge })

		const expectedPattern = {
			colorSettings: {
				backgroundColor: { r: 3, g: 3, b: 3, a: 1 },
			},
		}
		expect(expectedPattern).toEqual(patternToBeMergedOnto)
	})

	describe('warning about conflicts', () => {
		let warnSpy
		beforeEach(() => {
			spyOn(consoleWrapper, 'warn')
			warnSpy = jasmine.createSpy()
			composePatterns.__Rewire__('warn', warnSpy)
		})

		it('warns when requested and there are conflicts', () => {
			const patternToBeMergedOnto = {
				colorSettings: {
					assignment: {
						assignmentMode: 'yoda',
						switcheroo: 'death star',
					},
				},
				gridSettings: {
					gridSize: 'jedi',
				},
			}
			const patternToMerge = {
				colorSettings: {
					assignment: {
						assignmentMode: 'luke',
					},
				},
				gridSettings: {
					gridSize: 'sith',
				},
			}

			composePatterns({ patternToBeMergedOnto, patternToMerge, warnAboutConflicts: true })

			const expectedWarningOne = 'some effects have conflicts on setting `colorSettings.assignment.assignmentMode`: `yoda` was overridden by `luke`'
			const expectedWarningTwo = 'some effects have conflicts on setting `gridSettings.gridSize`: `jedi` was overridden by `sith`'
			expect(consoleWrapper.warn).toHaveBeenCalledWith(expectedWarningOne)
			expect(warnSpy).toHaveBeenCalledWith(expectedWarningOne)
			expect(consoleWrapper.warn).toHaveBeenCalledWith(expectedWarningTwo)
			expect(warnSpy).toHaveBeenCalledWith(expectedWarningTwo)
		})

		it('does not warn when not requested', () => {
			const patternToBeMergedOnto = { gridSettings: { gridSize: 'jedi' } }
			const patternToMerge = { gridSettings: { gridSize: 'sith' } }

			composePatterns({ patternToBeMergedOnto, patternToMerge })

			expect(consoleWrapper.warn).not.toHaveBeenCalled()
			expect(warnSpy).not.toHaveBeenCalled()
		})

		it('does not warn when there are no conflicts', () => {
			const patternToBeMergedOnto = {
				colorSettings: {
					assignment: {
						assignmentMode: 'yoda',
						switcheroo: 'death star',
					},
				},
			}
			const patternToMerge = {
				colorSettings: {
					assignment: {
						flipGrain: 'luke',
					},
				},
			}

			composePatterns({ patternToBeMergedOnto, patternToMerge, warnAboutConflicts: true })

			expect(consoleWrapper.warn).not.toHaveBeenCalled()
			expect(warnSpy).not.toHaveBeenCalled()
		})

		it('does not warn when the settings conflict but are the same', () => {
			const patternToBeMergedOnto = { gridSettings: { gridSize: 'sith' } }
			const patternToMerge = { gridSettings: { gridSize: 'sith' } }

			composePatterns({ patternToBeMergedOnto, patternToMerge, warnAboutConflicts: true })

			expect(consoleWrapper.warn).not.toHaveBeenCalled()
			expect(warnSpy).not.toHaveBeenCalled()
		})

		it('does not warn when the functions are equal', () => {
			const patternToBeMergedOnto = { tileSettings: { getTileOriginAndSize: a => a + 1 } }
			const patternToMerge = { tileSettings: { getTileOriginAndSize: a => a + 1 } }

			composePatterns({ patternToBeMergedOnto, patternToMerge, warnAboutConflicts: true })

			expect(consoleWrapper.warn).not.toHaveBeenCalled()
			expect(warnSpy).not.toHaveBeenCalled()
		})

		it('does warn when the functions are not equal', () => {
			const patternToBeMergedOnto = { tileSettings: { getTileOriginAndSize: a => a + 1 } }
			const patternToMerge = { tileSettings: { getTileOriginAndSize: b => b + 1 } }

			composePatterns({ patternToBeMergedOnto, patternToMerge, warnAboutConflicts: true })

			const expectedWarning = 'some effects have conflicts on setting `tileSettings.getTileOriginAndSize`: `function getTileOriginAndSize(a) {return a + 1;}` was overridden by `function getTileOriginAndSize(b) {return b + 1;}`'
			expect(consoleWrapper.warn).toHaveBeenCalledWith(expectedWarning)
			expect(warnSpy).toHaveBeenCalledWith(expectedWarning)
		})

		it('does not warn when arrays are equal', () => {
			const patternToBeMergedOnto = { colorSettings: { set: [ 'a', 'b' ] } }
			const patternToMerge = { colorSettings: { set: [ 'a', 'b' ] } }

			composePatterns({ patternToBeMergedOnto, patternToMerge, warnAboutConflicts: true })

			expect(consoleWrapper.warn).not.toHaveBeenCalled()
			expect(warnSpy).not.toHaveBeenCalled()
		})

		it('does warn when arrays are not equal', () => {
			const patternToBeMergedOnto = { colorSettings: { set: [ 'a', 'b' ] } }
			const patternToMerge = { colorSettings: { set: [ 'b', 'a' ] } }

			composePatterns({ patternToBeMergedOnto, patternToMerge, warnAboutConflicts: true })

			const expectedWarning = 'some effects have conflicts on setting `colorSettings.set`: `[ a, b ]` was overridden by `[ b, a ]`'
			expect(consoleWrapper.warn).toHaveBeenCalledWith(expectedWarning)
			expect(warnSpy).toHaveBeenCalledWith(expectedWarning)
		})
	})
})
