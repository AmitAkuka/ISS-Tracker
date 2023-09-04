import { useIssData } from "@/hooks/useIssData";
import { AppLoader } from "./AppLoader";
import { LocationPreview } from "./LocationPreview";
import { IssDataType, AppWorkboardHandles } from "@/types";
import { forwardRef, useImperativeHandle } from "react";
import pokeBallImg from "@/assets/img/pokeball.gif";

type Props = {
  handleSaveIss: (issData: IssDataType) => void;
};

export const AppWorkboard = forwardRef<AppWorkboardHandles, Props>(
  ({ handleSaveIss }, ref) => {
    const { issData, isSavedIssDataShown, handleClick } = useIssData();

    useImperativeHandle(
      ref,
      () => ({
        handleClick,
      }),
      [handleClick]
    );

    return (
      <div className="main-app-workboard-container">
        {!issData && <AppLoader />}
        {issData && (
          <>
            <LocationPreview
              issData={issData}
              isSavedIssDataShown={isSavedIssDataShown}
            />
            {!isSavedIssDataShown && (
              <img
                className="save-location-img"
                src={pokeBallImg}
                alt="save-location-img"
                onClick={() => handleSaveIss(issData)}
              />
            )}
          </>
        )}
      </div>
    );
  }
);
