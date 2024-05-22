class Home extends React.Component {
  handleInteraction = (actionType) => {
    const { productId } = this.props;

    const data = {
      productId,
      actionType,
    };

    axios
      .post("/ML/userInteractions/", data)
      .then((response) => {
        //
      })
      .catch((error) => {
        //
      });
  };

  render() {
    const { productId } = this.props;

    return (
      <div>
        <button onClick={() => this.handleInteraction("view")}>
          voir produit
        </button>
        <button onClick={() => this.handleInteraction("add_to_cart")}>
          ajouter au panier
        </button>
        <button onClick={() => this.handleInteraction("purchase")}>
          acheter
        </button>
        /** ***************************** */
      </div>
    );
  }
}

export default Home;
