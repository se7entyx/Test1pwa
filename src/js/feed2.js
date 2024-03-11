var sharedMomentsArea = document.querySelector('#desccontainer');
const urlParams = new URLSearchParams(window.location.search);

// Mendapatkan nilai parameter dengan nama tertentu
const idpage = urlParams.get('id');

console.log(navigator.onLine)
function clearCards() {
  while (sharedMomentsArea.hasChildNodes()) {
    sharedMomentsArea.removeChild(sharedMomentsArea.lastChild);
  }
}

function createCard(data) {
  var judul = document.createElement('div')
  judul.innerHTML = `<h1>${data.title}</h1>`

  var gambar = document.createElement('div')
  gambar.innerHTML = `<img src="src/images/${data.gambar}" alt="${data.title}">`

  var deskripsi = document.createElement('div')
  deskripsi.innerHTML = `<p class="description">${data.desc}</p>
  </div>`

  sharedMomentsArea.appendChild(judul);
  sharedMomentsArea.appendChild(gambar);
  sharedMomentsArea.appendChild(deskripsi);
}

//masih hardcode ${data.id}
var url = `https://test1pwa-59635-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${idpage}.json`;
var networkDataReceived = false;
if (navigator.onLine) {
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data)
      if (localStorage.getItem(data.id) == null) {
        localStorage.setItem(data.id, JSON.stringify(data))
      }
      // localStorage.setItem('${data.id}')
      clearCards()
      createCard(data)
    });

}
else{
clearCards()
createCard(JSON.parse(localStorage.getItem(idpage)))
}

