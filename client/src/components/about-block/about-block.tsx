import { AboutTable, TR, TDR, TDL } from './about-block-style';

type AboutRow = {
  point: string;
  value: string;
};

export function AboutBlock({ about }: { about: AboutRow[] }) {
  return (
    <AboutTable>
      <tbody>
        {about.map((row) => (
          <TR key={row.point}>
            <TDL>{row.point}</TDL>
            <TDR>{row.value}</TDR>
          </TR>
        ))}
      </tbody>
    </AboutTable>
  );
}
