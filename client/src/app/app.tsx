import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EventPageInfo } from '../pages/events/event-page-info/event-page-info';
// import { MainPage } from '../pages/main-page/main-page';
import { Header } from '../components/header/header';
// import Footer from '../components/footer/footer';

import { MainContainer, MainMain, MainWrapper, PageWrapper } from './app-style';
import { ComediansPage } from '../pages/comedians/comedians-page/comedians-page';
import { ComedianPageInfo } from '../pages/comedians/comedian-page-info/comedian-page-info';
import { PagePictureList } from '../pages/proto/page-picture-list/page-picture-list';
import { RegistrationPage } from '../pages/registration-page/registration-page';
import { LoginPage } from '../pages/login-page/login-page';
import { ErrorPage } from '../pages/error-page/error-page';
import { UsersPage } from '../pages/users-page/users-page';

import { AdminPanel } from '../pages/admin-panel/admin-panel';
import { ShowsOfComedian } from '../pages/comedians/sub-comedians/shows-of-comedian';
import { EventsOfComedian } from '../pages/comedians/sub-comedians/events-of-comedian';
import { EventsPage } from '../pages/events/events-page/events-page';
import { ShowsPage } from '../pages/shows/shows-page/shows-page';
import { ShowPageInfo } from '../pages/shows/show-page-info/show-page-info';
import { PlacesPage } from '../pages/places/places-page/places-page';
import { PlacePageInfo } from '../pages/places/place-page-info/place-page-info';
import { RatingsOfComedian } from '../pages/comedians/sub-comedians/ratings-of-comedian';
import { PlaceChange } from '../pages/change-panels/place-change';
import { ComedianChange } from '../pages/change-panels/comedian-change';
import { ShowChange } from '../pages/change-panels/show-change';
import { EventChange } from '../pages/change-panels/event-change';
import { Chat } from '../components/chat/chat';
import { useAppDispatch } from '../hooks/use-app-dispatch';
import { authAction } from '../store/api-actions';
import { storageUtils } from '../utils/storage-utils';
import { MainPage } from '../pages/main-page/main-page';
import { NewsPage } from '../pages/news/news-page/news-page';
import { NewsPageInfo } from '../pages/news/news-info/news-info';
import { NewsChange } from '../pages/change-panels/news-change';

const AppRoute = {
  Main: '/',

  Comedian: '/comedians/:id/info',
  ComedianShows: '/comedians/:id/shows',
  ComedianEvents: '/comedians/:id/events',
  // ComedianPhotos: '/comedians/:id/photos',
  ComedianRatings: '/comedians/:id/ratings',
  ComedianChange: '/comedians/:id/change',

  Pictures: '/:mainType/:id/images',
  // Ratings: '/:mainType/:id/ratings',
  ComedianRating: 'comedians/id/ratings',


  Comedians: '/comedians',
  Show: '/shows/:id/info',
  Shows: '/shows',
  ShowChange: '/shows/:id/change',
  Event: '/events/:id/info',
  Events: '/events',
  EventChange: '/events/:id/change',
  Place: '/places/:id/info',
  PlaceChange: '/places/:id/change',
  Places: '/places',
  News: 'news/:id',
  NewsList: 'news',
  NewsChange: '/news/:id/change',
  User: '/users/:id',
  Users: '/users',

  Registration: '/registration',
  Login: '/login',

  AdminPanel: '/admin'
};

export function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = storageUtils.getUser();
    if (user) {
      dispatch(authAction());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <PageWrapper>
        <Header />
        <MainMain>
          <MainWrapper>
            <MainContainer>
              <Routes>
                {/* <Route path={AppRoute.Main} element={<MainPage/>}/> */}

                {/* Comedians */}
                <Route path={AppRoute.Comedians} element={<ComediansPage />} />
                <Route path={AppRoute.Comedian} element={<ComedianPageInfo />} />
                <Route path={AppRoute.ComedianShows} element={<ShowsOfComedian />} />
                <Route path={AppRoute.ComedianEvents} element={<EventsOfComedian />} />
                <Route path={AppRoute.ComedianRatings} element={<RatingsOfComedian />} />
                <Route path={AppRoute.ComedianChange} element={<ComedianChange />} />


                <Route path={AppRoute.Pictures} element={<PagePictureList />} />

                <Route path={AppRoute.Events} element={<EventsPage/>}/>
                <Route path={AppRoute.Event} element={<EventPageInfo />} />
                <Route path={AppRoute.EventChange} element={<EventChange />} />

                <Route path={AppRoute.Shows} element={<ShowsPage/>}/>
                <Route path={AppRoute.Show} element={<ShowPageInfo />} />
                <Route path={AppRoute.ShowChange} element={<ShowChange />} />

                <Route path={AppRoute.Places} element={<PlacesPage/>}/>
                <Route path={AppRoute.Place} element={<PlacePageInfo />} />
                <Route path={AppRoute.PlaceChange} element={<PlaceChange />} />

                <Route path={AppRoute.NewsList} element={<NewsPage/>}/>
                <Route path={AppRoute.News} element={<NewsPageInfo/>}/>
                <Route path={AppRoute.NewsChange} element={<NewsChange />} />

                <Route path={AppRoute.Users} element={<UsersPage />} />

                <Route path={AppRoute.AdminPanel} element={<AdminPanel/>}/>

                <Route
                  path={AppRoute.Registration}
                  element={<RegistrationPage />}
                />
                <Route path={AppRoute.Login} element={<LoginPage />} />




                <Route path="/" element={<MainPage />} />

                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </MainContainer>
          </MainWrapper>
        </MainMain>
        <Chat />
        {/* <Footer /> */}
      </PageWrapper>
    </BrowserRouter>
  );
}
