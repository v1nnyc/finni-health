import Link from "next/link";

const Header = function HeaderComponent({ currentUser }) {
  const links = [
    !currentUser && {
      label: "Sign Up",
      href: "/auth/signup",
      position: "start",
    },
    !currentUser && {
      label: "Sign In",
      href: "/auth/signin",
      position: "start",
    },
    currentUser && {
      label: "Sign Out",
      href: "/auth/signout",
      position: "end",
    },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href, position }) => {
      return (
        <li
          key={href}
          className={`nav-item ${position === "start" ? "me-auto" : "ms-auto"}`}
        >
          <Link href={href} className="nav-link">
            {label}
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light bg-light">
      <a
        href="/"
        className="navbar-brand"
        style={{ marginLeft: "var(--bs-navbar-brand-margin-end)" }}
      >
        GitTix
      </a>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};

export default Header;
