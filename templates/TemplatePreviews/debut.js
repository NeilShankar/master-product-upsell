const Debut = (props) => {
    return (
        <React.Fragment>
            <h3 className="text-center text-muted">{props.Title}</h3>
            <div className="container">
                <div className="grid-view-item product-card one">
                    <a href={ props.Product1Link }>
                        <img src={ props.Product1Image } className="grid-view-item__link grid-view-item__image-container" alt="Product 1"></img>
                        <h4 className="h4 grid-view-item__title product-card__title">{ props.Product1Title }</h4>
                        <p className="price price--listing">{ props.Product1Price }</p>
                    </a>
                </div>
                <img src="https://image.flaticon.com/icons/svg/32/32339.svg"></img>
                <div className="grid-view-item product-card two">
                    <a href={props.Product2Link}>
                        <img src={props.Product2Image} className="grid-view-item__link grid-view-item__image-container" alt="Product 2"></img>
                        <h4 className="h4 grid-view-item__title product-card__title">{props.Product2Title}</h4>
                        <p className="price price--listing">{ props.Product2Price } </p>
                    </a>
                </div>
            </div>
            <p className="price price--listing">{props.Total}</p>
            <button >Add Both To Cart </button><span id="free-ship-span" className="badge" >Free Shipping</span>
        </React.Fragment>
    )
}

export default Debut