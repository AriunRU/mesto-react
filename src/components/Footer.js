import React from "react";

function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {date} Kirill Golovin</p>
    </footer>
  )
}

export default Footer
