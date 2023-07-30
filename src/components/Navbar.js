import React from 'react'
import './Navbar.css';
import  { useCoinState } from '../Context-crypto';


const Navbar = () => {
  const {currency,setCurrency} = useCoinState();
  console.log(currency)
  return (
   <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">CryptoWave</a>


    <ul className="navbar-nav ms-auto">
      <form>
        <select id='currency'
        value={currency}
        onChange={(e)=> setCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="INR">INR</option>

        </select>
      </form>
    </ul>
  
</nav>
   </>
  )
}

export default Navbar