import { FormEventHandler, useRef, useState } from "react";
import { Form, TextArea } from "./form-style";
import { DateField, Field } from "../admin-form-field/admin-form-field";
import { EventStatus, tableField } from "../../const/const";
import { SubmitButton } from "../common/submit-button";
import { InputWithList } from "../input-with-list/input-with-list";
import { DataErrorType, ErrorDataFieldType, OptionType } from "../../types/types";
import { ImageField } from "../image-field/image-field";
import { FormDataItemCC } from "../../store/form-data-api";
import { UserErrorsBlock } from "../user-errors-block/user-errors-block";
import { setDataError } from "../../utils/error-utils";
import { appendData } from "../../utils/form-utils";
import { getEventErrorMessages } from "../../utils/validation/event-form-validation";
import { FormSelect } from "../form-select/form-select";
import { useAddMainContentMutation } from "../../store/post-form-api";



type EventFormProps = {
  places: FormDataItemCC[]
}



const statusOptions = [
  { id: EventStatus.Canceled, name: 'отменено' },
  { id: EventStatus.Ended, name: 'завершено' },
  { id: EventStatus.Planned, name: 'запланировано' },
]

export function EventForm ({ places}: EventFormProps) {

  const formRef = useRef<HTMLFormElement|null>(null);
  const [chosenPlace, setPlace] = useState<OptionType|null>(null);
  const [chosenStatus, setStatus] = useState<OptionType|null>(null);
  const [eventDate, setEventDate] = useState<Date|null>(null);
  const [isPic, setPic] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState<ErrorDataFieldType>({errorIndexes:[],errorMessages:[]});

  const [addContent] = useAddMainContentMutation();

  const resetForm = () => {
    formRef.current?.reset();
    setPlace(null);
    setStatus(null);
    setEventDate(null)
    setPic(false);
    setDisabled(false);
    setErrors({errorIndexes:[],errorMessages:[]});
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async(evt) => {
    evt.preventDefault();

    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);
    appendData(
      formData,
      [chosenPlace, chosenStatus],
      [tableField.events.placeId, tableField.events.eventStatus]
    );

    setDisabled(true)
    const errorData = getEventErrorMessages({formData, places});

    if (errorData.errorMessages.length) {
      setErrors(errorData);
      setDisabled(false);
    } else {
      try {
        await addContent({body: formData, dir: 'events'}).unwrap()
        resetForm();
      } catch (err) {
        setDataError({ setErrors, data: err as DataErrorType })
        setDisabled(false);
      }
    }



    console.log(Object.fromEntries(formData))

  }
  const errorBlock = <UserErrorsBlock errors={errors.errorMessages} />;


  return (
    <Form action="/" ref={formRef} onSubmit={handleSubmit}>

      <Field
        id={tableField.events.eventName}
        placeholder="название события"
        errorIndexes={errors.errorIndexes}
        required
      />
      <Field
        id={tableField.events.eventNameEn}
        placeholder="event name"
        errorIndexes={errors.errorIndexes}
      />
      <br/>
      <InputWithList
        id={tableField.events.placeId}
        dataName="площадка"
        options={places}
        setDataValue={setPlace}
        chosenDataValue={chosenPlace}
      />

      <FormSelect id="event_status" options={statusOptions}/>

      <ImageField setPic={setPic} isPic={isPic}/>
      <br/>
      <TextArea
        name={tableField.events.eventDescription}
        placeholder="описание" />
      <br/>
      <DateField id={tableField.events.eventDate} date={eventDate} setDate={setEventDate} label="дата"/>
      {errorBlock}
      <SubmitButton disabled={disabled}> Добавить</SubmitButton>
    </Form>
  )
}
