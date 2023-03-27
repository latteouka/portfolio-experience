const Sub = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="experience-sub-wrap">
      <div className="experience-sub">{children}</div>
    </div>
  );
};

const Sub2 = ({ children }: { children: React.ReactNode }) => {
  return <div className="experience-sub2">{children}</div>;
};

const AnimationWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="animation-wrap-mask">
      <div className="animation-wrap">{children}</div>
    </div>
  );
};

export { Sub, Sub2, AnimationWrapper };
