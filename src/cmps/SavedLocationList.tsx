import { IssDataType } from "@/types";
import { SavedLocationPreview } from "./SavedLocationPreview";

type Props = {
  savedIssList: IssDataType[];
  selectedSavedIssId: number | null;
  handleSavedIssDataClick: (savedIssData: IssDataType) => void;
  handleDeleteIss: (ev: React.MouseEvent, issId: number) => void;
};

export const SavedLocationList = ({
  savedIssList,
  selectedSavedIssId,
  handleSavedIssDataClick,
  handleDeleteIss,
}: Props) => {

  return (
    <div className="saved-location-list-container">
      {savedIssList.map((savedIssData, idx) => (
        <SavedLocationPreview
          key={savedIssData._id}
          issDataNum={idx + 1}
          savedIssData={savedIssData}
          selectedSavedIssId={selectedSavedIssId}
          handleSavedIssDataClick={handleSavedIssDataClick}
          handleDeleteIss={handleDeleteIss}
        />
      ))}
    </div>
  );
};
