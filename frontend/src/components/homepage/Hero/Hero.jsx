import Image from 'next/image';
import './hero.css'
import hero_img from '../assets/hero_img.png'
import logo from "../assets/frescoGuard_icon.png"

const Hero = () => {
    return (
        <>
        <Image src={logo}  alt="" className='logo'/>
            <div className="hero">
                <img src={hero_img} alt="" className='img'/>
                <div className="gradient-overlay"></div>
                <div className="heading">
                    <h1 className="first">Agriculture Matter</h1>
                    <h1 className="second">Effective Storage</h1>
                    <p className="desc">Fresco Guard employs data-driven technology, real-time updates, and user feedback to revolutionize food storage, minimizing spoilage and contributing to a significant reduction in food waste</p>
                    <button>Register / Sign In</button>
                </div>
            </div>
        </>
    )
}

export default Hero