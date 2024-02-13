// Write your code here
import {Component} from 'react'

import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'
import './index.css'

class ProductItemDetails extends Component {
  state = {itemDetails: {}, isLoad: true, error: false, count: 1}

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    const jwToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {id} = match.params
    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({itemDetails: data, isLoad: false})
    } else {
      this.setState({error: true, isLoad: false})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  onClickMinus = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  onClickPlus = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  onClickContinueShopping = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderProductPage = () => {
    const {itemDetails, count, error} = this.state
    if (error === true) {
      return this.renderError()
    }
    return (
      <div className="bg">
        <div className="p-bg">
          <img className="p-img" src={itemDetails.image_url} alt="product" />
          <div className="r-div">
            <h1 className="p s">{itemDetails.title}</h1>
            <p>Rs {itemDetails.price}/-</p>
            <p className="m">
              <p className="r">
                {itemDetails.rating}
                <img
                  className="icon"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                />
              </p>
              <p>{itemDetails.total_reviews} Reviews</p>
            </p>
            <p className="s">{itemDetails.description}</p>
            <p className="p s">
              <span className="span">Available</span>:{' '}
              {itemDetails.availability}
            </p>
            <p className="p s ">
              <span className="span">Brand</span>: {itemDetails.brand}
            </p>
            <hr />
            <div className="btns">
              <button
                data-testid="minus"
                type="button"
                id="btn"
                onClick={this.onClickMinus}
              >
                -
                <BsDashSquare />
              </button>

              <p className="s">{count}</p>
              <button
                data-testid="plus"
                type="button"
                onClick={this.onClickPlus}
              >
                +<BsPlusSquare />
              </button>
            </div>
            <button type="button" className="c-btn">
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="similar">
          <h1 className="s">Similar Products</h1>
          <ul className="s-items">
            {itemDetails.similar_products.map(each => (
              <SimilarProductItem key={each.id} item={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderError = () => (
    <div className="e-box">
      <img
        className="e-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
      />
      <h1>Product Not Found</h1>
      <button
        onClick={this.onClickContinueShopping}
        type="button"
        className="c-btn"
      >
        Continue Shopping
      </button>
    </div>
  )

  render() {
    const {isLoad} = this.state

    return (
      <div className="bg">
        <Header />
        {isLoad ? this.renderLoader() : this.renderProductPage()}
      </div>
    )
  }
}

export default ProductItemDetails
