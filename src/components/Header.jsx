import trollFaceImg from "../assets/troll-face.png";

const Header = () => {
    return (
        <div className="header">
            <img className="troll-img" src={trollFaceImg} alt="" />
            <h1 className="title">Meme Generator</h1>
            <p className="description">Real Course - Project 3</p>
        </div>
    )
}

export default Header