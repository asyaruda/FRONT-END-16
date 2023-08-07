const form = document.getElementById('form')
const userInfoDiv = document.querySelector('.userInfoDiv')

form.addEventListener('submit', onFormSubmit)

function fetchUser(username) {
    const apiUrl = `https://api.github.com/users/${username}`
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Пользователь не найден')
            }
            return response.json()
        })
}

function onFormSubmit(event) {
    event.preventDefault()
    const username = document.getElementById('nameInput').value;
    if (username.trim() === '') {
        alert('Введите логин пользователя')
        return
    }

    fetchUser(username)
        .then(data => {
            displayUserInfo(data)
        })
        .catch(error => {
            displayError(error.message)
        })
}

function displayUserInfo(user) {
    userInfoDiv.style.display = 'block'
    const template = `
        <div>
            <img src="${user.avatar_url}" alt="Avatar" style="width: 100px; height: 100px;">
            <p>Логин: ${user.login}</p>
            <p>Количество репозиториев: ${user.public_repos}</p>
            <p>Фолловеры: ${user.followers}</p>
            <p>Наблюдаемые: ${user.following}</p>
        </div>
    `
    userInfoDiv.innerHTML = template
}


function displayError(errorMessage) {
    userInfoDiv.innerHTML = `<p style="color: red;">Ошибка: ${errorMessage}</p>`
}