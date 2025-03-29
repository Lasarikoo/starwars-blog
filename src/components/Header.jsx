import "../css/Header.css"

import Logo from "../assets/star-wars-logo.png"

function Header() {

    return (

        <div className="header">
            <img className='logo' src={Logo}></img>
        </div>

    )
}

export default Header;