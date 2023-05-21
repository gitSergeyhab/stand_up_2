import { FormEventHandler, useRef, useState } from "react";
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
import { useAddMainContentMutation } from "../../store/post-form-api";



type ShowFormProps = {
  comedians: FormDataItemCC[],
  events: FormDataItemCC[],
  places: FormDataItemCC[]
  languages: FormDataItemCC[]
}

export function ShowForm ({comedians, events, places, languages}: ShowFormProps) {

  const formRef = useRef<HTMLFormElement|null>(null);
  const [chosenComedian, setComedian] = useState<OptionType|null>(null);
  const [chosenPlace, setPlace] = useState<OptionType|null>(null);
  const [chosenEvent, setEvent] = useState<OptionType|null>(null);
  const [chosenLanguage, setLanguage] = useState<OptionType|null>(null);
  const [showDate, setShowDate] = useState<Date|null>(null);
  const [isPic, setPic] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState<ErrorDataFieldType>({errorIndexes:[],errorMessages:[]});

  const [addContent] = useAddMainContentMutation()

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
    } else {
      try {
        await addContent({body: formData, dir: 'shows'}).unwrap()
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
        id={tableField.shows.showName}
        placeholder="название шоу"
        errorIndexes={errors.errorIndexes}
        required
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
      <ImageField setPic={setPic} isPic={isPic}/>
      <br/>
      <TextArea
        name={tableField.shows.showDescription}
        placeholder="описание !!!" />
      <br/>
      <DateField id={tableField.shows.showDate} date={showDate} setDate={setShowDate} label="дата"/>
      {errorBlock}
      <SubmitButton disabled={disabled}> Добавить</SubmitButton>
    </Form>
  )
}
