import '../index'

declare const module: any

if (module.hot) {
	module.hot.accept()
}
