import Cursor from "./Cursor";
import Loading from "./Loading";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="main-container">
      <Cursor />
      <Loading />

      <div className="sticky-content pseudo"></div>
      <div className="sticky-content">
        <Navbar />
      </div>
      <div className="scroll-content">{children}</div>
    </div>
  );
};
export default Layout;
