import { capitalize } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useDataContext } from "../../context/dataProvider/DataProvider";
function CategoryCardItem({ index, name, products }) {
    const data = [
        {
            id: uuid(),
            img:
                "https://hongo.b-cdn.net/watch/wp-content/uploads/sites/10/2019/11/watch-banner-05-new.jpg",
        },
        {
            id: uuid(),
            img:
                "https://i.pinimg.com/originals/60/86/46/608646a316c15c3eb097dc2973789990.gif",
        },
        {
            id: uuid(),
            img:
                "https://hongo.b-cdn.net/watch/wp-content/uploads/sites/10/2019/11/watch-banner-06-new.jpg.webp",
        },
        {
            id: uuid(),
            img:
                "https://www.wallpaperbetter.com/wallpaper/922/975/660/moto-360-smartwatch-2K-wallpaper.jpg",
        },
    ];
    return (
        <div className="category">
            <NavLink to={{pathname:"/shop", search:`?name=${name}`}}>
            <div
                className="category-card-img"
                style={{ backgroundImage: `url(${data[index].img})` }}
            >
                <div className="category-card">
                    <div className="category-overlay-text">
                        <div className="overlay-text">
                            <p>{capitalize(name)}</p>
                        </div>
                        <button className="no-of-items">{products.length} items</button>
                    </div>
                </div>
            </div>
            </NavLink>
        </div>
    );
}
export function CategoryCard() {
    const {
        dataState: { categoryData },
    } = useDataContext();
    // console.log(categoryData);
    
    return (
        <div className="category-card-container">
            {categoryData.map((item, index) => (
                <CategoryCardItem key={item._id}  index={index} {...item}/>
            ))}
        </div>
    );
}
