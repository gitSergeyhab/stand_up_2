import { useLocation } from 'react-router-dom';
import { CardContainer } from '../../../components/card-container/card-container';
import { useGetAllComediansQuery } from '../../../store/comedians-api';
import { adaptComediansToCard } from '../../../utils/adapters/card-adapters';

export function ComediansPage() {
  const { search } = useLocation();

  const { data, isError, isLoading } = useGetAllComediansQuery(search);

  if (isError || isLoading || !data) {
    return <h2>Error</h2>;
  }

  const cards = data.comedians.map(adaptComediansToCard);
  const comedianElements = data.comedians.length ? (
    <CardContainer cards={cards} />
  ) : null;

  return (
    <>
      <h1>Комики</h1>
      {comedianElements}
    </>
  );
}
