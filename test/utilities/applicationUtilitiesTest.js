import test from 'ava'
import applicationUtilities from '../../utilities/applicationUtilities'

test('deeper path does not mutate the passed property path', t => {
	const nestedPropertyPath = [ 'colorConfig', 'assignment' ]
	const propertyName = 'set'

	const deeperPath = applicationUtilities.deeperPath({ nestedPropertyPath, propertyName })

	t.deepEqual(deeperPath, [ 'colorConfig', 'assignment', 'set' ])
	t.deepEqual(nestedPropertyPath, [ 'colorConfig', 'assignment' ])
})

test('reset object reassigns each of the immediate keys', t => {
	const objectToReset = {
		colorConfig: {
			set: [ 0, 1 ]
		},
		mode: 'COOLNESS'
	}
	const objectToResetTo = {
		mode: 'OG_NESS',
		foo: 'bar'
	}

	applicationUtilities.resetObject({ objectToReset, objectToResetTo })

	const expectedObject = {
		colorConfig: {
			set: [ 0, 1 ]
		},
		mode: 'OG_NESS',
		foo: 'bar'
	}
	t.deepEqual(objectToReset, expectedObject)
})
