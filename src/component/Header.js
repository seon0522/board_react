import { Link } from "react-router-dom";
import "../css/header.scss";

export function Header() {
  return (
    <div className="header-wrapper">
      <div className="header-title">
        <Link to="/">
          <p className="header">ReactBoard</p>
        </Link>
      </div>
      <div className="header-menu">
        <Link to="/create_card">
          <p className="btnStyle">Create</p>
        </Link>
      </div>
    </div>
  );
}
