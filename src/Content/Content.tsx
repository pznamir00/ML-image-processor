import { Route, Routes } from "react-router";
import styles from "./Content.module.scss";
import Datasets from "./Datasets/Datasets";
import NewDataset from "./NewDataset/NewDataset";

export default function Content() {
  return (
    <div data-testid="content" className={styles.content}>
      <Routes>
        <Route path="/datasets/add" element={<NewDataset />} />
        <Route path="/datasets" element={<Datasets />} />
      </Routes>
    </div>
  );
}
