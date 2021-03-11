/*** Variables API GIPHOS*/

const api_key = "4b7ME2zEwZLCjeqVc7wT1QY37Jyeq702";
let intervalID;
let video = document.getElementById('gifRecorder');

const iniciarCamara = document.getElementById('iniciarCamara');
const crearGif = document.getElementsByClassName('crearGifo');
const Grabar = document.getElementById('Grabar')
const Finalizar = document.getElementById('Finalizar')
const Subir = document.getElementById('Subir')
const numeros = document.getElementsByClassName('numeros')
const loadOverlay = document.getElementsByClassName('loadOverlay');
const checkGifload = document.getElementsByClassName('checkGifload')
const timer = document.getElementById('timer')
const repetirGif = document.getElementById('repetirGif')

function contador(){
    let segundos = 0;
    let minutos = 0;
    let contador = document.getElementById('timer');

    cronometro = setInterval(
        function(){        
            if( segundos == 60) {
                segundos = 0;
                minutos += 1;
            }

            contador.innerHTML = "00:0" + minutos + ":" + segundos;
            segundos += 1;
        }, 1000);
}

function detenerContador() {
    clearInterval(cronometro);
}

var img = document.getElementById('loadGif'),
        recordRTC = null,
        videoURL = '',  
        options = {
            type: 'video',
            video: { width: 320, height: 240 },
            canvas: { width: 320, height: 240 }
        };

/*** funcion iniciar video */

function iniciar() {
    try {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    } catch (e) {
        window.alert('Your browser does not support WebVideo, try Google Chrome');
    }
    if (navigator.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    }).then(async function(stream) {
        recordRTC = new RecordRTC(stream, {
            type: 'gif'
        });

        video.srcObject = stream;
        video.play();
    });
    } else {
        window.alert('Your browser does not support recording, try Google Chrome');
    }
}

/**** grabar */

function grabar() {
        recordRTC.startRecording();
        contador();

}


/***Finalizar */


function finalizar() {
       detenerContador();
        recordRTC.stopRecording(function() {
        blob = recordRTC.getBlob();
        console.log(blob);
        video.style.display = 'none'
        img.src = window.URL.createObjectURL(blob);
     
    });
}

/*****Subir Gif */
function subirGiphy() {
    loadOverlay[0].style.display = 'flex';
    listadoMisGifos = [];
    let formData = new FormData();
    formData.append('file', recordRTC.getBlob(), 'myGif.gif');
    let finalGif = formData.get('file');
    console.log(finalGif);
    fetch('https://upload.giphy.com/v1/gifs?api_key=4b7ME2zEwZLCjeqVc7wT1QY37Jyeq702', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    //.then(data => localStorage.setItem('misGifos', data.data.id))
    .then(data => {
        loadOverlay[0].style.display = 'none';
        checkGifload[0].style.display = 'flex';
        let misGifosTexto = localStorage.getItem('misGifos');
            if (misGifosTexto == null || misGifosTexto == "[]") {
                listadoMisGifos = [];
            } else {
                listadoMisGifos = JSON.parse(misGifosTexto);
            }
            const Gifid = data.data.id;
            CrearBotones(Gifid)
            listadoMisGifos.push(data.data.id);
            misGifosTexto = JSON.stringify(listadoMisGifos);
            localStorage.setItem('misGifos', misGifosTexto);
            console.log(localStorage.getItem('misGifos'));
    })
    .catch(err => console.log(err));
}

/******** CEREAR BOTONES DE DESCARGA Y VINCULO   *****/

const descarga = document.getElementById('descarga');
const vinculo = document.getElementById('vinculo');

const CrearBotones = async (Gifid) => {
    const response = await fetch(`https://api.giphy.com/v1/gifs?ids=${Gifid}&api_key=${api_key}`);
    const data = await response.json();
      data.data.map((gif) => {
      const img_src = gif.images.original.url;
      console.log(img_src);
      descarga.setAttribute('url_gif', img_src);
      vinculo.setAttribute('url_gif', img_src);
      });
  };



iniciarCamara.addEventListener('click',ev =>{ 
    ev.preventDefault();
    console.log('iniciar');
    crearGif[0].classList.add('inactivo');
    Grabar.style.display = 'block';
    iniciarCamara.style.display = 'none';
    numeros[0].classList.add('activo')
    iniciar();
});

Grabar.addEventListener('click',ev =>{ 
    ev.preventDefault();
    console.log('grabar');
    //crearGif[0].classList.add('inactivo');
    Finalizar.style.display = 'block';
    Grabar.style.display = 'none';
    numeros[0].classList.remove('activo')
    numeros[1].classList.add('activo')
    timer.style.display = 'block';
    grabar();
});

Finalizar.addEventListener('click',ev =>{ 
    ev.preventDefault();
    console.log('finalizar');
    //crearGif[0].classList.add('inactivo');
    Finalizar.style.display = 'none';
    Subir.style.display = 'block';
    numeros[1].classList.remove('activo')
    numeros[2].classList.add('activo')
    timer.style.display = 'none';
    repetirGif.style.display = 'block'
    finalizar();
});
repetirGif.addEventListener('click',ev =>{ 
    ev.preventDefault();
    console.log('repetirgif')
    //console.log(blob);
    img.src = 'assets/gifo.png'
    video.style.display = 'block'
    
    repetirGif.style.display = 'none';
    Subir.style.display = 'none';
    //crearGif[0].classList.add('activo');
    Grabar.style.display = 'block';
    numeros[2].classList.remove('activo')
    numeros[1].classList.add('activo')
    iniciar();
});

Subir.addEventListener('click',ev =>{ 
    ev.preventDefault();
    console.log('subir');
    //crearGif[0].classList.add('inactivo');
    Finalizar.style.display = 'none';
    Subir.style.display = 'none';
    numeros[1].classList.remove('activo')
    numeros[2].classList.add('activo')
    timer.style.display = 'none';
    repetirGif.style.display = 'none'
    subirGiphy()
});

/******** DESCARGA MY GIF */


/**** descarga el GIF *****/


async function descargaGIF(url) {
    let a = document.createElement('a');
    let response = await fetch(url);
    let file = await response.blob();
    a.download = 'miGifo.gif';
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
  }

function vinculoGif(url){
    let aux = document.createElement("input");
	aux.value =url;
	document.body.appendChild(aux);
	aux.select();
	document.execCommand("copy");
	document.body.removeChild(aux);
	alert("Link del Gif Copiado al Portapapeles");

  }
/******** listener botones de descarga y vinculo ******/
const botones = document.getElementById('botones')

botones.addEventListener('click',(e)=>{
 if (e.target && e.target.matches('#descarga')) {
  const gif_url = e.target.getAttribute('url_gif');
  descargaGIF(gif_url)
  }
  if (e.target && e.target.matches('#vinculo')) {
    const gif_url1 = e.target.getAttribute('url_gif');
    vinculoGif(gif_url1)
    }
});