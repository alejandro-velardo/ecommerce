import React, {useContext} from 'react'
import Card from 'react-bootstrap/Card'
import { Link, useNavigate } from 'react-router-dom'
import GlobalContext from "../context/GlobalContext"


export const Error = () => {
  const { error } = useContext(GlobalContext)

  return (
    <div className='error'>
      <div className='error-card'>
      <Card
        bg="light"
        text="dark"
        style={{ width: '18rem' }}
        className="mb-2"
      >
        <Card.Header>Error</Card.Header>
        <Card.Body>
          <Card.Title> Something Went Wrong: </Card.Title>

          <Card.Text>
            {error && <p>{error}.</p> }
            <p>Go <Link to="/">home</Link></p>
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
    </div>
  )
}

export default Error