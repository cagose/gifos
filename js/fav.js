

const names = [{

  first_name: 'Lucas',

  last_name : 'Gonzalez',

}, {

  first_name: 'Carlos',

  last_name: 'Gomezssss'

}, {

  first_name: 'Jose',

  last_name: 'Gutierrez'

}]


const ul = document.querySelector('.ul_all')

const ul_favs = document.querySelector('.ul_favs')


let favs = []

if ( localStorage.getItem('favs') ) {

  favs = JSON.parse(localStorage.getItem('favs'))

}

if (ul) {

  names.map( name => {

    const li = document.createElement('li')

    const button = document.createElement('button')

    button.textContent = "fav"

    li.innerHTML = `${name.first_name} ${name.last_name}`

    li.appendChild(button)

    ul.appendChild(li)

    button.addEventListener('click', () => {
    console.log(name)

      favs.push(name)

      localStorage.setItem('favs', JSON.stringify(favs))

    })

  })

}


if (ul_favs) {

  const names = JSON.parse(localStorage.getItem('favs'))

  names.map( name => {

    const li = document.createElement('li')

    li.innerHTML = `${name.first_name} ${name.last_name}`

    ul_favs.appendChild(li)

  })

}

