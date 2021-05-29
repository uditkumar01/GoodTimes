import { SocialIconBar } from "./SocialIconBar";
import { CarouselItem } from "./CarouselItem";
import {v4 as uuid} from "uuid";
// import images for carousel
import img1 from "../../images/watches_PNG101425.png";
import img2 from "../../images/watches_PNG101426.png";
import img3 from "../../images/watches_PNG101428.png";
import img4 from "../../images/watches_PNG101429.png";
import img5 from "../../images/watches_PNG101452.png";
export function Carousel() {
    const dataCarousel = [
        {
            id:uuid(),
            imagePath: img1,
            title:"Rolez Premium Watches"
        },
        {
            id:uuid(),
            imagePath: img2,
            title:"Titaq Wen New Releases"
        },
        {
            id:uuid(),
            imagePath: img3,
            title:"Rolez Premium Watches"
        },
        {
            id:uuid(),
            imagePath: img4,
            title:"Titaq Wen New Releases"
        },
        {
            id:uuid(),
            imagePath: img5,
            title:"Rolez Premium Watches"
        }
    ]
    return (
        <div className="carousel-container">
            <SocialIconBar />
            <div className="carousel">
                <div className="different-contents">
                    
                    {
                        dataCarousel.map(item=>{
                            return <CarouselItem key={item.id} data={item}/>
                        })
                    }
                
                </div>
                <div className="carousel-count">
                    <span>
                        01<span className="line-through"></span>
                    </span>
                    <span>
                        02<span className="line-through"></span>
                    </span>
                    <span>
                        03<span className="line-through"></span>
                    </span>
                    <span>
                        04<span className="line-through"></span>
                    </span>
                    <span>
                        05<span className="line-through"></span>
                    </span>
                </div>
                <h1 className="carousel-logo">GOOD TIMES</h1>
            </div>
        </div>
    );
}
