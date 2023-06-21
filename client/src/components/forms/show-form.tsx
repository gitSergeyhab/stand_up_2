import { FormEventHandler, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, TextArea } from "./form-style";
import { DateField, Field } from "../admin-form-field/admin-form-field";
import { tableField } from "../../const/const";
import { SubmitButton } from "../common/submit-button";
import { InputWithList } from "../input-with-list/input-with-list";
import { DataErrorType, ErrorDataFieldType, OptionType } from "../../types/types";
import { ImageField } from "../image-field/image-field";
import { FormDataItemCC } from "../../store/form-data-api";
import { getShowErrorMessages } from "../../utils/validation/show-form-validation";
import { UserErrorsBlock } from "../user-errors-block/user-errors-block";
import { setDataError } from "../../utils/error-utils";
import { appendData } from "../../utils/form-utils";
import { useAddMainContentMutation, useChangeMainContentMutation } from "../../store/post-form-api";
import { ShowState } from "../../types/show-types";
import { getOption } from "../../utils/utils";
import { getDateFromString } from "../../utils/date-utils";



type ShowFormProps = {
  comedians: FormDataItemCC[],
  events: FormDataItemCC[],
  places: FormDataItemCC[],
  languages: FormDataItemCC[],
  state?: ShowState
}



export function ShowForm ({comedians, events, places, languages, state}: ShowFormProps) {

  console.log({state})
  const formRef = useRef<HTMLFormElement|null>(null);
  const navigate = useNavigate();
  const stateComedianOption = getOption(state?.comedianId, state?.comedianNik);
  const stateEventOption = getOption(state?.eventId, state?.eventName);
  const statePlaceOption = getOption(state?.placeId, state?.placeName);
  const stateLanguageOption = getOption(state?.languageId, state?.languageName) ;



  const [chosenComedian, setComedian] = useState<OptionType|null>(stateComedianOption);
  const [chosenPlace, setPlace] = useState<OptionType|null>(statePlaceOption);
  const [chosenEvent, setEvent] = useState<OptionType|null>(stateEventOption);
  const [chosenLanguage, setLanguage] = useState<OptionType|null>(stateLanguageOption);

  const [showDate, setShowDate] = useState<Date|null|undefined>(getDateFromString(state?.showDate));

  const [isPic, setPic] = useState(!!state?.showPicture);
  const [isPicChanged, setPicChanged] = useState(false);


  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState<ErrorDataFieldType>({errorIndexes:[],errorMessages:[]});

  const [addContent] = useAddMainContentMutation()
  const [changeContent] =  useChangeMainContentMutation();


  const resetForm = () => {
    formRef.current?.reset();
    setComedian(null);
    setPlace(null);
    setEvent(null);
    setShowDate(null)
    setPic(false);
    setLanguage(null);
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
      [chosenComedian, chosenPlace, chosenEvent, chosenLanguage],
      [tableField.shows.comedianId, tableField.shows.placeId, tableField.shows.eventId, tableField.shows.languageId]
    );

    setDisabled(true)
    const errorData = getShowErrorMessages({formData, comedians, events, languages, places});

    if (errorData.errorMessages.length) {
      setErrors(errorData);
      setDisabled(false);
      return;
    }
    try {
      if (state) {
        await changeContent({body: formData, dir: 'shows', id: state.showId}).unwrap();
        navigate(`/shows/${state.showId}/info`);
      } else {
        await addContent({body: formData, dir: 'shows'}).unwrap();
        toast.info('новое выступление добавлено')
      }
      resetForm();
    } catch (err) {
      setDataError({ setErrors, data: err as DataErrorType })
      setDisabled(false);
    }




    console.log(Object.fromEntries(formData))

  }
  const errorBlock = <UserErrorsBlock errors={errors.errorMessages} />;
  const submitText = state ? 'Внести изменения' : 'Добавить';

  return (
    <Form action="/" ref={formRef} onSubmit={handleSubmit}>

      <Field
        id={tableField.shows.showName}
        placeholder="название шоу"
        errorIndexes={errors.errorIndexes}
        stateValue={state?.showName}
        required
      />
      <Field
        id={tableField.shows.showNameEn}
        placeholder="show name"
        errorIndexes={errors.errorIndexes}
        stateValue={state?.showNameEn}
      />
      <br/>

      <InputWithList
        id={tableField.shows.comedianId}
        dataName="комик"
        options={comedians}
        setDataValue={setComedian}
        chosenDataValue={chosenComedian}
        required
      />

      <InputWithList
        id={tableField.shows.eventId}
        dataName="событие"
        options={events}
        setDataValue={setEvent}
        chosenDataValue={chosenEvent}
      />


      <InputWithList
        id={tableField.shows.placeId}
        dataName="площадка"
        options={places}
        setDataValue={setPlace}
        chosenDataValue={chosenPlace}
      />

      <InputWithList
        id={tableField.shows.languageId}
        dataName="язык"
        options={languages}
        setDataValue={setLanguage}
        chosenDataValue={chosenLanguage}
      />

      <br/>
      <ImageField statePicture={state?.showPicture} setPicChanged={setPicChanged} setPic={setPic} isPic={isPic}/>

      <br/>
      <TextArea
        name={tableField.shows.showDescription}
        placeholder="описание !!!"
        defaultValue={state?.showDescription}
      />
      <br/>
      <DateField id={tableField.shows.showDate} date={showDate} setDate={setShowDate} label="дата"/>
      {errorBlock}
      <SubmitButton disabled={disabled}> {submitText}</SubmitButton>
    </Form>
  )
}
