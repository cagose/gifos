/*** Variables API GIPHOS*/

const api_key = "4b7ME2zEwZLCjeqVc7wT1QY37Jyeq702";

const searchURL = "https://api.giphy.com/v1/gifs/search";

const searchURLTags = "https://api.giphy.com/v1/gifs/search/tags"

const URLTrending = "https://api.giphy.com/v1/gifs/trending";

const URLTrendingKeywords = "https://api.giphy.com/v1/trending/searches";

const URLFavoritos = 'https://api.giphy.com/v1/gifs'

const LimiteGif = "12";

let arregloFavoritos = [];

let arregloMisGif = [];

let valorBusqueda = ""

/****** variables POP UP ******/

const btn_Cerrar = document.getElementById('btnCerrarPop')
const Pop = document.getElementById('Pop')
const imgPop = document.getElementById('imgCentralPop');
const UserPop = document.getElementById('UserPop');
const TituloPop = document.getElementById('TituloPop');
const btnFavoritos = document.getElementById('btnFavoritos')
const btnDescarga = document.getElementById('btnDescarga')
const divResutaldosGif = document.querySelector('.Resultados_gif')




/*** no hay resultados error 404 */


const mostrarError = () => sin_resultados.classList.remove('no-mostrar');



/******* Trendings keywords*************/

const ulTrendings = document.querySelector(".trendings");

const appendLiTrending = (term) => {
  const ul = document.querySelector("#key-Trendings");
  ul.innerHTML += `<li class="lTrendings">${term}</li><span> , </span> `;
};

const getSearchTermsTrendings = async () => {
  //const response = await fetch(`https://api.giphy.com/v1/trending/searches?api_key=${api_key}`)
  const response = await fetch(`${URLTrendingKeywords}?api_key=${api_key}`);
  const terms = await response.json();
  console.log(terms);
  terms.data.slice(0, 5).map((term) => {
   appendLiTrending(term);
  });
};






/*** Trending Imagenes */

const divResults = document.querySelector("#results-Trending");

