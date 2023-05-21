import { FormEventHandler, useRef, useState } from "react";
import { Form, TextArea } from "./form-style";
import { DateField, Field } from "../admin-form-field/admin-form-field";
import { tableField } from "../../const/const";
import { SubmitButton } from "../common/submit-button";
import { appendData } from "../../utils/form-utils";
import { getComedianErrorMessages } from "../../utils/validation/comedian-form-validation";
import { FormDataItemCC } from "../../store/form-data-api";
import { setDataError } from "../../utils/error-utils";
import { DataErrorType, ErrorDataFieldType, OptionType } from "../../types/types";
import { UserErrorsBlock } from "../user-errors-block/user-errors-block";
import { InputWithList } from "../input-with-list/input-with-list";
import { ImageField } from "../image-field/image-field";
import { useAddMainContentMutation } from "../../store/post-form-api";


type ComedianFormProps = {
  countries: FormDataItemCC[]
}


export function ComedianForm ({countries}: ComedianFormProps)  {

  const formRef = useRef<HTMLFormElement|null>(null);
  const [chosenCountry, setCountry] = useState<OptionType|null>({id: '1', name: 'Australia'});
  // const [chosenCountry, setCountry] = useState<OptionType|null>(null);

  const [birthDate, setBirthDate] = useState<Date|null>(null);
  const [deathDate, setDeathDate] = useState<Date|null>(null);

  // const [isPic, setPic] = useState(false);
  const [isPic, setPic] = useState(true);


  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState<ErrorDataFieldType>({errorIndexes:[],errorMessages:[]});

  const [addMainContent] = useAddMainContentMutation();

  const resetForm = () => {
    formRef.current?.reset();
    setCountry(null);
    setBirthDate(null)
    setDeathDate(null)
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
    const errorData = getComedianErrorMessages({formData, countries});

    if (errorData.errorMessages.length) {
      setErrors(errorData);
      setDisabled(false);
    } else {
      try {
        await addMainContent({body: formData, dir: 'comedians'}).unwrap()
        resetForm();
      } catch (err) {
        setDataError({ setErrors, data: err as DataErrorType })
        setDisabled(false);
      }
    }



    // console.log(Object.fromEntries(formData))

  }
  const errorBlock = <UserErrorsBlock errors={errors.errorMessages} />;
  return (
    <Form action="/" ref={formRef} onSubmit={handleSubmit}>

      <Field
        id={tableField.comedian.comedianNik}
        placeholder="псевдоним"
        errorIndexes={errors.errorIndexes}
        required
      />
      <Field
        id={tableField.comedian.comedianNikEn}
        placeholder="nik name"
        errorIndexes={errors.errorIndexes}
       />
      <br />
      <Field
        id={tableField.comedian.comedianFirstName}
        placeholder="имя"
        errorIndexes={errors.errorIndexes}
      />
      <Field
        id={tableField.comedian.comedianSecondName}
        placeholder="отчество"
        errorIndexes={errors.errorIndexes}
      />
      <Field
        id={tableField.comedian.comedianLastName}
        placeholder="фамилия"
        errorIndexes={errors.errorIndexes}
      />
      <Field
        id={tableField.comedian.comedianFirstNameEn}
        placeholder="first name"
        errorIndexes={errors.errorIndexes}
      />
      <Field
        id={tableField.comedian.comedianSecondNameEn}
        placeholder="second name"
        errorIndexes={errors.errorIndexes}
      />
      <Field
        id={tableField.comedian.comedianLastNameEn}
        placeholder="last name"
        errorIndexes={errors.errorIndexes}
      />
      <br />
      <InputWithList
        id={tableField.events.placeId}
        dataName="страна"
        options={countries}
        setDataValue={setCountry}
        chosenDataValue={chosenCountry}
      />
      <Field
        id={tableField.comedian.comedianCity}
        placeholder="город"
        errorIndexes={errors.errorIndexes}
      />
      <Field
        id={tableField.comedian.comedianCityEn}
        placeholder="city"
        errorIndexes={errors.errorIndexes}
      />
      <br />
      <ImageField setPic={setPic} isPic={isPic}/>

      <br />
      <TextArea
        name={tableField.comedian.comedianDescription}
        placeholder="описание"
        // defaultValue="test + "
      />
      <br/>

      <DateField id={tableField.comedian.comedianDateBirth} date={birthDate} setDate={setBirthDate} label="Дата рождения"/>
      <DateField id={tableField.comedian.comedianDateDeath} date={deathDate} setDate={setDeathDate} label="Дата смерти"/>
      {errorBlock}
      <SubmitButton disabled={disabled}> Добавить</SubmitButton>
    </Form>
  )
}
