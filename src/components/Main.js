import React from 'react'
import standartAvatar from '../images/profile/avatar.jpg'
import Card from './Card'
import { api } from '../utils/api'

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = React.useState('Жак-Ив Кото')
  const [userJob, setJob] = React.useState('Исследователь Котанов')
  const [userAvatar, setUserAvatar] = React.useState(standartAvatar)
  const [cards, setCards] = React.useState([])
  const [userId, setUserId] = React.useState('')

  React.useEffect(() => {
    Promise.all([api.getUsersApi(), api.getInitialCards()])
      .then(([{ name, about, avatar, _id }, cards]) => {
        setUserAvatar(avatar)
        setUserName(name)
        setJob(about)
        setUserId(_id)
        setCards(cards)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <main>
      <section className="profile">
        <img
          className="profile__avatar"
          src={userAvatar}
          alt="Аватар"
        />
        <button
          className="profile__edit"
          type="button"
          onClick={onEditAvatar}
        />
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__title">{userName}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="редактировать профиль"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__subtitle">{userJob}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="добавить"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements" aria-label="фотографии">
        <ul className="elements__grid-container">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleClick={() => onCardClick(card)}
              userId={userId}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main
