import React from 'react'
import {Link} from 'react-router-dom'

export const Footer = () => {
  return (
    <div className='footer'>
      <p>Alejandro Velardo &#169; 2023 </p>
      <Link to="/admin">admin</Link>
    </div>
  )
}
export default Footer