import { useEffect } from "react";
import { datasetsActions } from "../../store/datasets/reducer";
import { useAppDispatch } from "../../store/hooks";
import { imagesActions } from "../../store/images/reducer";

export default function useStoreCleaningOnDestroy() {
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(imagesActions.clear());
      dispatch(datasetsActions.clear());
    },
    [dispatch],
  );
}
