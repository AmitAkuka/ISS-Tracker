import {
  API_POLL_INTERVAL,
  DOUBLE_CLICK_THRESHOLD,
} from "./../constants/index";
import { IssDataType } from "@/types";
import { issService } from "./../services/iss.service";
import { useEffect, useRef, useState, useCallback } from "react";
import { getErrorMessage, toastMsg } from "@/utils";

export const useIssData = () => {
  const [issData, setIssData] = useState<IssDataType | null>(null);
  const [isSavedIssDataShown, setIsSavedIssDataShown] =
    useState<boolean>(false);
  const getDataIntervalRef = useRef<null | NodeJS.Timeout>(null);
  const clickCheckIntervalRef = useRef<null | NodeJS.Timeout>(null);


  useEffect(() => {
    if (isSavedIssDataShown) return;
    fetchIssData();
    getDataIntervalRef.current = setInterval(() => {
      fetchIssData();
    }, API_POLL_INTERVAL);

    return () => {
      getDataIntervalRef.current && clearInterval(getDataIntervalRef.current);
    };
  }, [isSavedIssDataShown]);

  const fetchIssData = async () => {
    try {
      const data = await issService.reqIssData();
      setIssData(data);
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      toastMsg(errorMessage, true);
    }
  };

  const handleSavedIssClick = () => {
    let clickCount = 0;
    return useCallback((savedIssData: IssDataType, handleIssClickUpdate: (selectedSavedIssId: number | null) => void) => {
      let savedIssId: null | number = null;
      clickCount++;
      clickCheckIntervalRef.current &&
        clearTimeout(clickCheckIntervalRef.current);
      clickCheckIntervalRef.current = setTimeout(() => {
        if (clickCount === 2) {
          savedIssId = savedIssData._id;
          setIssData(savedIssData);
        }
        setIsSavedIssDataShown(clickCount === 2);
        handleIssClickUpdate(savedIssId);
        clickCount = 0;
      }, DOUBLE_CLICK_THRESHOLD);
    }, []);
  };

  const handleClick = handleSavedIssClick();

  return { issData, isSavedIssDataShown, handleClick };
};
