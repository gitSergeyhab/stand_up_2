import { useGetMainContentQuery } from '../../store/main-api';
import { ErrorPage } from '../error-page/error-page';
import { BigSpinner } from '../../components/spinner/big-spinner';
import { CardBlock } from '../../components/card-block/card-block';


const CardData = {
  Shows: { title: 'Популярные Выступления', text: 'Показать все выступления', to: '/shows' },
  Comedians: { title: 'Популярные Комики', text: 'Показать всех комиков', to: '/comedians' },
  EventsDate: { title: 'Ближайшие События', text: 'Показать все события', to: '/events' },
  EventsViews: { title: 'Популярные события', text: 'Показать все события', to: '/events' },
  Places: { title: 'Популярные Площадки', text: 'Показать все площадки', to: '/places' }
}

export function MainPage() {

  const { isError, isLoading, data, error } = useGetMainContentQuery(null);

  if (isError) {
    return <ErrorPage error={error} />;
  }

  if (isLoading || !data ) {
    return <BigSpinner />;
  }

  console.log({data})

const { comedians, eventsByDate, eventsByViews, places, shows } = data;

  return (
    <>
      <CardBlock cards={shows}  cardData={CardData.Shows}/>
      <CardBlock cards={comedians}  cardData={CardData.Comedians}/>
      <CardBlock cards={eventsByDate}  cardData={CardData.EventsDate}/>
      <CardBlock cards={eventsByViews}  cardData={CardData.EventsViews}/>
      <CardBlock cards={places}  cardData={CardData.Places}/>
    </>
  );
}
