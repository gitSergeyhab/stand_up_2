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
  disabled?: boolean;
  active?:boolean
}

type ProtoBtnProps = BtnProps & {sign: string, width?: number}

export function ActionBtn({onClick, sign, width, disabled, active }: ProtoBtnProps) {
  return (
    <ActionButton disabled={disabled} active={active} width={width} onClick={onClick}>
      {sign}
    </ActionButton>
    )
}

export function CloseBtn({onClick, disabled, active}: BtnProps) {
  return <ActionBtn sign='✘' disabled={disabled} active={active} onClick={onClick} />
}

export function SettingBtn({onClick, disabled, active}: BtnProps) {
  return <ActionBtn sign='⚙' disabled={disabled} active={active} onClick={onClick}/>
}

export function HideBtn({onClick, disabled, active}: BtnProps) {
  return <ActionBtn sign='-' disabled={disabled} active={active} onClick={onClick}/>
}
