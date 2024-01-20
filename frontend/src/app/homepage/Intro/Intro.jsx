import './intro.css'
import Image from 'next/image';
import farm_people from '../assets/farm_people.png'

const Intro = () => {
    return (
        <>
        <div className="intro">
            <div className="left">
                <div className="dark_green_box"></div>
                <Image src={farm_people} alt="" />
            </div>
            <div className="right">
                <div className="data">
                    <p className="heading">
                        OUR INTRODUCTION
                    </p>
                    <h2>
                        Effective Storage Solutions
                    </h2>
                    <p className="sub-1">
                        We’re Leader in Agriculture Market
                    </p>
                    <p className="desc-2">
                    Effective storage solutions for warehouses handling crops involve strategic planning to optimize space, maintain crop quality, and ensure efficient operations. Key considerations include categorizing and segmenting crops based on characteristics, implementing temperature and humidity control, utilizing versatile racking systems, and employing ventilation to prevent moisture-related issues. Quality control measures, flexible storage options, and the use of proper containers further contribute to successful crop storage, reducing waste and preserving product quality.
                    </p>
                </div>
            </div>
            
        </div>
        </>
    )
}

export default Intro