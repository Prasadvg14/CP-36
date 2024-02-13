// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {item} = props
  return (
    <li className="item">
      <img
        className="i-img"
        src={item.image_url}
        alt={`similar product ${item.title}`}
      />
      <h2>{item.title}</h2>
      <p>BY {item.brand}</p>
      <div className="price ">
        <p>Rs {item.price}</p>
        <p className="r">
          {item.rating}
          <img
            className="icon"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
          />{' '}
        </p>
      </div>
    </li>
  )
}

export default SimilarProductItem
