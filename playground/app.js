
import {render} from '#react'

// const App = (
    //     <div id="foo">
    //         <a>bar</a>
    //     </div>
    // )
    
/** @jsx React.createElement */
function App(props) {
  const [state,setState] =  useState(1)
  return (
    <h1 onClick={() => setState(c => c + 1)}> 
        Count: {state}
    </h1>
  )
}


const container = document.querySelector('#root')
render(App, container)




