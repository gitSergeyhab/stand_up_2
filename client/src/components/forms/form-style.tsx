import ReactDatePicker from "react-datepicker";
import styled from "styled-components";

export const Form = styled.form.attrs({method: "POST", enctype: "multipart/form-data"})`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 20rem;
  width: 100%;
`;

export const Line = styled.hr`
  width: 100%;
`;


export const AdminInput = styled.input<{error?: boolean}>`
  width: 100%;
  line-height: 1rem;
  color: ${({ error }) => error ? 'red' : '#000000'};
  border-color: ${({ error }) => error ? 'red' : '#000000'};
  transition: 0.3s all ease-in-out;
  padding-right: 1.2rem;

  &:focus {
    outline: 2px solid #000;
    border-color: #000;
    color: #000;
  }

  &:focus~ul {
    display: block;
    width: 100%;
  }
`;

export const DateInput = styled(ReactDatePicker)`
  width: 100%;
`

export const AdminInputLabel = styled.label`
  position: relative;
`

export const AdminRequiredSpan = styled.span`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
`

export const ErrorFieldSpan = styled.span`
  color: #FFF;
  font-weight: 700;
  background-color: #4d0303;
  width: 100%;
`

export const Option = styled.option`
  width: 100%;
`
export const Datalist = styled.datalist`
width: 300px;
  /* width: 100%; */
`
export const OptionList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid #000;
  position: absolute;
  width: 100%;
  z-index: 2;
  background-color: #000;
  color: #FFF;
  top: 1.7rem;
  max-height: 6rem;
  overflow-y: scroll;
  display: none;
  &:active {
    display: block;
  }


`;

export const InputWithListDiv = styled.div`
  position: relative;
`

export const OptionButton = styled.button.attrs({type: 'button'})`
  background-color: #FFF;
  width: 100%;
`
export const ChosenDataDiv = styled.div`
  display: flex;
  justify-content: space-between;
`


export const TextArea = styled.textarea`
  width: 100%;
  height: 4rem;
  resize: vertical
`
