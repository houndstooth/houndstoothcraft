import { globalWrapper } from '../../../utilities'
import { overrideClearHandler } from '../../controls'

const createOverrideClear: () => HTMLButtonElement =
	(): HTMLButtonElement => {
		const overrideClear: HTMLButtonElement = globalWrapper.document.createElement('button')
		overrideClear.innerHTML = 'clear'
		overrideClear.onclick = overrideClearHandler.default

		return overrideClear
	}

export default createOverrideClear
