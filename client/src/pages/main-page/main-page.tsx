import { Button } from '@mui/material';
import { Test } from '../../components/test-block/test-block';

export function MainPage() {
  return (
    <>
      <Button>Primary</Button>
      <Button disabled>Disabled</Button>
      <Button href="#text-buttons">Link</Button>
      <Test />
    </>
  );
}
