import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/Button";
import { selectCanvasData } from "../lib/store";

const BasicStyle = {
  color: "#000000",
  border: "2px solid #8ADA33",
  fontSize: "16px",
  padding: "10px 15px",
  borderRadius: "5px",
  width: "350px",
  margin: "10px 0px",
};

export const ProjectSearch = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { isLoading } = useSelector(selectCanvasData) as { isLoading: boolean };

  const getCanvasData = () => {
    const id = inputRef.current?.value;
    dispatch({ type: "GET_CANVAS_DATA", id, isLoading: true });
  };

  return (
    <>
      <input ref={inputRef} defaultValue="" style={BasicStyle} type="text" placeholder="For random leave empty" />
      <Button onClick={getCanvasData} disabled={isLoading}>
        Fetch
      </Button>
    </>
  );
};
