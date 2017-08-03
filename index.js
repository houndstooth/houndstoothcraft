import composeMainHoundstooth from './src/store/composeMainHoundstooth'
import setupCanvas from './src/render/setupCanvas'
import setupControls from './src/application/setupControls'
import execute from './src/application/execute'

composeMainHoundstooth()
setupCanvas()
setupControls()
execute()
