import { useState, useEffect } from "react";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { RiLogoutCircleRFill, RiSettings5Fill } from "react-icons/ri";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import LogoutModal from "./LogoutModal";

const SideBar = () => {
  const menuItems = SidebarMenuItem();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setOpenSidebar(!openSidebar);
  };

  const toggleLogoutModal = () => {
    setOpenLogoutModal(!openLogoutModal);
  };

  const findPageTitle = () => {
    const currentItem = menuItems.find((item) =>
      location.pathname.endsWith(item.path)
    );
    if (currentItem) {
      setPageTitle(currentItem.label);
    } else {
      setPageTitle("");
    }
  };

  useEffect(() => {
    findPageTitle();
  }, [location.pathname, menuItems]);

  return (
    <div>
      <nav className="mobile-header-nav">
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button
            className="mobile-nav-toggle"
            title="Expand Sidebar"
            onClick={toggleMenu}
          >
            <BsLayoutSidebarInset />
          </button>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>{pageTitle || "Job Tracker"}</h3>
        </div>
      </nav>

      {openSidebar && (
        <div
          className="sidebar-backdrop"
          onClick={toggleMenu}
        ></div>
      )}

      <div className={`sidebar ${openSidebar ? "open" : ""}`}>
        <div>
          <div className="sidebar-header">
            <p className="sidebar-logo">Job Tracker</p>
            <button
              className="mobile-nav-toggle"
              style={{ fontSize: "1.25rem", color: "var(--text-light)" }}
              title="Minimize Sidebar"
              onClick={toggleMenu}
            >
              <BsLayoutSidebarInset />
            </button>
          </div>

          {/* Top sidebar items */}
          <ul className="sidebar-menu">
            {menuItems.map((item) => {
              const isActive = location.pathname.endsWith(item.path);
              return (
                <li
                  key={item.id}
                  className={`sidebar-item ${isActive ? "active" : ""}`}
                  onClick={toggleMenu}
                >
                  <Link to={item.path}>
                    <span className="sidebar-item-icon" style={{ display: "flex", fontSize: "1.25rem" }}>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-item">
            <Link
              to="settings"
              onClick={toggleMenu}
            >
              <span style={{ display: "flex", fontSize: "1.25rem" }}>
                <RiSettings5Fill />
              </span>
              <span>Settings</span>
            </Link>
          </div>
          <div className="sidebar-item">
            <div
              className="sidebar-action-item"
              style={{ cursor: "pointer" }}
              onClick={() => {
                toggleMenu();
                toggleLogoutModal();
              }}
            >
              <span style={{ display: "flex", fontSize: "1.25rem" }}>
                <RiLogoutCircleRFill />
              </span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>

      {openLogoutModal && (
        <LogoutModal setOpenLogoutModal={setOpenLogoutModal} />
      )}
    </div>
  );
};

export default SideBar;
