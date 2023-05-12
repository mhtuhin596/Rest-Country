fetch('https://restcountries.com/v3.1/all')
  .then(res => res.json())
  .then(res => countries(res));

function countries(countries) {
  let root = document.getElementById("root");
  let code = ""
  countries.forEach(value => {
    code += htmlCode(value)
  })
  root.innerHTML = code;
}

function htmlCode(country) {
  const { name, flags, capital, population, area } = country;
  let html = `
  <div class= "country">
   <img src= "${flags.png}">
   <h2>${name.common}</h2>
   <p>
   <span class="label">Capital:</span> ${capital}</p>
   <p>
   <span class="label" >Population:</span> ${population}</p>
   <p><span class="label" >Area:</span> ${area}</p>
  </div>
  `
  return html;
}

let form = document.getElementById("form")

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let userInput = e.target.userInput.value;
  let input = userInput.toLowerCase();

  fetch(`https://restcountries.com/v3.1/name/${input}`)
    .then(res => res.json())
    .then(res => {
      countries(res)
    })

})


let filter = document.getElementById("regionFilter");

filter.addEventListener("input", (e) => {
  e.preventDefault();

  let filterInput = filter.value.toLowerCase();

  if (filterInput === "") {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((res) => countries(res));
  } else {
    fetch(`https://restcountries.com/v3.1/region/${filterInput}`)
      .then((res) => res.json())
      .then((res) => countries(res));
  }
})
