import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { ServicesGrid } from './ServicesGrid'
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('ORg4AjUWIQA/Gnt2VVhkQlFaclZJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkdiXX9ZcHVUQ2leUkU=');


function App() {
  const [count, setCount] = useState(0)

  return (
    

      <div id="grandgrandfather" className="app-container" >
        {/* <span>Container - GrandGrandFather</span> */}
        

        <ServicesGrid />

        
      </div>
    
  )
}

export default App
