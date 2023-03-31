import Image from "next/image";
import logo from "../public/img/logo.png";
import { useNavbarStore } from "@/store/navbarStore";
import { useEffect } from "react";
import { useLenisStore } from "@/store/lenisStore";

const Navbar = () => {
  const { active, setActive } = useNavbarStore();
  const { lenis } = useLenisStore();

  function scrollTo(target: string) {
    const targetElement = document.querySelector(`.${target}-wrap`);
    setActive(target.toUpperCase());
    lenis?.scrollTo(targetElement);
  }

  useEffect(() => {
    const titles = document.querySelectorAll(".nav-title") as any;

    titles.forEach((title: any, index: number) => {
      if (title.dataset.title === active) {
        title.style.setProperty("--navTitleColor", "#1e293b");
      } else {
        title.style.setProperty("--navTitleColor", "#838383");
      }
    });
  }, [active]);
  return (
    <>
      <div className="nav-logo">
        <div className="nav-logo-wrap">
          <Image width={35} height={35} src={logo} alt="logo" />
          <div className="bigball"></div>
          <div className="smallball"></div>
        </div>
      </div>
      <div className="nav-titles-wrap">
        <div className="nav-titles">
          <div
            className="nav-title"
            data-title="ABOUT"
            onClick={() => scrollTo("about")}
          >
            <a href="#about">ABOUT</a>
          </div>
          <div
            className="nav-title"
            data-title="EXPERIENCE"
            onClick={() => scrollTo("experience")}
          >
            <a href="#experience">EXPERIENCE</a>
          </div>
          <div
            className="nav-title"
            data-title="SKILLS"
            onClick={() => scrollTo("skills")}
          >
            <a href="#skills">SKILLS</a>
          </div>
          <div
            className="nav-title"
            data-title="CONTACT"
            onClick={() => scrollTo("contact")}
          >
            <a href="#contact">CONTACT</a>
          </div>
        </div>
      </div>
      <div className="nav-bottom"></div>
    </>
  );
};
export default Navbar;
