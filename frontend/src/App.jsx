import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from './Home'
import PaymentSuccess from './PaymentSuccess'
// secret =WeVuFA0MijnWwTXcIvI9xQ55
// keyid=rzp_test_1NdqZOSQdTLlim

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/paymentsuccess' element={<PaymentSuccess/>}/>
      </Routes>
    </Router>
  )
}

export default App