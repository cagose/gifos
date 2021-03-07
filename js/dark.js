const btnCambio = document.querySelector('#cambio');

window.addEventListener('load', function(event) {
        
	// Guardamos el modo en localstorage.
	if(document.body.classList.contains('dark')){
                localStorage.setItem('dark-mode', 'true');
                document.getElementById('logoImg').src='../assets/logo-modo-noc.svg';
                if(document.body.classList.contains('crear')){
                document.getElementById('cinta1').src='../assets/element_cinta1-modo-noc.svg';
                document.getElementById('cinta2').src='../assets/element_cinta2-modo-noc.svg';
                document.getElementById('camara_img').src='../assets/element-camara-noc.png';
                document.getElementById('pelicula_img').src='../assets/pelicula-modo-noc.svg';
                }

                //titulo.innerHTML = "Modo Dia";
                } else {
                localStorage.setItem('dark-mode', 'false');
                 document.getElementById('logoImg').src='../assets/logo-desktop.svg';
                 if(document.body.classList.contains('crear')){
                 document.getElementById('cinta1').src='../assets/element_cinta1.svg';
                 document.getElementById('cinta2').src='../assets/element_cinta2.svg';
                 document.getElementById('camara_img').src='../assets/element-camara.svg';
                 document.getElementById('pelicula_img').src='../assets/pelicula.svg';
                 }
                 document.getElementById('cambio').innerHTML = 'Modo nocturno';
                }
      });
//const titulo = document.getElementsById("cambio");

btnCambio.addEventListener('click', () => {
	document.body.classList.toggle('dark');
        btnCambio.classList.toggle('active');
    
	// Guardamos el modo en localstorage.
	if(document.body.classList.contains('dark')){
        document.getElementById('cambio').innerHTML = 'Modo dia';
        localStorage.setItem('dark-mode', 'true');
        document.getElementById('logoImg').src='../assets/logo-modo-noc.svg';
        if(document.body.classList.contains('crear')){
        document.getElementById('cinta1').src='../assets/element_cinta1-modo-noc.svg';
        document.getElementById('cinta2').src='../assets/element_cinta2-modo-noc.svg';
        document.getElementById('camara_img').src='../assets/element-camara-noc.png';
        document.getElementById('pelicula_img').src='../assets/pelicula-modo-noc.svg';
        }
        
        
        //titulo.innerHTML = "Modo Dia";
	} else {
        localStorage.setItem('dark-mode', 'false');
         document.getElementById('logoImg').src='../assets/logo-desktop.svg';
         if(document.body.classList.contains('crear')){
         document.getElementById('cinta1').src='../assets/element_cinta1.svg';
         document.getElementById('cinta2').src='../assets/element_cinta2.svg';
         document.getElementById('camara_img').src='../assets/element-camara.svg';
         document.getElementById('pelicula_img').src='../assets/pelicula.svg';
         }
         document.getElementById('cambio').innerHTML = 'Modo nocturno';
	}
});

// Obtenemos el modo actual.
if(localStorage.getItem('dark-mode') === 'true'){
	document.body.classList.add('dark');
} else {
	document.body.classList.remove('dark');
}