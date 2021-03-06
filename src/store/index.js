import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import movieReducer from 'containers/client/Home/module/reducer';
import movieDetailReducer from 'containers/client/MovieDetail/module/movieDetailReducer';
import UserAccountReducer from 'containers/admin/UserAccount/Modules/reducer';
import pagePanigationReducer from 'containers/client/Movie/Modules/reducer';
import movieListOptionReducer from 'containers/client/Movie/module/reducer';
import authUserReducer from 'containers/shared/Auth/module/reducers';
import theaterReducer from 'containers/client/Theater/module/theaterReducer';
import theaterFilterReducer from 'containers/client/Theater/TheaterFilter/module/theaterFilterReducer';
import MovieAdminManager from 'containers/admin/MovieManage/Modules/reducer';
import reducers from 'containers/shared/Auth/module/reducers';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  movieReducer,
  movieDetailReducer,
  pagePanigationReducer,
  movieListOptionReducer,
  authUserReducer,
  theaterReducer,
  theaterFilterReducer,
  UserAccountReducer,
  MovieAdminManager,
  reducers,
});
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['movieReducer','movieDetailReducer','pagePanigationReducer','movieListOptionReducer','authUserReducer','theaterReducer','theaterFilterReducer','UserAccountReducer','MovieAdminManager','reducers'],
  // whitelist: ['authUserReducer'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(store);

export {store,persistor};
