/*** Variables API GIPHOS*/

const api_key = "4b7ME2zEwZLCjeqVc7wT1QY37Jyeq702";
const searchURL = "https://api.giphy.com/v1/gifs/search";
const searchURLTags = "https://api.giphy.com/v1/gifs/search/tags"
const URLTrending = "https://api.giphy.com/v1/gifs/trending";
const URLTrendingKeywords = "https://api.giphy.com/v1/trending/searches";
const LimiteGif = 12;
let arregloFavoritos = [];
let valorBusqueda = ""




/*********** Variables Funcion Busquedas  Gif  ******/

const frmBuscar= document.querySelector('.frmBuscar')
const divResutaldosGif = document.querySelector('.Resultados_gif')
const buscar = document.querySelector('#buscar')
const Resultados_titulo = document.querySelector('.Resultados_titulo')
const sin_resultados = document.querySelector('.sin_resultados')
const btnMostrarMas = document.getElementById('MostrarBusqueda')
let offset = 0;



/******* variables auto completar****** */

const autocompletar = document.getElementById('autocompletar')
const searchBtn = document.getElementById('searchBtn')
const BtnClose = document.getElementById('BtnClose')
const iconSearch =  document.getElementById('iconSearch')
const autocompletarBuscar = document.getElementById('autocompletar')
const autocompletarBuscarCerrar = document.getElementById('autocompletar')


/******* Variables Trendings keywords*************/

const ulTrendings = document.querySelector(".trendings");


/*** variables busquedas Trending keywords */

const keyTrendings = document.getElementById('key-Trendings')


/*** Varibles Trending Gif *****/

const divResults = document.querySelector("#results-Trending");


/********** Botones descarga favoritos *****/


const btn_Trending = document.getElementById('results-Trending')
const btn_Busqueda = document.getElementById('resultados_Gif')


/****** variables POP UP ******/

const btn_Cerrar = document.getElementById('btnCerrarPop')
const Pop = document.getElementById('Pop')
const imgPop = document.getElementById('imgCentralPop');
const UserPop = document.getElementById('UserPop');
const TituloPop = document.getElementById('TituloPop');
const btnFavoritos = document.getElementById('btnFavoritos')
const btnDescarga = document.getElementById('btnDescarga')


/*********** Funcion Busquedas  Gif  ******/

const getSearchGif = async (buscarTermino) => {
  const response = await fetch(`${searchURL}?api_key=${api_key}&q=${buscarTermino}&limit=12`);
  const data = await response.json();
  valorBusqueda = data.data;
  btnMostrarMas.style.display = 'block';
  console.log(valorBusqueda)
  if (valorBusqueda.length == 0) {
    mostrarError();
    console.log('hay error')
    //console.log(valorBusqueda)
  } else {
    sin_resultados.classList.add('no-mostrar');
    data.data.map((gif) => {
    const username = gif.username;
    const titulo = gif.title; 
    const id_img = gif.id;
    const img_src = gif.images.fixed_height_downsampled.url;
    const img_pop = gif.images.original.url;
    divResutaldosGif.innerHTML += `<div class="container_images_Gif" data-gif_id="${id_img}">
                                      <img id="${id_img}" class="card_Gif" src="${img_src}" alt="${titulo}" />
                                      <div class="card_hover">
                                         <div class="opciones" id="menu_opciones">
                                             <button id="btn_favoritos"><img src="assets/icon-fav-hover.svg" alt="" data-gif_fav="${id_img}" class="img_btn_favoritos"></button>
                                             <button id="btn_descarga"><img src="assets/icon-download-hover.svg" alt="" data-gif_url="${img_src}" class="img_btn_descarga"></button>
                                             <button id="btn_popup"><img src="assets/icon-max-hover.svg" alt="" data-gif_fav="${id_img}" data-gif_urlPop="${img_pop}" data-gif_username="${username}" data-gif_titulo="${titulo}" class="img_pop"></button>
                                         </div>
                                         <p class="card_info1" id="show_username">${username}</p>
                                         <p class="card_info2" id="show_title">${titulo}</p>
                                      </div>
                                    </div>`
    });
  }
};

