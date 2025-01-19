import './App.css'
import { AppScreen } from './Components/AppScreen'
import { AppContextProvider } from './context/AppContext'

function App() {
  return (<AppContextProvider>
    <AppScreen />
  </AppContextProvider>
  )
}

export default App
