import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import '../styles/MainLayout.scss';
import Navbar from '../components/Navbar/Navbar';

function MainLayout() {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="layout-content">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default MainLayout;