const mostrarMasGif = async (verTermino) => {
  const response = await fetch(`${searchURL}?api_key=${api_key}&q=${verTermino}&limit=12&offset=${offset}`);
  const data = await response.json();
  valorBusqueda = data.data;
  btnMostrarMas.style.display = 'block';
  console.log(valorBusqueda)
 if (valorBusqueda.length == 0) {
    mostrarError();
    console.log('hay error')
    //console.log(valorBusqueda)
  } else {
    sin_resultados.classList.add('no-mostrar');
    data.data.map((gif) => {
    const username = gif.username;
    const titulo = gif.title; 
    const id_img = gif.id;
    const img_src = gif.images.fixed_height_downsampled.url;
    const img_pop = gif.images.original.url;
    divResutaldosGif.innerHTML += `<div class="container_images_Gif" data-gif_id="${id_img}">
                                      <img id="${id_img}" class="card_Gif" src="${img_src}" alt="${titulo}" />
                                      <div class="card_hover">
                                         <div class="opciones" id="menu_opciones">
                                             <button id="btn_favoritos"><img src="assets/icon-fav-hover.svg" alt="" data-gif_fav="${id_img}" class="img_btn_favoritos"></button>
                                             <button id="btn_descarga"><img src="assets/icon-download-hover.svg" alt="" data-gif_url="${img_src}" class="img_btn_descarga"></button>
                                             <button id="btn_popup"><img src="assets/icon-max-hover.svg" alt="" data-gif_fav="${id_img}" data-gif_urlPop="${img_pop}" data-gif_username="${username}" data-gif_titulo="${titulo}" class="img_pop"></button>
                                         </div>
                                         <p class="card_info1" id="show_username">${username}</p>
                                         <p class="card_info2" id="show_title">${titulo}</p>
                                      </div>
                                    </div>`
    });
  }
};


/*** no hay resultados error 404 */


const mostrarError = () => sin_resultados.classList.remove('no-mostrar');

/**** listener input busquedas *****/

frmBuscar.addEventListener('submit', ev => {
	ev.preventDefault()
  const valorBusqueda = buscar.value
  Resultados_titulo.innerHTML= valorBusqueda;
  console.log(valorBusqueda)
  divResutaldosGif.innerHTML = ''
  getSearchGif(buscar.value)
  //console.log(tituloBusqueda)
});



/******* auto completar*******/

const appendLiAutocomplete = term => {
      searchBtn.classList.add('no-mostrar');
      iconSearch.classList.remove('no-mostrar');
      BtnClose.classList.remove('no-mostrar');
      const ul = document.querySelector("#autocompletar");
      //ul.innerHTML += `<li><img src="./assets/icon-search.svg" />${term.name}</li>`;
      ul.innerHTML += `<li><img src="./assets/icon-search.svg" /><span>${term.name}</span></li>`;
     
}

BtnClose.addEventListener('click',(e)=>{ 
    autocompletar.innerHTML = ''
    BtnClose.classList.add('no-mostrar');
    iconSearch.classList.add('no-mostrar');
    searchBtn.classList.remove('no-mostrar');
});

const getAutocompletar = async (buscarTermino) => {
	const response = await fetch(`${searchURLTags}?api_key=${api_key}&q=${buscarTermino}`)
  const terms = await response.json()
  terms.data.slice(0,5).map( term => {
    //console.log(term)
  	appendLiAutocomplete(term)
  })
}

frmBuscar.addEventListener('keyup', ev => {
	const termToSearch = ev.target.value
  autocompletar.innerHTML = ""
  getAutocompletar(termToSearch) 
})

/*const autocompletarBuscar = document.getElementById('autocompletar')
const autocompletarBuscarCerrar = document.getElementById('autocompletar')*/


