import { FormEventHandler, useRef, useState } from "react";
import { Form, TextArea } from "./form-style";
import { DateField, Field } from "../admin-form-field/admin-form-field";
import { tableField } from "../../const/const";
import { SubmitButton } from "../common/submit-button";
import { useAddMainContentMutation } from "../../store/post-form-api";
import { appendData } from "../../utils/form-utils";
import { getPlaceErrorMessages } from "../../utils/validation/place-form-validation";
import { FormDataItemCC } from "../../store/form-data-api";
import { UserErrorsBlock } from "../user-errors-block/user-errors-block";
import { setDataError } from "../../utils/error-utils";
import { DataErrorType, ErrorDataFieldType, OptionType } from "../../types/types";
import { InputWithList } from "../input-with-list/input-with-list";
import { ImageField } from "../image-field/image-field";


type PlaceFormProps = {
  countries: FormDataItemCC[]
}
export function PlaceForm ({countries}: PlaceFormProps) {

  const formRef = useRef<HTMLFormElement|null>(null)

  const [chosenCountry, setCountry] = useState<OptionType|null>(null);
  const [dateFounded, setDateFounded] = useState<Date|null>(null);
  const [dateClosed, setDateClosed] = useState<Date|null>(null);

  const [isPic, setPic] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState<ErrorDataFieldType>({errorIndexes:[],errorMessages:[]});

  const [addContent] = useAddMainContentMutation();

  const resetForm = () => {
    formRef.current?.reset();
    setCountry(null);
    setDateFounded(null);
    setDateClosed(null);
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
      [chosenCountry],
      [tableField.comedian.countryId]
    );

    setDisabled(true)
    const errorData = getPlaceErrorMessages({formData, countries});

    if (errorData.errorMessages.length) {
      setErrors(errorData);
      setDisabled(false);
    } else {
      try {
        await addContent({body: formData, dir: 'places'}).unwrap()
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
        id={tableField.places.placeName}
        placeholder="название площадки"
        errorIndexes={errors.errorIndexes}
        required
      />
      <Field
        id={tableField.places.placeNameEn}
        placeholder="place name"
        errorIndexes={errors.errorIndexes}
      />
      <br />
      <InputWithList
        id={tableField.places.placeId}
        dataName="страна"
        options={countries}
        setDataValue={setCountry}
        chosenDataValue={chosenCountry}
      />
      <Field
        id={tableField.places.placeCity}
        placeholder="город"
        errorIndexes={errors.errorIndexes}
      />
      <Field
        id={tableField.places.placeCityEn}
        placeholder="city"
        errorIndexes={errors.errorIndexes}
      />
      <br />
      {/* <Field id={tableField.places.placeActive} placeholder="действует"/>!!!
      <br /> */}
      <ImageField setPic={setPic} isPic={isPic}/>
      <br />
      <TextArea
        name={tableField.places.placeDescription}
        placeholder="описание" />
      <br/>
      <DateField id={tableField.places.placeDateFounded} date={dateFounded} setDate={setDateFounded} label="основан"/>
      <DateField id={tableField.places.placeDateClosed} date={dateClosed} setDate={setDateClosed} label="закрыт"/>

      {errorBlock}
      <SubmitButton disabled={disabled}> Добавить</SubmitButton>
    </Form>
  )
}
