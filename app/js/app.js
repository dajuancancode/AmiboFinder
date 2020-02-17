const formEl = document.getElementById(form);
const textEl = document.querySelector("input[type='text']");
const sectionEl = document.querySelector(".amiibo-section");
const url = `https://www.amiiboapi.com//api/amiibo/?character=`;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const amiiboName = textEl.value;

 try {
   const response = await fetch(`${url}${amiiboName}`);
   const jsonResponse = await response.json();

   const results = jsonResponse.amiibo;

  results.forEach(item => {
    if (item.type === "Figure") {
      createAmiiboEl(item)
    }
  })
 }
 catch(e) {
   console.log(e);
 } 
})

const createAmiiboEl = amiibo => {
  const amiiboDiv = document.createElement("div");
  const amiiboImageDiv = document.createElement("div");
  const amiiboTextDiv = document.createElement("div");

  const amiiboImage = `<img class="amiibo-image" src = "${amiibo.image}" />`;
  amiiboImageDiv.innerHTML = amiiboImage;


  const amiiboText = `<p class ="amiiboName">Name: ${amiibo.character}</p>
                      <p class ="amiiboSeries">Amiibo Series: ${amiibo.amiiboSeries}</p>
                      <div>
                      Release Date:
                        <ul>
                          <li>NA: ${amiibo.release.na}</li>
                          <li>AU: ${amiibo.release.au}</li>
                          <li>EU: ${amiibo.release.eu}</li>
                          <li>JP: ${amiibo.release.jp}</li>
                        </ul>
                      </div>
                      <div>
                        <label for="collectionCheck">Add to Collection</label>
                        <input type="checkbox" id="collectionCheck" name="collection">
                      </div>
                      
  `

  amiiboTextDiv.innerHTML = amiiboText;

  amiiboDiv.setAttribute("class", "amiibo");
  amiiboDiv.appendChild(amiiboImageDiv)
  amiiboDiv.appendChild(amiiboTextDiv)

  sectionEl.appendChild(amiiboDiv);
  console.log(sectionEl)
}