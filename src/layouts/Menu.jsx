import React from "react";
import { NavLink } from "react-router-dom";

const routes = [
  {
    to: "/",
    text: "Inicio",
  },
];

export default function Menu() {
  return (
    <nav>
      <ul>
        {routes.map((route) => (
          <li key={route.to}>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'underline ' : ''
              }
              to={route.to}
            >
              {route.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
