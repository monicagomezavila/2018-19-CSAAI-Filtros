function main() {

  console.log("NOTA IMPORTANTE");
  console.log("EL negativo trabaja tanto en grises como en color");
  console.log("Si quieres quitar el negativo, haz el negativo del negativo ;)");

  //--Deslizador y valor para la componente ROJA
  var deslizadorR = document.getElementById('deslizadorR');
  var range_valueR = document.getElementById('range_valueR');

  //--Deslizador y valor para la componente VERDE
  var deslizadorG = document.getElementById('deslizadorG');
  var range_valueG = document.getElementById('range_valueG');

  //--Deslizador y valor para la componente AZUL
  var deslizadorB = document.getElementById('deslizadorB');
  var range_valueB = document.getElementById('range_valueB');

  //--Botones para detectar si el filtro se aplica en color o escala de grises y en negativo o no
  var grises = document.getElementById('grises');
  var colores = document.getElementById('colores');
  var negativo = document.getElementById('negativo');

  //--Variable que guarda si los cambios que se hacen el los deslizadores
  //hay que aplicarlos a color o a grises
  //--Empieza en true, porque el filtro por defecto es en color
  var color_boolean = true;

  //--Variable que guarda si los cambios que se hacen el los deslizadores
  //hay que aplicarlos en negativo o no
  //--Empieza en false, porque el filtro por defecto es sin negativo
  var negativo_boolean = false;

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



  //--FUNCION PARA CAMBIAR EL VALOR RGB DE LA IMAGEN
  function im_color(){
    //-- Nuevo valor del deslizador, mostrarlo en pantalla
    range_valueR.innerHTML = deslizadorR.value
    range_valueG.innerHTML = deslizadorG.value
    range_valueB.innerHTML = deslizadorB.value

    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    data = imgData.data

    umbralR = deslizadorR.value
    umbralG = deslizadorG.value
    umbralB = deslizadorB.value

    //--Bucle para cambiar pixel a pixel el valor ROJO,VERDE,AZUL
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



  //--FUNCION PARA PONER EN GRIS LA IMAGEN
  function im_grises(){
    //--Obtiene los valores RGB de cada pixel
    //posteriormente calcula el nivel de grises y lo asigna a ese pixel
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



  //FUNCION PARA PONER EN NEGATIVO LA IMAGEN
  function im_negativo(){
    //--Obtiene los valores RGB de cada pixel
    //posteriormente calcula el negativo y lo asigna a ese pixel
    for (var i = 0; i < data.length; i+=4) {
      newR = 255 - data[i];
      newG = 255 - data[i+1];
      newB = 255 - data[i+2];

      data[i] = newR;
      data[i+1] = newG;
      data[i+2] = newB;
    }
  }



  // FUNCION QUE APLICA EL FILTRADO
  function filtrado(){
    //--Imagen en color y sin negativo
    if (color_boolean && !negativo_boolean){
      im_color()
    //--Imagen en color y negativo
    }else if (color_boolean && negativo_boolean){
      im_color()
      im_negativo()
    //--Imagen en grises y sin negativo
    }else if (!color_boolean && !negativo_boolean){
      im_color()
      im_grises()
    //--Imagen en grises y con negativo
    }else if (!color_boolean && negativo_boolean){
      im_color()
      im_grises()
      im_negativo()
    }
  }


  //-- Retrollamada del deslizador ROJO
  deslizadorR.oninput = () => {
    filtrado()
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }


  //-- Retrollamada del deslizador VERDE
  deslizadorG.oninput = () => {
    filtrado()
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }

  //-- Retrollamada del deslizador AZUL
  deslizadorB.oninput = () => {
    filtrado()
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }

  colores.onclick = () =>{
    //--Cambia el valor de color a true
    //--Los cambios en los deslizadores se aplicaran en color
    color_boolean = true;
    im_color()
    if (negativo_boolean){
      //--Como im_color coge los valores de los deslizadores
      //si se quiere la imagen en color y negativo = true, hay que volver a pasar el negativo
      im_negativo()
    }
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }

  grises.onclick = () =>{
    //--Cambia el valor de color a false
    //--Los cambios en los deslizadores se aplicaran en grises
    color_boolean = false;
    im_grises()
    ctx.putImageData(imgData, 0, 0);
    //--Si la imagen se quiere en blanco y negro y negativo
    //no hay que volver a pasar negativo_im porque grises_im coge los valores de los pixels
  }

  negativo.onclick = () =>{
    //Va cambiando el valor de negativo segun se quiere aplicar o no
    if (negativo_boolean){
      negativo_boolean = false;
    }else{
      negativo_boolean = true;
    }

    im_negativo()
    ctx.putImageData(imgData, 0, 0);
  }

}
