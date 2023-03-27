import Navbar from "./Navbar";
import useLenis from "@/utils/useLenis";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  useLenis();

  return (
    <div className="main-container">
      <div className="sticky-content pseudo"></div>
      <div className="sticky-content">
        <Navbar />
      </div>
      <div className="scroll-content">{children}</div>
    </div>
  );
};
export default Layout;
