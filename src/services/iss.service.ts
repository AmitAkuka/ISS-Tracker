import { ISS_API_URL, STORAGE_KEY } from "@/constants";
import { IssDataType } from "@/types";
import { storageService } from "./storage.service";
export const issService = {
  reqIssData,
  saveIssData,
  getSavedIssData,
};

type ApiData = {
  message: string;
  timestamp: number;
  iss_position: {
    latitude: string;
    longitude: string;
  };
};

async function reqIssData() {
  try {
    const res = await fetch(ISS_API_URL);
    const data = await res.json();
    const issData: IssDataType = _normalizeIssData(data);
    return issData;
  } catch (err) {
    throw new Error("Failed to fetch ISS data");
  }
}

function saveIssData(issDataToSave: IssDataType[]) {
  storageService.save(STORAGE_KEY, issDataToSave);
}

function getSavedIssData() {
  return storageService.load(STORAGE_KEY);
}

function _normalizeIssData(apiData: ApiData) {
  const {
    timestamp,
    iss_position: { latitude, longitude },
  } = apiData;
  const sampleDateString = new Date(timestamp * 1000).toUTCString();
  return {
    _id: timestamp,
    position: {
      latitude,
      longitude,
    },
    sampleDateString,
  };
}
