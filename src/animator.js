export default ({ animationFunction, frameRate, stopCondition }) => ({
	thing: null,

	start: function () {
		this.thing = setInterval(function () {
			animationFunction()
			if (stopCondition()) clearInterval(this.thing)
		}.bind(this), frameRate)
	}
})