autocompletarBuscar.addEventListener('click',(e)=>{ 
  if (e.target && e.target.matches("span")) {
      //console.log('hola') 
      const Buscarkey = e.target.innerHTML;
      console.log(Buscarkey)
      Resultados_titulo.innerHTML = Buscarkey;
      buscar.value = Buscarkey;
      divResutaldosGif.innerHTML = ''
      autocompletar.innerHTML = ''
      BtnClose.classList.add('no-mostrar');
      iconSearch.classList.add('no-mostrar');
      searchBtn.classList.remove('no-mostrar');
      getSearchGif(Buscarkey)
  }
});



/******* Trendings keywords*************/


const appendLiTrending = (term) => {
  const ul = document.querySelector("#key-Trendings");
  ul.innerHTML += `<li class="lTrendings">${term}</li><span> , </span> `;
};

const getSearchTermsTrendings = async () => {
  const response = await fetch(`${URLTrendingKeywords}?api_key=4b7ME2zEwZLCjeqVc7wT1QY37Jyeq702`);
  const terms = await response.json();
  console.log(terms);
  console.log('trendings')
  terms.data.slice(0, 5).map((term) => {
   appendLiTrending(term);
  });
};


/* Cargamos los Key Trendings*/

getSearchTermsTrendings();

/***listener busquedas Trending keywords */


keyTrendings.addEventListener('click',(e)=>{ 
  if (e.target && e.target.matches("li.lTrendings")) {
       //console.log('hola') 
        const Buscarkey = e.target.innerHTML;
        console.log(Buscarkey)
        Resultados_titulo.innerHTML = Buscarkey;
        buscar.value = Buscarkey;
        divResutaldosGif.innerHTML = ''
        getSearchGif(Buscarkey)
  }
});



/*** Trending Gifs ******/


const getGifTrending = async () => {
  const response = await fetch(
    `${URLTrending}?api_key=${api_key}&limit=${LimiteGif}`
  );
  //const response = await fetch(url)
  const data = await response.json();
  
  data.data.map((gif) => {
    const username = gif.username;
    const titulo = gif.title;
    const id_img = gif.id;
    const img_src = gif.images.fixed_height_downsampled.url;
    const img_pop = gif.images.original.url;
    divResults.innerHTML += `<div class="container_images_Gif" data-gif_id="${id_img}">
                                 <img id="${id_img}" class="card_Gif" src="${img_src}" alt="${titulo}" />
                                 <div class="card_hover">
                                    <div class="opciones" id="menu_opciones">
                                        <button id="btn_favoritos"><img src="assets/icon-fav-hover.svg" alt="" data-gif_fav="${id_img}" class="img_btn_favoritos"></button>
                                        <button id="btn_download"><img src="assets/icon-download-hover.svg" alt="" class="img_btn_descarga" data-gif_url="${img_src}"></button>
                                        <button id="btn_popup"><img src="assets/icon-max-hover.svg" alt="" data-gif_fav="${id_img}" data-gif_urlPop="${img_pop}" data-gif_username="${username}" data-gif_titulo="${titulo}" class="img_pop"></button>
                                    </div>
                                    <p class="card_info1" id="show_username">${username}</p>
                                    <p class="card_info2" id="show_title">${titulo}</p>
                                </div>
                              </div>`
    //arregloFavoritos.push (id_img)
    //console.log(arregloFavoritos)
  });
};
// Cargamos Trending Gif

getGifTrending();


/**** ++++DESCARGA GIF ++++ */



/*****  listener descarga trending */

btn_Trending.addEventListener('click',(e)=>{

  /**** descargas en trending *****/

  if (e.target && e.target.matches(".img_btn_descarga")) {
  const gif_url = e.target.getAttribute('data-gif_url');
  console.log(gif_url)
  descargaGIF(gif_url)
  }
/**** favoritos en trending ******/

  if (e.target && e.target.matches(".img_btn_favoritos")) {
    const gif_fav = e.target.getAttribute('data-gif_fav');
    //console.log(gif_fav)
    if(arregloFavoritos.includes(gif_fav)){
      alert('Ya es favorito')
  }else{
    arregloFavoritos.push(gif_fav)
    console.log(arregloFavoritos)
    localStorage.setItem('favoritos', JSON.stringify(arregloFavoritos))
    }
  }

});

