import Jasmine from 'jasmine'

require('jsdom-global')()

const jasmine = new Jasmine()
jasmine.loadConfigFile('test/src/jasmine.json')
jasmine.execute()
