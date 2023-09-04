import appLogo from "@/assets/img/pikachu2.png";
import { AppSidebarHandles, IssDataType } from "@/types";
import { SavedLocationList } from "./SavedLocationList";
import { issService } from "@/services/iss.service";
import { toastMsg } from "@/utils";
import {
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
  forwardRef,
  useCallback,
} from "react";

type Props = {
  handleSavedIssDataClick: (savedIssData: IssDataType) => void;
};

export const AppSidebar = forwardRef<AppSidebarHandles, Props>(
  ({ handleSavedIssDataClick }, ref) => {
    const [savedIssList, setSavedIssList] = useState<IssDataType[]>(
      () => issService.getSavedIssData() ?? []
    );
    const [selectedSavedIssId, setSelectedSavedIssId] = useState<number | null>(
      null
    );
    const [issFilter, setIssFilter] = useState("");

    const handleSaveIss = useCallback(
      (issData: IssDataType) => {
        const idx = savedIssList.findIndex(
          (savedIss) => savedIss._id === issData._id
        );
        if (idx > -1) {
          toastMsg("This poistion is already saved", true);
          return;
        }

        setSavedIssList((prevState) => [...prevState, issData]);
        toastMsg("ISS data saved successfuly");
      },
      [savedIssList]
    );

    const handleIssClickUpdate = useCallback(
      (selectedIssId: number | null) => {
        if (selectedSavedIssId === selectedIssId) return;
        setSelectedSavedIssId(selectedIssId);
      },
      [selectedSavedIssId]
    );

    useImperativeHandle(
      ref,
      () => ({
        handleSaveIss,
        handleIssClickUpdate,
      }),
      [handleSaveIss, handleIssClickUpdate]
    );

    const filteredIssList = useMemo(() => {
      if (!issFilter) return savedIssList;
      return savedIssList.filter((savedIssData) => {
        const {
          position: { latitude, longitude },
        } = savedIssData;
        return (
          latitude.indexOf(issFilter) !== -1 ||
          longitude.indexOf(issFilter) !== -1
        );
      });
    }, [issFilter, savedIssList]);

    useEffect(() => {
      issService.saveIssData(savedIssList);
    }, [savedIssList]);

    function handleDeleteIss(ev: React.MouseEvent, issId: number) {
      ev.stopPropagation();
      const idx = savedIssList.findIndex((savedIss) => savedIss._id === issId);
      if (idx === -1) return;
      const savedIssListCopy = JSON.parse(JSON.stringify(savedIssList));
      savedIssListCopy.splice(idx, 1);
      issService.saveIssData(savedIssListCopy);
      setSavedIssList(savedIssListCopy);
      toastMsg("ISS data deleted successfuly");
    }

    return (
      <section className="main-app-sidebar-container">
        <header className="main-sidebar-header-container">
          <img src={appLogo} alt="app-logo" />
          <h1>ISS Tracker</h1>
        </header>
        <input
          type="text"
          placeholder="Search by coordinates here..."
          onChange={({ target }) => setIssFilter(target.value)}
        />
        {!filteredIssList.length && <h2>No saved data found</h2>}
        {!!filteredIssList.length && (
          <SavedLocationList
            savedIssList={filteredIssList}
            selectedSavedIssId={selectedSavedIssId}
            handleSavedIssDataClick={handleSavedIssDataClick}
            handleDeleteIss={handleDeleteIss}
          />
        )}
      </section>
    );
  }
);
