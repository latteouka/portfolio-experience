import { useNavbarStore } from "@/store/navbarStore";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Title from "../parts/Title";

const Contact = () => {
  const { setActive } = useNavbarStore();
  const { ref, inView } = useInView({ threshold: 0.9 });

  useEffect(() => {
    if (inView) {
      setActive("CONTACT");
    } else {
      setActive("SKILLS");
    }
  }, [inView, setActive]);
  return (
    <div className="contact-wrap" ref={ref} id="contact">
      <div className="grid-layout">
        <div className="contact-content">
          <Title title="CONTACT" />
          <div className="contact-content-wrap">
            <div className="adv">
              <p>I never stop learning new things.</p>
              <p>I LOVE programming!</p>
            </div>
            <div className="contacts">
              <div className="email">oukalatte@gmail.com</div>
              <div>
                <a
                  href="https://www.instagram.com/latteouka/"
                  className="instagram"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
