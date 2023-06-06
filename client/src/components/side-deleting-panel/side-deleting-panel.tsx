import { Dispatch, SetStateAction, FormEventHandler, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CommonFieldSet, CommonSideForm, LongButton } from "../common/common-style"
import { useDeleteImagesMutation } from "../../store/images-api";

type SideDeletingPanelProps = {
  idList: string[];
  setIdList: Dispatch<SetStateAction<string[]>>;
  hidden: boolean;
  setHidden: Dispatch<SetStateAction<boolean>>

}

export function SideDeletingPanel({idList, setIdList, hidden, setHidden}: SideDeletingPanelProps) {
  const [deleteImages] = useDeleteImagesMutation();
  const [isSubmitDisable, setSubmitDisable] = useState(true);

  useEffect(() => { setSubmitDisable(!idList.length )}, [idList]) // чтоб при выделении/удалении картинок кнопка блокировалась/разблокировалась

  const handleShowMarkersBtnClick = () => {
    setHidden((prev) => !prev);
  }

  const handleSubmit: FormEventHandler = (evt) => {
    evt.preventDefault();
    if (!idList?.length) {
      toast.warn('Нужно выбрать файлы для удаления')
      return;
    }

    const onSuccess = () => {
      setHidden(false);
      setIdList([]);
    }
    const onAnyCase = () => setSubmitDisable(false)
    const onError = () => toast.error('Не удалось удалить файлы. Пробуйте позже');

    deleteImages({indexes: idList})
      .then(onSuccess)
      .catch(onError)
      .finally(onAnyCase)
  }

  return (
    <CommonSideForm onSubmit={handleSubmit}>
      <CommonFieldSet>
      <legend>Удаление файлов</legend>
      <LongButton type="button" onClick={handleShowMarkersBtnClick}>
        {
          hidden ? 'Добавить файлы для удаления' : 'Скрыть файлы для удаления'
        }

      </LongButton>
      <LongButton type="submit" disabled={isSubmitDisable || hidden}>Удалить выбранные файлы</LongButton>
      </CommonFieldSet>
    </CommonSideForm>
  )
}
