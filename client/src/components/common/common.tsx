import { ActionButton, LogRegLink, LogRegP } from './common-style';

type LogRegMessageProps = {
  question: string;
  offer: string;
  to: string;
};
export function LogRegMessage({ offer, question, to }: LogRegMessageProps) {
  return (
    <LogRegP>
      {question}
      <LogRegLink to={to}> {offer}</LogRegLink>
    </LogRegP>
  );
}

type BtnProps = {
  onClick: () => void;
  disabled?: boolean
}

type ProtoBtnProps = BtnProps & {sign: string}

export function ActionBtn({onClick, sign, disabled=false}: ProtoBtnProps) {
  return <ActionButton disabled={disabled} onClick={onClick}>{sign}</ActionButton>
}

export function CloseBtn({onClick, disabled}: BtnProps) {
  return <ActionBtn sign='✘' disabled={disabled} onClick={onClick}/>
}

export function SettingBtn({onClick, disabled}: BtnProps) {
  return <ActionBtn sign='⚙' disabled={disabled} onClick={onClick}/>
}

export function HideBtn({onClick, disabled}: BtnProps) {
  return <ActionBtn sign='-' disabled={disabled} onClick={onClick}/>
}
