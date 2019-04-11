function main() {

  var img = document.getElementById('imagesrc')
  var canvas = document.getElementById('display');

  var deslizadorR = document.getElementById('deslizadorR')
  var range_valueR = document.getElementById('range_valueR')

  var deslizadorG = document.getElementById('deslizadorG')
  var range_valueG = document.getElementById('range_valueG')

  var deslizadorB = document.getElementById('deslizadorB')
  var range_valueB = document.getElementById('range_valueB')

  var grises = document.getElementById('grises')
  var colores = document.getElementById('colores')
  var color = true;

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Obtener el contexto del canvas para trabajar con el
  var ctx = canvas.getContext("2d");

  //-- Situar la imagen original en el canvas
  ctx.drawImage(img, 0,0);


  //-- Obtener la imagen del canvas en pixeles
  var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //-- Obtener el array con todos los píxeles
  var data = imgData.data


  //-- Funcion de retrollamada del deslizador
  deslizadorR.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
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

    //-- Obtener el umbral de rojo del desliador
    umbralR = deslizadorR.value
    umbralG = deslizadorG.value
    umbralB = deslizadorB.value

    //-- Filtrar la imagen según el nuevo umbral
    for (var i = 0; i < data.length; i+=4) {
      if (data[i] > umbralR)
        data[i] = umbralR;for (var i = 0; i < data.length; i+=4) {
      if (data[i] > umbralR)
        data[i] = umbralR;
    }

    }

    for (var i = 1; i < data.length; i+=4) {
      if (data[i] > umbralG)
        data[i] = umbralG;
    }

    for (var i = 2; i < data.length; i+=4) {
      if (data[i] > umbralB)
        data[i] = umbralB;
    }



    //-- Poner la imagen modificada en el canvas
    if (color == true){
      ctx.putImageData(imgData, 0, 0);
    }
  }


  //-- Funcion de retrollamada del deslizador
  deslizadorG.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
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

    //-- Obtener el umbral de rojo del desliador
    umbralR = deslizadorR.value
    umbralG = deslizadorG.value
    umbralB = deslizadorB.value

    for (var i = 0; i < data.length; i+=4) {
      if (data[i] > umbralR)
        data[i] = umbralR;
    }

    //-- Filtrar la imagen según el nuevo umbral
    for (var i = 1; i < data.length; i+=4) {
      if (data[i] > umbralG)
        data[i] = umbralG;
    }

    for (var i = 2; i < data.length; i+=4) {
      if (data[i] > umbralB)
        data[i] = umbralB;
    }

    //-- Poner la imagen modificada en el canvas
    if (color == true){
      ctx.putImageData(imgData, 0, 0);
    }
  }


  deslizadorB.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
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

    //-- Obtener el umbral de rojo del desliador
    umbralR = deslizadorR.value
    umbralG = deslizadorG.value
    umbralB = deslizadorB.value


    for (var i = 0; i < data.length; i+=4) {
      if (data[i] > umbralR)
        data[i] = umbralR;
    }

    //-- Filtrar la imagen según el nuevo umbral
    for (var i = 1; i < data.length; i+=4) {
      if (data[i] > umbralG)
        data[i] = umbralG;
    }

    for (var i = 2; i < data.length; i+=4) {
      if (data[i] > umbralB)
        data[i] = umbralB;
    }

    //-- Poner la imagen modificada en el canvas
    if (color == true){
      ctx.putImageData(imgData, 0, 0);
    }
  }

  colores.onclick = () =>{
    color = true;
  }

  grises.onclick = () =>{
    umbralR = deslizadorR.value
    umbralG = deslizadorG.value
    umbralB = deslizadorB.value
    color = false;

    var brillo = (3 *  umbralR + 4*umbralG + 1*umbralB)/8
    console.log(brillo)

    for (var i = 0; i < data.length; i+=4) {
        data[i] = brillo;
    }

    //-- Filtrar la imagen según el nuevo umbral
    for (var i = 1; i < data.length; i+=4) {
        data[i] = brillo;
    }

    for (var i = 2; i < data.length; i+=4) {
        data[i] = brillo;
    }
    if (!color){
      ctx.putImageData(imgData, 0, 0);
    }
  }

}
