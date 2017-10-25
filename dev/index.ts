// tslint:disable:no-import-side-effect no-any
import '../index'

declare const module: any

if (module.hot) {
	module.hot.accept()
}
