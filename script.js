const rootElement = document.querySelector("#root")
const api_key = "qer2ybNgjDbYi4GXnzPZVBdT8Mth3T9iv9G6eHBx"

const fetchURL = async (url) => {
let response = await fetch(url)
return response.json()
}


const apodComponent = (apodData) => `
<input type="date" id="date"><button>Search by date</button>
<h2> ${apodData.title} </h2>
<h3>${apodData.date}</h3>
<p>${apodData.explanation}</p>
<img src =${apodData.url}>
` 




const init = async () => {
  const data = await fetchURL(`https://api.nasa.gov/planetary/apod?api_key=${api_key}`)
  console.log(data)

  //rootElement.innerHTML = `<h2> ${data.title} </h2>` //loading screenre jobb használni.

  rootElement.insertAdjacentHTML("beforeend", apodComponent(data))


}

init()