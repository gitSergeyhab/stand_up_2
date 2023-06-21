import { FormEventHandler, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
import { useAddMainContentMutation, useChangeMainContentMutation } from "../../store/post-form-api";
import { ComedianState } from "../../types/comedian-types";
import { getDateFromString } from "../../utils/date-utils";


type ComedianFormProps = {
  countries: FormDataItemCC[],
  state?: ComedianState
}


export function ComedianForm ({countries, state}: ComedianFormProps)  {
  console.log({state})

  const formRef = useRef<HTMLFormElement|null>(null);
  const navigate = useNavigate();

  const stateCountryOption = state?.countryId && state.countryName ?
    {id: state.countryId, name: state.countryName} : null;
  const [chosenCountry, setCountry] = useState<OptionType|null>(stateCountryOption);

  const [birthDate, setBirthDate] = useState<Date|null|undefined>(getDateFromString(state?.comedianDateBirth));
  const [deathDate, setDeathDate] = useState<Date|null|undefined>(getDateFromString(state?.comedianDateDeath));

  const [isPic, setPic] = useState(!!state?.mainPicture);
  const [isPicChanged, setPicChanged] = useState(false);



  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState<ErrorDataFieldType>({errorIndexes:[],errorMessages:[]});

  const [addMainContent] = useAddMainContentMutation();
  const [changeContent] =  useChangeMainContentMutation();


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

    if (isPicChanged) {
      formData.append('isPicChanged', 'true')
    }
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
      return;
    }
    try {
      if (state) {
        await changeContent({body: formData, dir: 'comedians', id: state.comedianId}).unwrap();
        navigate(`/comedians/${state.comedianId}/info`);
      } else {
        await addMainContent({body: formData, dir: 'comedians'}).unwrap();
        toast.info('новый комик добавлен')
      }
      resetForm();
    } catch (err) {
      setDataError({ setErrors, data: err as DataErrorType })
      setDisabled(false);
    }

  }
  const submitText = state ? 'Внести изменения' : 'Добавить';
  const errorBlock = <UserErrorsBlock errors={errors.errorMessages} />;
  return (
    <Form action="/" ref={formRef} onSubmit={handleSubmit}>

      <Field
        id={tableField.comedian.comedianNik}
        placeholder="псевдоним"
        errorIndexes={errors.errorIndexes}
        required
        stateValue={state?.comedianNik}
      />
      <Field
        id={tableField.comedian.comedianNikEn}
        placeholder="nik name"
        errorIndexes={errors.errorIndexes}
        stateValue={state?.comedianNikEn}
       />
      <br />
      <Field
        id={tableField.comedian.comedianFirstName}
        placeholder="имя"
        errorIndexes={errors.errorIndexes}
        stateValue={state?.comedianFirstName}
      />
      <Field
        id={tableField.comedian.comedianSecondName}
        placeholder="отчество"
        errorIndexes={errors.errorIndexes}
        stateValue={state?.comedianSecondName}
      />
      <Field
        id={tableField.comedian.comedianLastName}
        placeholder="фамилия"
        errorIndexes={errors.errorIndexes}
        stateValue={state?.comedianLastName}
      />
      <Field
        id={tableField.comedian.comedianFirstNameEn}
        placeholder="first name"
        errorIndexes={errors.errorIndexes}
        stateValue={state?.comedianFirstNameEn}
      />
      <Field
        id={tableField.comedian.comedianSecondNameEn}
        placeholder="second name"
        errorIndexes={errors.errorIndexes}
        stateValue={state?.comedianSecondNameEn}

      />
      <Field
        id={tableField.comedian.comedianLastNameEn}
        placeholder="last name"
        errorIndexes={errors.errorIndexes}
        stateValue={state?.comedianLastNameEn}
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
        stateValue={state?.comedianCity}

      />
      <Field
        id={tableField.comedian.comedianCityEn}
        placeholder="city"
        errorIndexes={errors.errorIndexes}
        stateValue={state?.comedianCityEn}
      />
      <br />
      <ImageField statePicture={state?.mainPicture} setPicChanged={setPicChanged} setPic={setPic} isPic={isPic}/>

      <br />
      <TextArea
        name={tableField.comedian.comedianDescription}
        placeholder="описание"
        defaultValue={state?.comedianDescription}
      />
      <br/>

      <DateField id={tableField.comedian.comedianDateBirth} date={birthDate} setDate={setBirthDate} label="Дата рождения"/>
      <DateField id={tableField.comedian.comedianDateDeath} date={deathDate} setDate={setDeathDate} label="Дата смерти"/>
      {errorBlock}
      <SubmitButton disabled={disabled}> {submitText}</SubmitButton>
    </Form>
  )
}
