import gatherOptions from '../../../src/application/gatherOptions'
import store from '../../../store'
import codeUtilities from '../../../src/utilities/codeUtilities'
import initialState from '../../../src/state/initialState'

describe('gather options', () => {
	let gridAddress
	beforeEach(() => {
		store.currentState = codeUtilities.deepClone(initialState.INITIAL_STATE)
		gridAddress = [ 3, 5 ]
	})

	it('calls every options gathering function with the grid address, saving each result onto an object it returns', () => {
		store.currentState.mainHoundstooth.basePattern.gatherOptions = {
			optionOne: ({ gridAddress }) => ({ resultOne: [ gridAddress[ 0 ] + 1, gridAddress[ 1 ] + 1 ] }),
			optionTwo: ({ gridAddress }) => ({ resultTwo: [ gridAddress[ 0 ] - 1, gridAddress[ 1 ] - 1 ] }),
		}

		const options = gatherOptions({ gridAddress })

		const expectedOptions = {
			resultOne: [ 4, 6 ],
			resultTwo: [ 2, 4 ],
		}
		expect(options).toEqual(expectedOptions)
	})

	it('if there are no options gathering functions, options should be empty', () => {
		const options = gatherOptions({ gridAddress })

		expect(options).toEqual({})
	})
})
