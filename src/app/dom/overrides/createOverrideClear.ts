import { globalWrapper } from '../../../utilities'
import { overrideClearClickHandler } from '../../controls'

const createOverrideClear: () => HTMLButtonElement =
	(): HTMLButtonElement => {
		const overrideClear: HTMLButtonElement = globalWrapper.document.createElement('button')
		overrideClear.innerHTML = 'clear'
		overrideClear.onclick = overrideClearClickHandler.default

		return overrideClear
	}

export default createOverrideClear
