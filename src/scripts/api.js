//API

const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-4",
  headers: {
    authorization: "cd951e89-7569-451f-b81d-578181490a13",
    'Content-Type': 'application/json',
  },
};

const getResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
  };

const getUserInfo = async () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
  .then((res) => getResponse(res))
  
};

const getInitialCards = async () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
  .then((res) => getResponse(res))
  
};

const getInitialInfo = async () => {
  return Promise.all([getUserInfo(), getInitialCards()]);
};

const updateProfile = async (profileData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: profileData.name,
      about: profileData.about,
    }),
  })
  .then((res) => getResponse(res))
  
};

const uploadAvatar = async (profileData) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: profileData.avatar,
    }),
  })
  .then((res) => getResponse(res))
  
};

const uploadCard = async (cardsData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardsData.name,
      link: cardsData.link,
    }),
  })
  .then((res) => getResponse(res))
  
};

const removeCard = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then((res) => getResponse(res))
  
};

const putLike = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
  .then((res) => getResponse(res))
  
};

const deleteLike = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then((res) => getResponse(res))
  
};

export {  getInitialInfo, updateProfile, uploadCard, removeCard, putLike, deleteLike, uploadAvatar };