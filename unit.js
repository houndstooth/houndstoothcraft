import Jasmine from 'jasmine'
import mockContext from './test/src/helpers/mockContext'

require('jsdom-global')()
window.HTMLCanvasElement.prototype.getContext = () => mockContext()

const jasmine = new Jasmine()
jasmine.loadConfigFile('jasmine.json')
jasmine.execute()
