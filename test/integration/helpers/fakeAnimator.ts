import { FakeAnimator, FakeAnimatorParams } from './types'

const fakeAnimator: FakeAnimator =
	async ({ animationFunction, resolveAnimation, stopConditionFunction }: FakeAnimatorParams): Promise<void> => {
		while (!stopConditionFunction()) {
			await animationFunction()
		}
		resolveAnimation()
	}

export default fakeAnimator
