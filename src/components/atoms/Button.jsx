import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Button({ 
  variant = "gradient", 
  children, 
  href, 
  to,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  ...props 
}) {
  const baseClass = `button button-${variant}`;
  const finalClass = className ? `${baseClass} ${className}` : baseClass;

  if (to) {
    return (
      <Link to={to} className={finalClass} {...props}>
        <span>{children}</span>
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={finalClass} {...props}>
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button 
      type={type} 
      className={finalClass} 
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(["gradient", "outline-green"]),
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
