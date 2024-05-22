import React from "react";
import "./style.css";
import { products, seffy } from "../../data/mockData";
import { Margin } from "@mui/icons-material";

class Product extends React.Component {
  render() {
    return (
      <div className="ProductItem">
        <div>
          <img className="productImg" src={this.props.productImageUrl} />
        </div>

        <div>
          <span id="heading">id : </span>
          <span id="details">{this.props.id}</span>
          <br />
          <span id="heading">title: </span>
          <span id="details">{this.props.title}</span>
          <br />
          <span id="heading">description : </span>
          <span id="details">{this.props.description} </span>
          <br />
          <span id="heading">Submitted by:</span>
          <img className="avatar-image" src={this.props.submitterAvatarUrl} />
        </div>
      </div>
    );
  }
}
class ProductList extends React.Component {
  render() {
    const products = this.props.products;
    return (
      <div className="row">
        {products.map((product) => (
          <div className="col-6" key={product.id}>
            <div className="ProductItem">
              <div>
                <img className="productImg" src={product.productImageUrl} />
              </div>
              <div>
                <span id="heading">id: </span>
                <span id="details">{product.id}</span>
                <br />
                <span id="heading">title: </span>
                <span id="details">{product.title}</span>
                <br />
                <span id="heading">description: </span>
                <span id="details">{product.description}</span>
                <br />
                <span id="heading">Submitted by:</span>
                <img
                  className="avatar-image"
                  src={product.submitterAvatarUrl}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ProductList;
