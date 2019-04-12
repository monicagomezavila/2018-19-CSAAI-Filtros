function main() {

  var deslizadorR = document.getElementById('deslizadorR')
  var range_valueR = document.getElementById('range_valueR')

  var deslizadorG = document.getElementById('deslizadorG')
  var range_valueG = document.getElementById('range_valueG')

  var deslizadorB = document.getElementById('deslizadorB')
  var range_valueB = document.getElementById('range_valueB')

  var grises = document.getElementById('grises')
  var colores = document.getElementById('colores')

  //Variable que guarda si los cambios que se hacen el los deslizadores
  //tienes que aplicarse a color o a gris
  var color = true;

  var img = document.getElementById('imagesrc')
  var canvas = document.getElementById('display');

  canvas.width = img.width;
  canvas.height = img.height;

  var ctx = canvas.getContext("2d");

  //-- Situar la imagen original en el canvas
  ctx.drawImage(img, 0,0);
  //-- Obtener la imagen del canvas en pixeles
  var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //-- Obtener el array con todos los píxeles
  var data = imgData.data


//FUNCION A LA QUE SE LLAMA PARA CAMBIAR EL COLOR DE LA IMAGEN
  function im_color(){
    //-- Nuevo valor del deslizador
    range_valueR.innerHTML = deslizadorR.value
    range_valueG.innerHTML = deslizadorG.value
    range_valueB.innerHTML = deslizadorB.value

    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    data = imgData.data

    umbralR = deslizadorR.value
    umbralG = deslizadorG.value
    umbralB = deslizadorB.value

    for (var i = 0; i < data.length; i+=4) {
      if (data[i] > umbralR){
        data[i] = umbralR;
      }
      if (data[i+1] > umbralG){
        data[i+1] = umbralG;
      }
      if (data[i+2] > umbralB){
        data[i+2] = umbralB;
      }
  }
}

//--------------------------------------------------------------
//FUNCION A LA QUE SE LLAMA PARA PONER EL GRIS LA IMAGEN

  function im_grises(){
    for (var i = 0; i < data.length; i+=4) {
      R = data[i];
      G = data[i+1];
      B = data[i+2];
      var brillo = (3 *  R + 4*G + 1*B)/8

      data[i] = brillo;
      data[i+1] = brillo;
      data[i+2] = brillo;
    }
  }


  //-- Funcion de retrollamada del deslizador ROJO
  deslizadorR.oninput = () => {
    if (color){
      im_color()
    }else{
      im_color()
      im_grises()
    }
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }


  //-- Funcion de retrollamada del deslizador VERDE
  deslizadorG.oninput = () => {
    if (color){
      im_color()
    }else{
      im_color()
      im_grises()
    }
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }

  //-- Funcion de retrollamada del deslizador AZUL
  deslizadorB.oninput = () => {
    if (color){
      im_color()
    }else{
      im_color()
      im_grises()
    }
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }

  colores.onclick = () =>{
    color = true;
    im_color()
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }

  grises.onclick = () =>{
    color = false;
    im_grises()
    ctx.putImageData(imgData, 0, 0);
  }

}
