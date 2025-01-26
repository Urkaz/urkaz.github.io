import { NavLink } from "react-router-dom";

export function NavMenu({ children }) {
    return (<>
        <nav id="navmenu" className="navmenu">
            <ul>
                {children}
            </ul>
        </nav>
    </>);
}

export function NavItem({ to, children }) {
    return (<><li><NavLink to={to}>{children}</NavLink></li></>);
}