const getGifTrending = async () => {
  const response = await fetch(`${URLTrending}?api_key=${api_key}&limit=${LimiteGif}`);
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


const btn_Trending = document.getElementById('results-Trending')
const btn_Busqueda = document.getElementById('resultados_Gif')


//console.log(btn_descarga_trending)

/*****  listener descarga trending */

btn_Trending.addEventListener('click',(e)=>{
  if (e.target && e.target.matches(".img_btn_descarga")) {
  const gif_url = e.target.getAttribute('data-gif_url');
  console.log(gif_url)
  descargaGIF(gif_url)
  //console.log('EUREKA!!!')
  //alert('EUREKA!!!')
  }
});

btn_Busqueda.addEventListener('click',(e)=>{
  if (e.target && e.target.matches(".img_btn_descarga")) {
  const gif_url = e.target.getAttribute('data-gif_url');
  console.log(gif_url)
  descargaGIF(gif_url)
  //console.log('EUREKA!!!')
  //alert('EUREKA!!!')
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
/******MIS FAVORITOS *****/
if ( localStorage.getItem('misGifos') ) {

    arregloMisGif = JSON.parse(localStorage.getItem('misGifos'))
  console.log(arregloMisGif)
  //masFavoritos = favoritos
}

/******FAVORITOS *****/
if ( localStorage.getItem('favoritos') ) {

    arregloFavoritos = JSON.parse(localStorage.getItem('favoritos'))
    console.log(arregloFavoritos)
    //masFavoritos = favoritos
  }

btn_Trending.addEventListener('click',(e)=>{
  if (e.target && e.target.matches(".img_btn_favoritos")) {
  const gif_fav = e.target.getAttribute('data-gif_fav');
  //console.log(gif_fav)
  if(arregloFavoritos.includes(gif_fav)){
      alert('Ya es favorito')
  }else{
  arregloFavoritos.push(gif_fav)
  console.log(arregloFavoritos)
  localStorage.setItem('favoritos', JSON.stringify(arregloFavoritos))

  //putFavoritosNuevos(gif_fav)
  //arregloFavoritos = JSON.parse(localStorage.getItem('favoritos'))
  //console.log(arregloFavoritos)
  //descargaGIF(gif_url)
  //console.log('EUREKA!!!')
  //alert('EUREKA!!!')
  }
 }
});

/****** MOSTRAR FAVORITOS *****/

const error_sin_resultados = document.getElementById('error_sin_resultados');

const putFavoritos = async () => {
  if(arregloMisGif.length == 0 ){
    alert("NO hay favoritos")
    console.log('no hay favoritos')
    error_sin_resultados.style.display = 'block';
  }else{ 
    error_sin_resultados.style.display = 'none';
    const response = await fetch(
      `https://api.giphy.com/v1/gifs?ids=${arregloMisGif.toString()}&api_key=${api_key}`
    );
    //console.log(`${URLFavoritos}?ids=${arregloFavoritos.toString()}&api_key=${api_key}`)
    //console.log(arregloFavoritos.toString())
    //const response = await fetch(url)
    const data = await response.json();
    data.data.map((gif) => {
      const username = gif.username;
      const titulo = gif.title;
      const id_img = gif.id;
      const img_src = gif.images.fixed_height_downsampled.url;
      const img_pop = gif.images.original.url;
      divResutaldosGif.innerHTML += `<div class="container_images_Gif" data-gif_fav="${id_img}" id="${id_img}">
                                      <img id="${id_img}" class="card_Gif" src="${img_src}" alt="${titulo}" />
                                      <div class="card_hover">
                                         <div class="opciones" id="menu_opciones">
                                             <button id="btn_favoritos"><img src="assets/icon-fav-active.png" alt="" data-gif_fav="${id_img}" class="img_btn_favoritos"></button>
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
  putFavoritos()

  const putFavoritosNuevos = async (nuevoFavorito) => {
    if(arregloFavoritos.length == 0 ){
        alert("NO hay favoritos")
        console.log('no hay favoritos')
        error_sin_resultados.style.display = 'block';
    }else{
    error_sin_resultados.style.display = 'none';
    const response = await fetch(`${URLFavoritos}?ids=${nuevoFavorito}&api_key=${api_key}`);
    //const response = await fetch(url)
    const data = await response.json();
    const imageGif = document.querySelector('.container_images_Gif');
    data.data.map((gif) => {
      const username = gif.username;
      const titulo = gif.title;
      const id_img = gif.id;
      const img_src = gif.images.fixed_height_downsampled.url;
      const img_pop = gif.images.original.url;
      divResutaldosGif.innerHTML += `<div class="container_images_Gif ${id_img}" data-gif_fav="${id_img}" id="${id_img}">
                                      <img id="${id_img}" class="card_Gif" src="${img_src}" alt="${titulo}" />
                                      <div class="card_hover">
                                         <div class="opciones" id="menu_opciones">
                                             <button id="btn_favoritos"><img src="assets/icon-fav-active.png" alt="" data-gif_fav="${id_img}" class="img_btn_favoritos"></button>
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

  /***** borrar favorito */
  let btn_borrarFavoritos = document.getElementById('resultados_Gif')

  btn_borrarFavoritos.addEventListener('click',(e)=>{
    if (e.target && e.target.matches(".img_btn_favoritos")) {
    const gif_fav = e.target.getAttribute('data-gif_fav');
    //const borrarGif = document.getElementsByClassName(`${gif_fav}`);
    //console.log(borrarGif)
    console.log(gif_fav)
      BorrarFavoritos(arregloMisGif,gif_fav)
      console.log(arregloMisGif)
      localStorage.setItem('misGifos', JSON.stringify(arregloMisGif))
      const borrarGif = document.getElementById(`${gif_fav}`);
      btn_borrarFavoritos.removeChild(borrarGif)
      //BorrarGif(gif_fav)
    //console.log(gif_fav)
    /*if(arregloFavoritos.includes(gif_fav)){
        alert('hay repetidos')
    }else{
    arregloFavoritos.push(gif_fav)
    console.log(arregloFavoritos)
    localStorage.setItem('favoritos', JSON.stringify(arregloFavoritos))
  
    putFavoritosNuevos(gif_fav)
    //arregloFavoritos = JSON.parse(localStorage.getItem('favoritos'))
    //console.log(arregloFavoritos)
    //descargaGIF(gif_url)
    //console.log('EUREKA!!!')
    //alert('EUREKA!!!')*/
   }
  });

const BorrarFavoritos = (arr,item)=>{
    const i = arr.indexOf( item );
        if ( i !== -1 ) {
           arr.splice( i, 1 );
        }
        if (i == 0){
          error_sin_resultados.style.display = 'block';
        }
        console.log(item)
        console.log(i)
}
/**** ++++DESCARGA GIF ++++ */


/*****  listener descarga trending */

btn_Trending.addEventListener('click',(e)=>{

  /**** descargas en trending ****/

  if (e.target && e.target.matches(".img_btn_descarga")) {
  const gif_url = e.target.getAttribute('data-gif_url');
  console.log(gif_url)
  descargaGIF(gif_url)
  }
});


btn_Cerrar.addEventListener("click", () => {
  imgPop.src = "";
  Pop.style.display="none";
});



btn_Busqueda.addEventListener('click',(e)=>{
  if (e.target && e.target.matches(".img_pop")) {
  console.log("hola")
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
  console.log("hola");
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
