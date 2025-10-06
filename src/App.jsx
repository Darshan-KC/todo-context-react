import { TodoAppContent } from './components'
import {TodoProvider} from './contexts'

function App() { 
  return (
    <>
      <TodoProvider>
        <TodoAppContent />
      </TodoProvider>
    </>
  )
}

export default App
