import { useNavbarStore } from "@/store/navbarStore";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Contact = () => {
  const { setActive } = useNavbarStore();
  const { ref, inView } = useInView({ threshold: 0.4 });
  useEffect(() => {
    if (inView) {
      setActive("CONTACT");
    }
  }, [inView, setActive]);
  return (
    <div className="contact-wrap" ref={ref}>
      <div></div>
      <div></div>
    </div>
  );
};
export default Contact;
