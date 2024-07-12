import { Route, Routes } from "react-router";
import Datasets from "./Datasets/Datasets";
import Home from "./Home/Home";
import NewDataset from "./NewDataset/NewDataset";

export default function Content() {
  return (
    <div data-testid="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/datasets/add" element={<NewDataset />} />
        <Route path="/datasets" element={<Datasets />} />
      </Routes>
    </div>
  );
}
