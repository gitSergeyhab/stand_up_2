import { FormEventHandler, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Form, TextArea } from "./form-style";
import { DateField, Field } from "../admin-form-field/admin-form-field";
import { tableField } from "../../const/const";
import { SubmitButton } from "../common/submit-button";
import { useAddMainContentMutation, useChangeMainContentMutation } from "../../store/post-form-api";
import { appendData } from "../../utils/form-utils";
import { getPlaceErrorMessages } from "../../utils/validation/place-form-validation";
import { UserErrorsBlock } from "../user-errors-block/user-errors-block";
import { setDataError } from "../../utils/error-utils";
import { DataErrorType, ErrorDataFieldType, OptionType } from "../../types/types";
import { InputWithList } from "../input-with-list/input-with-list";
import { ImageField } from "../image-field/image-field";
import { PlaceState } from "../../types/place-types";
import { getDateFromString } from "../../utils/date-utils";
import { getOption } from "../../utils/utils";
import { getCountries } from "../../store/preload-reducer/preload-selectors";


type PlaceFormProps = {
  state?: PlaceState
}
export function PlaceForm ({state}: PlaceFormProps) {


  const countries = useSelector(getCountries);
  const formRef = useRef<HTMLFormElement|null>(null);
  const navigate = useNavigate();

  const stateCountryOption = getOption(state?.countryId, state?.countryName)

  const [chosenCountry, setCountry] = useState<OptionType|null>(stateCountryOption);
  const [dateFounded, setDateFounded] = useState<Date|null|undefined>(getDateFromString(state?.placeDateFounded));
  const [dateClosed, setDateClosed] = useState<Date|null|undefined>(getDateFromString(state?.placeDateClosed));

  const [isPic, setPic] = useState( !!state?.mainPicture);
  const [isPicChanged, setPicChanged] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState<ErrorDataFieldType>({errorIndexes:[],errorMessages:[]});

  const [addContent] =  useAddMainContentMutation();
  const [changeContent] =  useChangeMainContentMutation();

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
    if (isPicChanged) {
      formData.append('isPicChanged', 'true')
    }
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
      return;
    }

    try {
      if (state) {
        console.log(Object.fromEntries(formData), 'Object.fromEntries(formData) - state')
        await changeContent({body: formData, dir: 'places', id: state.placeId}).unwrap();
        navigate(`/places/${state.placeId}/info`);
      } else {
        console.log(Object.fromEntries(formData), 'Object.fromEntries(formData) - NO state')
        await addContent({body: formData, dir: 'places'}).unwrap()
        toast.info('новая площадка добавлена')
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
        id={tableField.places.placeName}
        placeholder="название площадки"
        errorIndexes={errors.errorIndexes}
        stateValue={state?.placeName}
        required
      />
      <Field
        id={tableField.places.placeNameEn}
        placeholder="place name"
        errorIndexes={errors.errorIndexes}
        stateValue={state?.placeNameEn}
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
        stateValue={state?.placeCity}
      />
      <Field
        id={tableField.places.placeCityEn}
        placeholder="city"
        errorIndexes={errors.errorIndexes}
        stateValue={state?.placeCityEn}
      />
      <br />
      <ImageField setPic={setPic} isPic={isPic} statePicture={state?.mainPicture} setPicChanged={setPicChanged}/>
      <br />
      <TextArea
        defaultValue={state?.placeDescription}
        name={tableField.places.placeDescription}
        placeholder="описание" />
      <br/>
      <DateField id={tableField.places.placeDateFounded} date={dateFounded} setDate={setDateFounded} label="основан"/>
      <DateField id={tableField.places.placeDateClosed} date={dateClosed} setDate={setDateClosed} label="закрыт"/>

      {errorBlock}
      <SubmitButton disabled={disabled}>
        {submitText}
      </SubmitButton>
    </Form>
  )
}
