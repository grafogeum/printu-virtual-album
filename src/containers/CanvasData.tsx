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

const withErrorAndLoading = (WrappedComponent: React.ComponentType<{ canvasData: CanvasData }>) => {
  return (props: Record<string, unknown>) => {
    const { data, error, isLoading } = useSelector(selectCanvasData) as WrappedCanvasData;

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (Object.keys(data).length === 0) {
      return <>Empty</>;
    }

    if (isValidData(data)) {
      return <WrappedComponent {...props} canvasData={data as CanvasData} />;
    } else {
      return <div>Error: 🙅🏻‍♂️Bad data</div>;
    }
  };
};

export const CanvasDataContainer = withErrorAndLoading(AlbumRenderer);
