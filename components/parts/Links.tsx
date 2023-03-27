import { IoLogoGithub, IoMdLink } from "react-icons/io";

interface LinksProps {
  link: string;
  github: string;
}

const Links = ({ link, github }: LinksProps) => {
  return (
    <div className="links-wrap">
      {link !== "none" && (
        <div className="links-icon">
          <a href={link} target="_blank">
            <IoMdLink />
          </a>
        </div>
      )}
      {github !== "none" && (
        <div className="links-icon">
          <a href={github} target="_blank">
            <IoLogoGithub />
          </a>
        </div>
      )}
    </div>
  );
};
export default Links;
