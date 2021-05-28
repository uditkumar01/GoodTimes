import { useDataContext } from "../../context/dataProvider/DataProvider";
import { ProductCard } from "./ProductCard";

export function Products({
    headingVisiblility,
    category,
    noOfProducts,
    title,
    subTitle,
}) {
    const {
        dataState: {
            productData,
            currentPrice,
            filters,
            colorSet,
        },
    } = useDataContext();
    const {
        dataState: { categoryData },
    } = useDataContext();
    
    return (
        <>
            {headingVisiblility ? (
                <div className="product-heading">
                    <h4>{title}</h4>
                    <p>{subTitle}</p>
                </div>
            ) : (
                ""
            )}
            <div className="products-container">
                {(noOfProducts && noOfProducts < productData.length
                    ? productData.slice(0, noOfProducts)
                    : productData
                ).map((item) => {
                    const { freeDelivery, inStock } = filters;
                    if (
                        item.price <= currentPrice &&
                        (!freeDelivery || item.freeDelivery) &&
                        (category===undefined ||
                        categoryData
                            .find(
                                (categoryItem) =>
                                    categoryItem.name === category[0].value
                            )
                            .products.includes(item._id)) &&
                        (!inStock ||
                            item.stockStatus.toLowerCase() !==
                                "out of stock") &&
                        colorSet[item.color.name].active
                    ) {
                        return <ProductCard key={item.id} {...item} />;
                    }
                    return "";
                })}
            </div>
        </>
    );
}
