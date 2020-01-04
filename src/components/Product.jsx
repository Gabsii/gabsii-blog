import React, { Component } from 'react'
import { css } from 'glamor'
import he from 'he'
import LazyLoad from 'react-lazyload'

import '../css/product.css'

class Product extends Component {
  constructor() {
    super()

    this.state = {
      slug: '',
      img: '',
      id: 0,
      sale: false
    }
    this.getProductURL = this.getProductURL.bind(this)
    this.toggleHover = this.toggleHover.bind(this)
    this.product = React.createRef()
  }

  componentDidMount() {
    // Sets the image, id and slug for the blogpost
    this.setState({
      img: this.props.thumbnail,
      id: this.props.id,
      slug: this.props.slug,
      onSale: this.props.prices.onSale,
      regular: this.props.prices.regularPrice,
      current: this.props.prices.price,
      hover: false,
    })
  }

  // This function is invoked each time a user presses the current blogpost Component

  getProductURL() {
    // Setting the location via window because im lazy lmao
    if (typeof window !== `undefined`) {
      let url = window.location.toString()
      let lastChar = url.substr(-1) // Selects the last character
      if (lastChar !== '/') {
        // If the last character is not a slash
        url = url + '/' // Append a slash to it.
      }
      return url + this.state.slug
    }
    return null
  }

  // This function removes all html tags from the title and excerpt.
  // that way the user gets them pretty formatted and without unnecessary html tags

  strip_html_tags(str) {
    if (str === null || str === '') return false
    else str = str.toString()
    return str.replace(/<[^>]*>/g, '')
  }

  toggleHover(e){
    // this.setState({hover: true})
    console.log(this.product);
    this.product.current.classList.toggle('animate');
    
  }

  //using the he.decode function from the he library to display the text utf8 encoded

  renderSimpleProduct() {
    return (
      <article className="product-card" ref={this.product} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} >
        <a className={`${styles.link}`} href={this.getProductURL()}>
          <LazyLoad height="100%" offset={100} once={true}>
            <main className="product-front">
              <div className="shadow"></div>
              <img src={this.props.thumbnail} alt={this.props.alt} />
              <div className="image_overlay"></div>
              <div className="view_details">View details</div>
              <div className="stats">
                <div className="stats-container">
                  <i>
                  {
                    // this.props.onSale 
                    // ?
                    //   (
                    //     <div>
                    //       <em>SALE</em>
                    //       <h3><del>{this.state.regular}</del></h3>
                    //       <h2>{this.state.current}</h2>
                    //     </div>
                    //   ) 
                    // :
                    //   (
                    //     <div>
                    //       <h2>{this.state.current}</h2>
                    //     </div>
                    //   )
                    }
                  </i>
                  <h3 className="product_price">{this.state.current}€</h3>
                  <h1 className="product_name">{he.decode(this.props.title || '')}</h1>

                  <div className="product-options">
                    <strong>SIZES</strong>
                    <span>XS, S, M, L, XL, XXL</span>
                    <strong>COLORS</strong>
                    <div className="colors">
                      <div className="c-blue"><span></span></div>
                      <div className="c-red"><span></span></div>
                      <div className="c-white"><span></span></div>
                      <div className="c-green"><span></span></div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </LazyLoad>
        </a>
      </article>
    )
  }

  render() {
      return this.renderSimpleProduct()
    }
}

const styles = {
  link: css({ textDecoration: 'none' }),
}


export default Product
