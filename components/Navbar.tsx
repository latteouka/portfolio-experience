import Image from "next/image";
import logo from "../public/img/logo.png";
import { useNavbarStore } from "@/store/navbarStore";
import { useEffect } from "react";
import { Param } from "@/gl/core/param";

const Navbar = () => {
  const { active, setActive } = useNavbarStore();

  function scrollTo(target: string) {
    const targetElement = document.querySelector(`.${target}-wrap`);
    setActive(target.toUpperCase());
    Param.instance.main.scroll.value.scrollTo(targetElement);
  }

  useEffect(() => {
    const titles = document.querySelectorAll(".nav-title") as any;

    titles.forEach((title: any) => {
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
            <a href="#about" className="nav-title-about">
              ABOUT
            </a>
          </div>
          <div
            className="nav-title"
            data-title="EXPERIENCE"
            onClick={() => scrollTo("experience")}
          >
            <a href="#experience" className="nav-title-experience">
              EXPERIENCE
            </a>
          </div>
          <div
            className="nav-title"
            data-title="SKILLS"
            onClick={() => scrollTo("skills")}
          >
            <a href="#skills" className="nav-title-skills">
              SKILLS
            </a>
          </div>
          <div
            className="nav-title"
            data-title="CONTACT"
            onClick={() => scrollTo("contact")}
          >
            <a href="#contact" className="nav-title-contact">
              CONTACT
            </a>
          </div>
        </div>
      </div>
      <div className="nav-bottom"></div>
    </>
  );
};
export default Navbar;
