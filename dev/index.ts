// tslint:disable:no-import-side-effect
import '../index'

declare const module: any

if (module.hot) {
	module.hot.accept()
}
