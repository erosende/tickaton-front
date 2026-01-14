
import { type ReactNode } from 'react';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <header className="layout-header">
        <div className="header-content">
          <h1>Tick a ton</h1>
        </div>
      </header>

      <main className="layout-main">
        {children}
      </main>

      <footer className="layout-footer">
        <p>Desarrollado por Edgar Rosende Gómez</p>
      </footer>
    </div>
  );
};

export default Layout;