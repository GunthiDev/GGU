import { version } from "../../../package.json";
import "./Header.scss";

const Header: React.FC = () => {
  return (
    <div className="header-container">
      <img src="/images/256.png" alt="gitlab icon" />
      <div>
        <h1>GG U</h1>
        <h2>Gunthi's GitLab Upgrader</h2>
      </div>
      <p id="version">v{version}</p>
    </div>
  );
};

export default Header;
