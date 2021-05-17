import {
    Carousel,
    CategoryCard,
    Products,
    ProductBanners,
} from "../../component";
export function Home() {
    return (
        <>
            <Carousel />
            <div className="body-content">
                <br />
                <ul className="our-services">
                    <li className="service">
                        <i className="fas fa-globe icon"></i>WORLDWIDE SHIPPING
                    </li>
                    <li className="service">
                        <i className="fas fa-certificate icon"></i>CERTIFICATED
                        BY GEON
                    </li>
                    <li className="service">
                        <i className="fas fa-calendar-check icon"></i>30 DAYS
                        MONEY BACK
                    </li>
                    <li className="service">
                        <i className="fas fa-smile-beam icon"></i>99% POSITIVE
                        FEEDBACKS
                    </li>
                </ul>
                <CategoryCard />
                <Products
                    headingVisiblility={true}
                    title={"Feature Products"}
                    subTitle={"Elegance is an attitude longines"}
                />
                <ProductBanners />
            </div>
        </>
    );
}
