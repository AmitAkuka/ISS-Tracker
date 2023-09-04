export type ComponentRoute = {
  path: string;
  component: React.ComponentType;
};

export type IssDataType = {
  _id: number;
  position: {
    latitude: string;
    longitude: string;
  };
  sampleDateString: string;
};

export type AppSidebarHandles = {
  handleSaveIss: (issData: IssDataType) => void;
  handleIssClickUpdate: (selectedSavedIssId: number | null) => void;
};

export type AppWorkboardHandles = {
  handleClick: (
    savedIssData: IssDataType,
    handleIssClickUpdate: (selectedSavedIssId: number | null) => void
  ) => void;
};
