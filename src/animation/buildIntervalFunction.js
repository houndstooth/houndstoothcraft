import store from '../../store'

export default ({ animationFunction, stopCondition }) => () => {
	animationFunction()
	if (stopCondition()) clearInterval(store.interval)
}
