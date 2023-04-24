import React, { useContext } from 'react'
import GlobalContext from "../context/GlobalContext"
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import TotalCheckout from '../components/TotalCheckout'




export const Cart = () => {
  const { cart, setCart } = useContext(GlobalContext);

  const selectStyle = {
    width: '70px',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '25px',

  };

  const handleSelect = (e, article) => {
    const articleToUpdate = cart.find(cartArticle => cartArticle.name === article.name)
    articleToUpdate.quantity = e.target.value
    const newCart = cart.map(cartArticle => (
      cartArticle.idarticle === article.idarticle
        ? articleToUpdate
        : cartArticle
    ))
    setCart(newCart)
  }

  const deleteFromCart = (e, article) => {
    e.preventDefault()
    const newCart = cart.filter((cartArticle) =>
      cartArticle != article
    )
    setCart(newCart)
  }

  function RangeLoop({ start, end }) {
    const range = Array.from({ length: end - start }, (_, i) => start + i);
    return (
      <>
        {range.map((num) => (
          <option key={num}>{num}</option>
        ))}
      </>
    )
  }
  const cartArticles = cart.map((article, index) => {
    return (<tr key={index}>
      <td className='cart-image-cell'><img className="article-cart-image" src={`http://localhost:3050/pictures/${article.filename1}`} alt="" /></td>
      <td className='cart-article'>{article.name}</td>
      <td className='cart-article-select-cell'>
        <Form className='cart-article-form'>
          <Form.Select style={selectStyle} value={article.quantity} onChange={(e) => handleSelect(e, article)}>
            <RangeLoop start={1} end={article.stock + 1} />
          </Form.Select>
        </Form>
      </td>
      <td className='cart-article'>{article.quantity * article.price}</td>
      <td className='cart-button-cell'>
        <Button variant="outline-danger" className='cart-delete-button'
          onClick={(e) => deleteFromCart(e, article)}><FontAwesomeIcon className='cart-delete-icon' icon={faTrash} /></Button>
      </td>
    </tr>)
  })

  return (
    <div className='cart'>
      <h1>Cart</h1>
      {
        cart.length > 0
          ?
          (
            <>
              <Table striped>
                <thead>
                  <tr>
                    <th></th>
                    <th className='cart-header'>Name</th>
                    <th className='cart-header'>Quantity</th>
                    <th className='cart-header'>Total €</th>
                  </tr>
                </thead>
                <tbody>
                  {cartArticles}
                </tbody>
              </Table>
              <TotalCheckout />
            </>
          )
          : (<h4>No items in cart</h4>)
      }
    </div>
  )
}

export default Cart