import { v4 as uuid } from "uuid";

function BannerItem({ data }) {
    return (
        <div
            className="product-banner-img"
            style={{
                backgroundImage: `url(${data.img})`,
            }}
        >
            {data.overlayText ? (
                <div className="overlay-text">
                    <small className="carousel-category-name banner">
                        <span></span>
                        {data.overlayText.title}
                    </small>
                    <p>{data.overlayText.content}</p>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}
export function ProductBanners() {
    const data = [
        {
            id: uuid(),
            img:
                "https://hongo.b-cdn.net/watch/wp-content/uploads/sites/10/2019/11/graphic-banner-6-1.jpg.webp",
        },
        {
            id: uuid(),
            img:
                "https://i.pinimg.com/originals/9f/7a/cd/9f7acd531bcbac86f776597c44918815.jpg",
        },
        {
            id: uuid(),
            img:
                "https://images.unsplash.com/photo-1499256573800-b2e09dc73631?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            overlayText: {
                title: "ABOUT COMPANY",
                content: `Just now learn about our brand, quality and latest design watches. GoodTimes provides such watches at such an affordable prices.`,
            },
        }
    ];
    return (
        <div className="product-banners">
            {data.map((item) => (
                <BannerItem key={item.id} data={item} />
            ))}
        </div>
    );
}