btn_Busqueda.addEventListener('click',(e)=>{

  /******* descarga en busquedas *******/


  if (e.target && e.target.matches(".img_btn_descarga")) {
  const gif_url = e.target.getAttribute('data-gif_url');
  console.log(gif_url)
  descargaGIF(gif_url)
  }

  /*************favoritos en busquedas   ******/


  if (e.target && e.target.matches(".img_btn_favoritos")) {
    const gif_fav = e.target.getAttribute('data-gif_fav');
    //console.log(gif_fav)
    if(arregloFavoritos.includes(gif_fav)){
      alert('Ya es favorito')
  }else{
    arregloFavoritos.push(gif_fav)
    console.log(arregloFavoritos)
    localStorage.setItem('favoritos', JSON.stringify(arregloFavoritos))
    }
  }
});

/**** descarga el GIF *****/


async function descargaGIF(url) {
  let a = document.createElement('a');
  let response = await fetch(url);
  let file = await response.blob();
  a.download = 'myGif.gif';
  a.href = window.URL.createObjectURL(file);
  a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
  a.click();
}
/******FAVORITOS *****/

if ( localStorage.getItem('favoritos') ) {

  arregloFavoritos = JSON.parse(localStorage.getItem('favoritos'))
  console.log(arregloFavoritos)
  //masFavoritos = favoritos
}



btn_Cerrar.addEventListener("click", () => {
  imgPop.src = "";
  Pop.style.display="none";
});

btn_Busqueda.addEventListener('click',(e)=>{
  if (e.target && e.target.matches(".img_pop")) {
  const gif_Pop_url = e.target.getAttribute('data-gif_urlPop');
  const Pop_user = e.target.getAttribute('data-gif_username');
  const Pop_titulo = e.target.getAttribute('data-gif_titulo');
  btnFavoritos.setAttribute('data-gif_fav',e.target.getAttribute('data-gif_fav'));
  btnDescarga.setAttribute('data-gif_url',gif_Pop_url);
  console.log(gif_Pop_url)
  imgPop.src = gif_Pop_url;
  UserPop.innerHTML = Pop_user;
  TituloPop.innerHTML = Pop_titulo;
  Pop.style.display="block";
  }
});

btn_Trending.addEventListener('click',(e)=>{
  if (e.target && e.target.matches(".img_pop")) {
  const gif_Pop_url = e.target.getAttribute('data-gif_urlPop');
  const Pop_user = e.target.getAttribute('data-gif_username');
  const Pop_titulo = e.target.getAttribute('data-gif_titulo');
  btnFavoritos.setAttribute('data-gif_fav',e.target.getAttribute('data-gif_fav'));
  btnDescarga.setAttribute('data-gif_url',gif_Pop_url);
  console.log(gif_Pop_url)
  imgPop.src = gif_Pop_url;
  UserPop.innerHTML = Pop_user;
  TituloPop.innerHTML = Pop_titulo;
  Pop.style.display="block";
  }
});

Pop.addEventListener('click',(e)=>{
    if (e.target && e.target.matches("#btnDescarga")) {
  const gif_url = e.target.getAttribute('data-gif_url');
  descargaGIF(gif_url)
  }
  if (e.target && e.target.matches("#btnFavoritos")) {
    const gif_fav = e.target.getAttribute('data-gif_fav');
    //console.log(gif_fav)
    if(arregloFavoritos.includes(gif_fav)){
      alert('Ya es favorito')
  }else{
    arregloFavoritos.push(gif_fav)
    console.log(arregloFavoritos)
    localStorage.setItem('favoritos', JSON.stringify(arregloFavoritos))
    }
  }
});

btnMostrarMas.addEventListener("click", () => {
  offset++;
  offset = offset + LimiteGif;
  mostrarMasGif(buscar.value);
});