import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from 'react-router-dom'

function Lien({ href, children, variant = "primary", className, disabled = false }) {
  // Base styles
  const baseStyles = "inline-block font-medium transition underline-offset-4 focus:outline-none";

  // Variants (utilisation des couleurs Tailwind configurées)
  const variants = {
    primary: "text-primary hover:text-primary-light",
    secondary: "text-secondary hover:text-secondary-light",
    danger: "text-danger hover:text-danger-dark",
    neutral: "text-neutral hover:text-neutral-dark",
  };

  // Combine styles
  const linkStyles = classNames(baseStyles, variants[variant], className, {
    "opacity-50 pointer-events-none": disabled,
  });

  return (
    <Link to={href} className={linkStyles}>
      {children}
    </Link>
  );
}

// PropTypes for type checking
Lien.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "neutral"]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Lien;
