import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/Button";
import { selectCanvasData } from "../lib/store";
import { CanvasData } from "../constants";

const BasicStyle = {
  color: "#000000",
  border: "2px solid #8ADA33",
  fontSize: "16px",
  padding: "10px 15px",
  borderRadius: "5px",
  width: "350px",
  margin: "10px 0px",
};

const CurrentIDInputStyle = {
  ...BasicStyle,
};

export const ProjectSearch = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    isLoading,
    data: { project },
  } = useSelector(selectCanvasData) as { isLoading: boolean; data: Pick<CanvasData, "project"> };

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
      <div>
        {project?.name && <h4>Name: {project.name}</h4>}
        {project?.id && (
          <div>
            <input readOnly style={CurrentIDInputStyle} type="text" value={project.id} />{" "}
          </div>
        )}
      </div>
    </>
  );
};
