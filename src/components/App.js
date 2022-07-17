import {useState, useEffect} from 'react';
import {Switch, Route, useHistory, NavLink} from 'react-router-dom';
import userStartAvatar from '../images/avatarka.jpg';
import imageSuccess from '../images/success.svg';
import imageFail from '../images/fail.svg';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import PopupWithForm from './PopupWithForm';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import {api} from '../utils/Api';
import * as auth from '../utils/auth.js';

function App() {
  
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({name:'Пользователь', link:userStartAvatar ,about:'О себе'});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [infoTooltipImage, setInfoTooltipImage] = useState(imageSuccess);
  const [message, setMessage] = useState('');
  const [isRegSuccess, setIsRegSuccess] = useState(false);
 
  const history = useHistory();
  
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true); 
  }
  
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);   
  }

  function handleUpdateUser(data) {
    api.changeProfileInfo(data)
    .then ((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateAvatar(data) {
    api.changeAvatar(data)
    .then ((newUserInfo) => {
      setCurrentUser(newUserInfo);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit(data) {
    api.postCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    api.deleteCardApi(card._id)
    .then((res) => {
      console.log(res);
      setCards((state) => state.filter((c) => c._id !== card._id))
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  function handleRegister(registerData) {
    auth.register(registerData)
    .then((res) => {
      console.log(res);
      console.log(res.data.email);
      setIsRegSuccess(true);
      setInfoTooltipImage(imageSuccess);
      setMessage('Вы успешно зарегистрировались!');
      history.push('/signin');
    })
    .catch((err) => {
      console.log(err);
      setIsRegSuccess(false);
      setInfoTooltipImage(imageFail);
      setMessage('Что-то пошло не так! Попробуйте еще раз!');
    })
    .finally(()=> setIsTooltipPopupOpen(true));
  }

  function handleLogin(userData) {
    auth.authorize(userData)
     .then((res) => {
       console.log(res);
       console.log(userData.email);
       localStorage.setItem('jwt', res.token);
       setLoggedIn(true);
       setUserEmail(userData.email); 
       history.push('/');  
     })
    .catch((err) => {
      console.log(err);
      setLoggedIn(false);
      setInfoTooltipImage(imageFail);
      setMessage('Что-то пошло не так! Попробуйте еще раз!');
      setIsTooltipPopupOpen(true);
    })
  }

  function handleCheckToken() {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.checkToken(token)
      .then((res) => {
        console.log(res);
        if (res) {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          history.push('/');
        }       
      })
      .catch((err) => {console.log(`Ошибка: ${err}`)});
    }
  };

  function closePopup() {
    setIsTooltipPopupOpen(false);
  }

  useEffect(() => {
      handleCheckToken();
  }, [])

  useEffect(()=>{
    if (loggedIn) {
      Promise.all([api.getInfoUser(), api.getCards()])
      .then(([userInfo, cards]) => { 
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
    } 
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>      
      <div className="page">
        <Switch>
          <Route exact path="/signin">
            {/*Относительно повторяющихся Header обещаю поэкспериментировать, 
            но пока в голову ничего иного, путного и работающего, не приходит 0_0*/}
            <Header>
              <div className="header__button-container">
                <NavLink to="/signup" className="login__link">Регистрация</NavLink>
              </div>
            </Header>
            <Login
              onLogin={handleLogin}
            />
          </Route>
          <Route exact path="/signup">
            <Header>
              <div className="header__button-container">
                <NavLink to="/signin" className="login__link">Войти</NavLink>
              </div> 
            </Header>
            <Register 
              onRegister={handleRegister} 
            />
          </Route>
          <ProtectedRoute exact path='/' loggedIn={loggedIn}>
            <Header userEmail={userEmail}>
              <div className='header__menu'>
                <p className='header__user-email'>{userEmail}</p>
                <NavLink to='/signin' className='header__link-exit' onClick={handleSignOut}>Выйти</NavLink>
              </div>
            </Header>
            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              loggedIn={loggedIn}
            />
            <Footer/>
          </ProtectedRoute>
          
        </Switch>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups} 
        />                                             
        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          buttonText="Да"
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <InfoTooltip
          isOpen={isTooltipPopupOpen}
          onClose={closePopup}
          image={infoTooltipImage}
          message={message}
          isRegSuccess={isRegSuccess}
        />       
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App