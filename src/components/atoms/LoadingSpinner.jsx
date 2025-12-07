import { Spin } from "antd";
import PropTypes from "prop-types";

function LoadingSpinner({ size = "large", text = "" }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 0" }}>
      <Spin size={size} />
      {text && <p style={{ marginTop: "16px", color: "#696969" }}>{text}</p>}
    </div>
  );
}

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(["small", "default", "large"]),
  text: PropTypes.string,
};

export default LoadingSpinner;
