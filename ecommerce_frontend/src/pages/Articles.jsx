import { useState, useEffect, useContext } from "react"
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Button, Table } from 'react-bootstrap'
import GlobalContext from "../context/GlobalContext"

const API_URL = "http://localhost:3050/api/"

export const Articles = () => {
  const [articles, setArticles] = useState([])
  const [error, serError] = useState("")
  const { cart, setCart } = useContext(GlobalContext)

  const model = "articles"

  const loadArticles = () => {
    fetch(API_URL + model)
      .then(response => response.json())
      .then(response => {
        if (response.ok === true) {
          setArticles(response.data)
        } else {
          console.log("error")
        }
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    loadArticles()
  }, [])

  const addToCart = (article) => {
    const articleToUpdate = cart.find(cartArticle => cartArticle.name === article.name)
    console.log(articleToUpdate)
    if (articleToUpdate){
      articleToUpdate.quantity = Number(articleToUpdate.quantity) + 1
      const newCart = cart.map(cartArticle => (
        cartArticle.idarticle === article.idarticle 
        ? articleToUpdate 
        : cartArticle
        ))
      setCart(newCart)
    } else {
      article.quantity = 1
      setCart([...cart, article])
    }
  }

  return (
    <div className="articles">
      <h1>Articles</h1>
      <Row xs={1} md={2} className="g-4">
        {articles.map((article, index) => (
          <Col key={index}>
            <Card>
              <Card.Img variant="top"  className="article-card-image" src={`http://localhost:3050/pictures/${article.filename1}`} />
              <Card.Body>
                <Card.Title><h3>{article.name}</h3></Card.Title>
                <Card.Text>
                  <div className="article-card-details">
                    <p>{article.description}</p>
                    <p>{article.price}€</p>
                  </div>
                  <div className="article-card-buttons">
                    <Button variant="outline-dark">View Details</Button>
                    <Button onClick={() => addToCart(article)} variant="outline-dark">Add to cart</Button>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Articles