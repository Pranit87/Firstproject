import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useUsers } from "../../Services/usersService";
import { useLocation } from "react-router-dom";
import { navbar } from "../../config";
import { NavDropdown } from "react-bootstrap";

const NavBar = () => {
  const { currentUser } = useUsers();
  const location = useLocation();
  const route =
    location.pathname === "/" ? "/login" : location.pathname + location.search;

  const [navbarConfig, setNavbarConfig] = React.useState({
    route,
    navbarItems: navbar,
  });

  React.useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      let navbarItems = {};
      navbarItems.items = [];
      navbarItems.Creditems = [];

      if (currentUser?.permissions?.VIEW_HOME) {
        navbarItems.items.push(navbar.items[0]);
      }
      if (currentUser?.permissions?.VIEW_JOB) {
        navbarItems.items.push(navbar.items[1]);
      }
      if (currentUser?.permissions?.VIEW_SOURCE) {
        navbarItems.items.push(navbar.items[2]);
      }
      if (currentUser?.permissions?.VIEW_MY_TEAMS) {
        navbarItems.items.push(navbar.items[5]);
      }
      if (currentUser?.permissions?.VIEW_TEAMS) {
        navbarItems.items.push(navbar.items[6]);
      }

      if (currentUser?.permissions?.VIEW_HOME) {
        navbarItems.items.push(navbar.items[8]);
      }

      if (currentUser?.permissions?.VIEW_JOB) {
        navbarItems.Creditems.push(navbar.Creditems[0]);
        navbarItems.Creditems.push(navbar.Creditems[1]);
      }

      setNavbarConfig((state) => {
        return {
          route: state.route,
          navbarItems,
        };
      });
    }
  }, [currentUser]);

  return (
    navbarConfig && (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {navbarConfig.navbarItems.items.map((item, index) => (
            <NavBarItem itemName={item.name} linkTo={item.route} key={index} />
          ))}
          {
            <li className="nav-item">
              <NavDropdown
                title="Credentials"
                className="cred"
                id="collasible-nav-dropdown"
              >
                {navbarConfig.navbarItems.Creditems.map((Creditem, index) => (
                  <NavDropdown.Item>
                    <Link to={Creditem.route}>{Creditem.name}</Link>
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </li>
          }
        </ul>
      </div>
    )
  );
};

const NavBarItem = ({ itemName, linkTo }) => (
  <li className="nav-item">
    <NavLink className="nav-link px-3" to={linkTo}>
      {itemName}
    </NavLink>
  </li>
);

export default NavBar;
