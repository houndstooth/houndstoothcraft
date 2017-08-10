import composeMainHoundstooth from './src/store/composeMainHoundstooth'
import setupCanvas from './src/interface/setupCanvas'
import setupControls from './src/interface/setupControls'
import execute from './src/application/execute'

composeMainHoundstooth()
setupCanvas()
setupControls()
execute()
