import { Select, Spin, Table } from "antd";
import { useEffect } from "react";
import useStoreCleaningOnDestroy from "../../hooks/useStoreCleaningOnDestroy/useStoreCleaningOnDestroy";
import useToastOnError from "../../hooks/useToastOnError/useToastOnError";
import { datasetsActions } from "../../store/datasets/reducer";
import {
  selectDatasets,
  selectDatasetsError,
  selectDatasetsLoading,
} from "../../store/datasets/selectors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { DatasetTypeLabels } from "../../types/dataset-types.enum";
import { Dataset } from "../../types/dataset.type";
import {
  ExportFormatLabels,
  ExportFormats,
} from "../../types/export-formats.enum";
import styles from "./Datasets.module.scss";

export default function Datasets() {
  useStoreCleaningOnDestroy();
  const dispatch = useAppDispatch();
  const datasets = useAppSelector(selectDatasets);
  const loading = useAppSelector(selectDatasetsLoading);
  const error = useAppSelector(selectDatasetsError);
  const notificationHolder = useToastOnError(error, "Failed to load datasets");

  useEffect(() => {
    dispatch(datasetsActions.getDatasets());
  }, [dispatch]);

  const onExport = (dataset: Dataset, type: ExportFormats) => {
    dispatch(datasetsActions.exportDataset({ dataset, type }));
  };

  return (
    <div>
      {notificationHolder}
      {loading ? (
        <Spin />
      ) : (
        <Table
          columns={[
            { title: "ID", dataIndex: "id" },
            { title: "Name", dataIndex: "name" },
            { title: "Type", dataIndex: "type" },
            { title: "Images number", dataIndex: "imagesNumber" },
            { title: "With augmentations", dataIndex: "withAugmentations" },
            { title: "", dataIndex: "actions" },
          ]}
          dataSource={datasets.map((dataset) => ({
            id: dataset.id,
            name: dataset.name,
            type: DatasetTypeLabels[dataset.type],
            imagesNumber: dataset.images.length,
            withAugmentations: dataset.augmentations.length ? "Yes" : "No",
            actions: (
              <Select
                onChange={(type) => onExport(dataset, type)}
                placeholder="Export"
                className={styles.datasets__export}
              >
                {Object.entries(ExportFormatLabels).map(
                  ([value, label], key) => (
                    <Select.Option value={value} key={key}>
                      {label}
                    </Select.Option>
                  ),
                )}
              </Select>
            ),
          }))}
        />
      )}
    </div>
  );
}
