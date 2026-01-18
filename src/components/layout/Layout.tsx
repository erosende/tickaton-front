
import { type ReactNode } from 'react';
import './Layout.css';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

  const navigate = useNavigate();

  const handleHeaderClick = () => {
    navigate('/')
  }

  return (
    <div className="layout">
      <header className="layout-header">
        <div className="header-content">
          <h1 onClick={handleHeaderClick}>Tick a ton</h1>
        </div>
      </header>

      <main className="layout-main">
        {children}
      </main>

    </div>
  );
};

export default Layout;