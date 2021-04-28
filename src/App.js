import './index.css';
import {SpacexLaunches} from './components/SpacexLaunches'
import {SpacexLogo} from './components/SpacexLogo'
import {SpacexLaunchImage} from './components/SpacexLaunchImage'

function App() {
  return (
    <div className="body_container">
      <SpacexLogo />
      <SpacexLaunchImage />
      <SpacexLaunches />
    </div>
  )
}

export default App;