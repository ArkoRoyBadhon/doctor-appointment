const Loader = ({ isSmall }: { isSmall?: boolean }) => {
  return (
    <div
      className={` animate-spin ${
        isSmall ? "h-4 w-4 border-2" : "h-8 w-8 border-4"
      } border-t-violet-600 rounded-full`}
    ></div>
  );
};

export default Loader;
