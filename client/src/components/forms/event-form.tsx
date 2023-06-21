import { FormEventHandler, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, TextArea } from "./form-style";
import { DateField, Field } from "../admin-form-field/admin-form-field";
import { statusOptions, tableField } from "../../const/const";
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
import { useAddMainContentMutation, useChangeMainContentMutation } from "../../store/post-form-api";
import { EventState } from "../../types/event-types";
import { getOption, getStatusOption } from "../../utils/utils";
import { getDateFromString } from "../../utils/date-utils";


type EventFormProps = {
  places: FormDataItemCC[],
  state?: EventState
}

export function EventForm ({places, state}: EventFormProps) {

  const formRef = useRef<HTMLFormElement|null>(null);
  const navigate = useNavigate();

  const statePlaceOption = getOption(state?.placeId, state?.placeName)
  const stateStatusOption = getStatusOption(state?.eventStatus)


  const [chosenPlace, setPlace] = useState<OptionType|null>(statePlaceOption);
  const [chosenStatus, setStatus] = useState<OptionType|null>(stateStatusOption); //! !
  const [eventDate, setEventDate] = useState<Date|null|undefined>(getDateFromString(state?.eventDate));

  const [isPic, setPic] = useState( !!state?.mainPicture);
  const [isPicChanged, setPicChanged] = useState(false);


  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState<ErrorDataFieldType>({errorIndexes:[],errorMessages:[]});

  const [addContent] = useAddMainContentMutation();
  const [changeContent] = useChangeMainContentMutation();


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

    if (isPicChanged) {
      formData.append('isPicChanged', 'true')
    }
    appendData(
      formData,
      [chosenPlace],
      [tableField.events.placeId]
    );

    setDisabled(true)
    const errorData = getEventErrorMessages({formData, places});

    if (errorData.errorMessages.length) {
      setErrors(errorData);
      setDisabled(false);
      return;
    }
    try {
      if (state) {
        await changeContent({body: formData, dir: 'events', id: state.eventId}).unwrap();
        navigate(`/events/${state.eventId}/info`);
      } else {
        await addContent({body: formData, dir: 'events'}).unwrap()
        toast.info('новое событие добавлено')
      }
      resetForm();
    } catch (err) {
      setDataError({ setErrors, data: err as DataErrorType })
      setDisabled(false);
    }
  }

  const errorBlock = <UserErrorsBlock errors={errors.errorMessages} />;

  const submitText = state ? 'Внести изменения' : 'Добавить';


  return (
    <Form action="/" ref={formRef} onSubmit={handleSubmit}>

      <Field
        id={tableField.events.eventName}
        placeholder="название события"
        errorIndexes={errors.errorIndexes}
        stateValue={state?.eventName}
        required
      />
      <Field
        id={tableField.events.eventNameEn}
        placeholder="event name"
        errorIndexes={errors.errorIndexes}
        stateValue={state?.eventNameEn}
      />
      <br/>
      <InputWithList
        id={tableField.events.placeId}
        dataName="площадка"
        options={places}
        setDataValue={setPlace}
        chosenDataValue={chosenPlace}
      />

      <FormSelect id="event_status" options={statusOptions} option={chosenStatus} setOption={setStatus}/>

      <ImageField setPic={setPic} isPic={isPic} statePicture={state?.mainPicture} setPicChanged={setPicChanged}/>

      <br/>
      <TextArea
        name={tableField.events.eventDescription}
        placeholder="описание"
        defaultValue={state?.eventDescription}
      />
      <br/>
      <DateField id={tableField.events.eventDate} date={eventDate} setDate={setEventDate} label="дата"/>
      {errorBlock}
      <SubmitButton disabled={disabled}> {submitText}</SubmitButton>
    </Form>
  )
}
