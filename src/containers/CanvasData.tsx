import { useSelector } from "react-redux";
import { selectCanvasData } from "../lib/store";
import { AlbumRenderer } from "../components/AlbumRenderer";
import { CanvasData } from "../constants/types";
import { isValidData } from "../helpers/helpers";

type WrappedCanvasData = {
  data: CanvasData | {};
  error: Error | null;
  isLoading: boolean;
};

export const CanvasDataContainer = () => {
  const { data, error, isLoading } = useSelector(selectCanvasData) as WrappedCanvasData;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (Object.keys(data).length === 0) {
    return <>Empty</>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isValidData(data)) {
    return <AlbumRenderer canvasData={data as CanvasData} />;
  } else {
    return <div>Error: 🙅🏻‍♂️Bad data</div>;
  }
};
