import { AppSidebar } from "@/cmps/AppSidebar";
import { AppWorkboard } from "@/cmps/AppWorkboard";
import { AppSidebarHandles, AppWorkboardHandles, IssDataType } from "@/types";
import { useRef } from "react";

export const Home = () => {
  const appSidebarRef = useRef<AppSidebarHandles>(null);
  const appWorkboardRef = useRef<AppWorkboardHandles>(null);

  const handleSaveClick = (issData: IssDataType) => {
    if (appSidebarRef.current) {
      appSidebarRef.current.handleSaveIss(issData);
    }
  };

  const handleSavedIssDataClick = (savedIssData: IssDataType) => {
    if (appWorkboardRef.current && appSidebarRef.current) {
      const { handleClick } = appWorkboardRef.current;
      const { handleIssClickUpdate } = appSidebarRef.current;
      handleClick(savedIssData, handleIssClickUpdate);
    }
  };

  return (
    <section className="main-home-container">
      <AppSidebar
        ref={appSidebarRef}
        handleSavedIssDataClick={handleSavedIssDataClick}
      />
      <AppWorkboard ref={appWorkboardRef} handleSaveIss={handleSaveClick} />
    </section>
  );
};
