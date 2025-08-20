const SectionDivider = ({
  bgColor = "white",
  flip = false,
  flipColor = "gray",
}) => {
  return (
    <div className="relative w-full overflow-hidden">
      <svg
        className="w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        style={{ backgroundColor: bgColor }}
      >
        {flip ? (
          <path d="M0,0 L100,0 L100,10 L50,5 L0,10 Z" fill={`${flipColor}`} />
        ) : (
          <path d="M0,10 L50,5 L100,10 L100,0 L0,0 Z" fill={`${flipColor}`} />
        )}
      </svg>
    </div>
  );
};

export default SectionDivider;
