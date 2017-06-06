import test from 'ava'
import applicationUtilities from '../../utilities/applicationUtilities'

test('deeper path does not mutate the passed property path', t => {
	const nestedPropertyPath = [ 'colorConfig', 'assignment' ]
	const propertyName = 'set'

	const deeperPath = applicationUtilities.deeperPath({ nestedPropertyPath, propertyName })

	t.deepEqual(deeperPath, [ 'colorConfig', 'assignment', 'set' ])
	t.deepEqual(nestedPropertyPath, [ 'colorConfig', 'assignment' ])
})