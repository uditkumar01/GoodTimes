export function CarouselItem({ data: { imagePath, title } }) {
    return (
        <div className="carousel-content">
            <div className="carousel-content-contain">
                <div className="carousel-text">
                    <p className="carousel-category-name">
                        <span></span>NEW COLLECTION 2021
                    </p>
                    <h1 className="carousel-title">{title}</h1>
                    <p className="carousel-summary-text">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry printing and industry.
                    </p>
                    <span className="carousel-price-details">
                        <p className="old-price">Regular ₹1175.00</p>
                        <p className="new-price">Just ₹1159.00</p>
                    </span>
                    <button className="btn dark shop-now br-1">SHOP NOW</button>
                </div>
            </div>
            <div
                className="carousel-img"
                style={{
                    backgroundImage:"url("+imagePath+")",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat"
                }}
            ></div>
        </div>
    );
}
