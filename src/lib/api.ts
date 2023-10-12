import { CanvasData } from "../constants/types";
import { API_URL } from "../constants/constants";

export const handleFetchError = (error: unknown): void => {
  console.error(error instanceof Error ? `Error occurred: ${error.message}` : `An unknown error occurred`);
};

export const getCanvasData = async (): Promise<CanvasData | void> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const { id } = await response.json();
    return id;
  } catch (error) {
    handleFetchError(error);
  }
};
