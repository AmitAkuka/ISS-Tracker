import { IssDataType } from "@/types";

type Props = {
  issData: IssDataType;
  isSavedIssDataShown: boolean;
};
export const LocationPreview = ({ issData, isSavedIssDataShown }: Props) => {
  const {
    position: { latitude, longitude },
    sampleDateString,
  } = issData;

  return (
    <div className="main-location-preview-container">
      {<h2>🛰️ {isSavedIssDataShown ? "Saved" : "Current"} ISS Data:</h2>}
      <span>
        Latitude: {latitude}, Longitude: {longitude}
      </span>
      <h4>Taken date: {sampleDateString}</h4>
    </div>
  );
};
