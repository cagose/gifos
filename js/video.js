const startRecord = document.querySelector('#startRecord')

const stopRecord = document.querySelector('#stopRecord')

const videoPreview = document.querySelector('video')

const initVideo = async () => {

// Pedimos permiso a la camara

let stream = await navigator.mediaDevices.getUserMedia({

 video: true
  });
  videoPreview.srcObject = stream
  // Inicializar la libreria RecordRTC

  let recorder = new RecordRTCPromisesHandler(stream, {

    type: 'video'

  });

  // handler de iniciar grabacion

  const startRecordHandler = () => {

    videoPreview.srcObject = stream

    recorder.startRecording()

  }

  // handler de parar grabacion

  const stopRecordHandler = async () => {

    // paramos la grabacion

    await recorder.stopRecording()

    // obtenemos el file de video

    let blob = await recorder.getBlob()

    // sacamos la camara del <video>

    videoPreview.srcObject = null

    // ponemos en <video> el video ya grabado

    videoPreview.src = URL.createObjectURL(blob)
    const formData = new FormData()
    formData.append('file', blob)
    // enviar POST con formData en el body (body:formData)
  }

  startRecord.addEventListener('click', startRecordHandler)

  stopRecord.addEventListener('click', stopRecordHandler)

}

initVideo()