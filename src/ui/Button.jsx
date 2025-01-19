import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className,
  disabled = false,
  icon: Icon,
}) {
  // Base styles
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Variants (utilisation des couleurs Tailwind configurées)
  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-light focus:ring-primary-light disabled:bg-neutral-light",
    secondary:
      "bg-secondary text-white hover:bg-secondary-light focus:ring-secondary-light disabled:bg-neutral-light",
    danger:
      "bg-danger text-white hover:bg-danger-dark focus:ring-danger-dark disabled:bg-neutral-light",
    neutral:
      "bg-neutral text-white hover:bg-neutral-dark focus:ring-neutral-dark disabled:bg-neutral-light",
  };

  // Sizes (gestion des tailles)
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Combine styles
  const buttonStyles = classNames(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  return (
    <button
      onClick={onClick}
      className={buttonStyles}
      disabled={disabled}
    >
      {Icon && <Icon className="mr-2 w-5 h-5" />}
      {children}
    </button>
  );
}

// PropTypes for type checking
Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "neutral"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.elementType, // Pour accepter les icônes
};

export default Button;
