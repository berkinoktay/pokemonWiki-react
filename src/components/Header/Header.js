import Logo from '../../img/pokeball.png';
function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src={Logo} alt="" />
        <h1>Pokemon Wiki</h1>
      </div>
    </div>
  );
}

export default Header;
