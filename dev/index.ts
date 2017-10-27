// tslint:disable:no-import-side-effect no-any no-unsafe-any
import '../index'

declare const module: any

if (module.hot) {
	module.hot.accept()
}
