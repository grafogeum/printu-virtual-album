import { CanvasDataContainer } from "../containers/CanvasData";
import { ProjectSearch } from "../components";

const HomeScreenStyle = {
  height: "100vh",
  backgroundColor: "#ffffff",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
} as const;

const MainStyle = {
  height: "100%",
  backgroundColor: "#d3d3d3",
};

export const HomeScreen = () => (
  <div style={HomeScreenStyle}>
    <div>
      <ProjectSearch />
    </div>
    <main style={MainStyle}>
      <CanvasDataContainer />
    </main>
  </div>
);
