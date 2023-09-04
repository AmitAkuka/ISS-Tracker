import appLoader from "@/assets/img/pikachu-loader.gif";
export const AppLoader = () => {
  return (
    <div className="main-app-loader-container">
      <img src={appLoader} alt="app-loader" />
    </div>
  );
};
