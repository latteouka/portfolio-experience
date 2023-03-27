import useUkabu from "@/utils/useUkabu";

interface TitleProps {
  title: string;
}
const Title = ({ title }: TitleProps) => {
  useUkabu(".section-title");
  return (
    <div className="section-title-mask">
      <div className="title section-title">{title}</div>
    </div>
  );
};
export default Title;
