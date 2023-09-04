import { IssDataType } from "@/types";

type Props = {
  savedIssData: IssDataType;
  issDataNum: number;
  selectedSavedIssId: number | null;
  handleSavedIssDataClick: (savedIssData: IssDataType) => void;
  handleDeleteIss: (ev: React.MouseEvent, issId: number) => void;
};

export const SavedLocationPreview = ({
  savedIssData,
  issDataNum,
  selectedSavedIssId,
  handleSavedIssDataClick,
  handleDeleteIss,
}: Props) => {
  const {
    _id,
    position: { latitude, longitude },
    sampleDateString,
  } = savedIssData;

  const isSelected = selectedSavedIssId === _id;
  return (
    <div
      className={`saved-location-preview ${isSelected ? "selected" : ""}`}
      onClick={() => handleSavedIssDataClick(savedIssData)}
    >
      {!isSelected && <button className="delete-btn" onClick={(ev) => handleDeleteIss(ev, _id)}>
        ❌
      </button>}
      <h2>Saved ISS Data {issDataNum}</h2>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      <h4>{sampleDateString}</h4>
    </div>
  );
};
