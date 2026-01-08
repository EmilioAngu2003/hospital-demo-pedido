import LoadingIcon from "../components/LoadingIcon";

const LoadingView = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <LoadingIcon />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingView;
