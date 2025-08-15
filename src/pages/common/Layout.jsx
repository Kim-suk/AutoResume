// src/components/common/Layout.jsx

import React from "react";
import Footer from "./Footer";


const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header /> // 필요하면 사용 */}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
