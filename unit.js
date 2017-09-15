import Jasmine from 'jasmine'

require('jsdom-global')()

const jasmine = new Jasmine()
jasmine.loadConfigFile('jasmine.json')
jasmine.execute()
