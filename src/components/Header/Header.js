import { Link } from 'react-router-dom';
import Logo from '../../img/pokeball.png';
function Header() {
  return (
    <div className="header">
      <Link to="/">
        <div className="logo">
          <img src={Logo} alt="" />
          <h1>Pokemon Wiki</h1>
        </div>
      </Link>
    </div>
  );
}

export default Header;
