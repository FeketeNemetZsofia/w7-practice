const rootElement = document.querySelector("#root")

const fetchUrl = async (url) => {
  const response = await fetch(url)
  return response.json()
}

const personComponent = (person) => `
  <div class="person">
    <h2>name: ${person.name}</h2>
    <h3>height: ${person.height} cm</h3>
  </div>
`

const buttonComponent = (text, id) => `<button id=${id}>${text}</button>`

const buttonEventComponent = (id, url, rootElement) => {
  const buttonElement = document.querySelector(`#${id}`)
  buttonElement.addEventListener("click", async () => {
    rootElement.innerHTML = "LOADING..."

    const newData = await fetchUrl(url)
    makeDomFromData(newData, rootElement)
  })
}

const inputComponent = () => `
  <div class="search">
    <input type="text" id="name">
    <button id="search">search!</button>
  </div>
`

const inputEventComponent = () => {
  const buttonElement = document.querySelector("#search")
  buttonElement.addEventListener("click", async () => {
    const inputElement = document.querySelector("#name")
    const searchTag = inputElement.value
    rootElement.innerHTML = "LOADING..."
    
    const newData = await fetchUrl(`https://swapi.dev/api/people/?search=${searchTag}`)
    makeDomFromData(newData, rootElement)
  })
}

const makeDomFromData = (data, rootElement) => {
  rootElement.innerHTML = inputComponent()
  inputEventComponent()

  data.results.forEach((person) => {
    rootElement.insertAdjacentHTML("beforeend", personComponent(person))
  })

  if (data.previous) {
    rootElement.insertAdjacentHTML("beforeend", buttonComponent("previous", "prev"))
    buttonEventComponent("prev", data.previous, rootElement)
  }

  if (data.next) {
    rootElement.insertAdjacentHTML("beforeend", buttonComponent("next", "next"))
    buttonEventComponent("next", data.next, rootElement)
  }
}

const init = async () => {
  rootElement.innerHTML = "LOADING..."
  const data = await fetchUrl("https://swapi.dev/api/people/")
  makeDomFromData(data, rootElement)
}

init()