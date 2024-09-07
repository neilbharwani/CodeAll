import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Welcome to Codeall</h1>
      </header>
      <main>{children}</main>
      <footer>© Codeall 2024</footer> 
    </div>
  );
};

export default Layout;
