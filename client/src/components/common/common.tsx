import { LogRegLink, LogRegP } from './common-style';

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
