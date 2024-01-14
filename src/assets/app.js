let principal; //Elemento principal padre
let main; //Elemento principal padre
let mainClone; //Elemento principal padre
let template; //Elemento principal padre
let h1; //Elemento H1 para clonar
let img; //Elemento IMG para clonar
let elementos; //Lista de todos los elementos existentes
let offset = [0,0]; //
let offsetClick = [0,0]; //
let isDown = false;
let elementoMover;
let elementoClickeado = null;

//Controles
let ctrIdElement;
let ctrFontSize;
let ctrFontColor;
let ctrbtnEliminar;
let ctrctrAncho;
let ctrText;
let ctrTextAlign;
let ctrImgSource;
let ctrBold;
let ctrItalic;
let ctrAnchoImg;
let ctrAltoImg;

//Elementos que se este editando
let elementTextInputRef;
let elementTextH1Ref;

function recuperar() {
  template = document.getElementById('template');
  const info = localStorage.getItem('content');
  if(info){
    main.innerHTML = '';
    mainClone.innerHTML = info;
    for (let index = 0; index < mainClone.children.length; index++) {
      for (let j = 0; j < template.children.length; j++) {
        console.log(mainClone.children[index].tagName, ' + ', template.children[j].tagName);
        if(mainClone.children[index].tagName === template.children[j].tagName){
          let elem = template.children[j].cloneNode();
          elem.style.fontSize = mainClone.children[index].style.fontSize;
          elem.style.left = mainClone.children[index].style.left;
          elem.style.top = mainClone.children[index].style.top;
          elem.style.color = mainClone.children[index].style.color;
          elem.style.width = mainClone.children[index].style.width;
          elem.style.textAlign = mainClone.children[index].style.textAlign;
          elem.style.fontStyle = mainClone.children[index].style.fontStyle;
          elem.style.fontWeight = mainClone.children[index].style.fontWeight;
          elem.innerText = mainClone.children[index].innerText;
          if(mainClone.children[index].hasAttribute("src")){
            elem.setAttribute("src", mainClone.children[index].getAttribute("src"));
          }
          if(mainClone.children[index].hasAttribute("id")){
            elem.setAttribute("id", mainClone.children[index].getAttribute("id"));
          }
          main.appendChild(elem);
        }
      }
    }
  }
}

// function getBase64Image(img) {
//   var canvas = document.createElement("canvas");
//   canvas.width = img.width;
//   canvas.height = img.height;
//   var ctx = canvas.getContext("2d");
//   ctx.drawImage(img, 0, 0);
//   return canvas.toDataURL("image/png").split(';base64,')[1];
//   return dataURL.replace(/^data:image\/?[A-z]*;base64,/);
// }

// const toDataURL = url => fetch(url, {method: "GET",
// mode: "cors", headers: {
//   "Access-Control-Allow-Origin": "*"
// }})
//   .then(response => response.blob())
//   .then(blob => new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.onloadend = () => resolve(reader.result)
//     reader.onerror = reject
//     reader.readAsDataURL(blob)
//   }))

/**
 * Almacena toda la información existente en el contenedor padre hacia la base de datos para cuando se
 * vuelve a visitar la página, cargue con dicha información
 */
function guardar() {
  const guardarCambios = document.querySelector('#content');
  localStorage.setItem('content', guardarCambios.innerHTML);
}

function activarDesactivarControles() {
  if(elementoClickeado !== null) {
    ctrIdElement.removeAttribute("disabled");
    ctrAncho.removeAttribute("disabled");
    ctrFontSize.removeAttribute("disabled");
    ctrFontColor.removeAttribute("disabled");
    ctrbtnEliminar.removeAttribute("disabled");
    ctrTextAlign.removeAttribute("disabled");
    if(elementoClickeado.tagName === 'IMG') {
      ctrImgSource.removeAttribute("disabled");
    }
    ctrAltoImg.removeAttribute("disabled");
    ctrBold.removeAttribute("disabled");
    ctrText.removeAttribute("disabled");
    ctrItalic.removeAttribute("disabled");
    ctrAnchoImg.removeAttribute("disabled");
  } else {
    ctrAltoImg.setAttribute("disabled", "disabled");
    ctrText.setAttribute("disabled", "disabled");
    ctrAnchoImg.setAttribute("disabled", "disabled");
    ctrImgSource.setAttribute("disabled", "disabled");
    ctrBold.setAttribute("disabled", "disabled");
    ctrItalic.setAttribute("disabled", "disabled");
    ctrImgSource.value = '';
    ctrTextAlign.setAttribute("disabled", "disabled");
    ctrAncho.setAttribute("disabled", "disabled");
    ctrIdElement.setAttribute("disabled", "disabled");
    ctrIdElement.value = '';
    ctrFontSize.setAttribute("disabled", "disabled");
    ctrFontSize.value = '';
    ctrFontColor.setAttribute("disabled", "disabled");
    ctrFontSize.value = '#000000';
    ctrbtnEliminar.setAttribute("disabled", "disabled");
  }
}

function seleccionarElemento(elem){
  if(elementoClickeado!==null){
    const elementoAnteriorClickeado = document.querySelector('.elementoSeleccionado');
    if(elementoAnteriorClickeado !== null)
      elementoAnteriorClickeado.classList.remove('elementoSeleccionado');
  }
  elementoClickeado = elem;
  elementoClickeado.classList.add('elementoSeleccionado');
  ctrFontSize.value = elementoClickeado.style.fontSize.slice(0,elementoClickeado.style.fontSize.length-2);
  ctrAncho.value = elementoClickeado.style.width.slice(0,elementoClickeado.style.width.length-2);
  ctrAltoImg.value = elementoClickeado.style.height.slice(0,elementoClickeado.style.height.length-2);
  ctrAnchoImg.value = elementoClickeado.style.width.slice(0,elementoClickeado.style.width.length-2);
  ctrBold.value = elementoClickeado.style.fontWeight === 'bold';
  ctrItalic.value = elementoClickeado.style.fontStyle === 'italic';
  ctrAnchoImg.value = elementoClickeado.style.width.slice(0,elementoClickeado.style.width.length-2);
  ctrFontColor.value = rgbToHex(elementoClickeado.style.color);
  ctrTextAlign.value = llenarTextoAlin();
  if(elementoClickeado.tagName !== 'IMG'){
    ctrText.value = elementoClickeado.innerText;
  }
  if(elementoClickeado.hasAttribute("src")){
      ctrImgSource.value = elementoClickeado.getAttribute("src");
  } 
  if(elementoClickeado.hasAttribute("id")){
      ctrIdElement.value = elementoClickeado.getAttribute("id");
  } else {
    ctrIdElement.value = '';
  }
}

 function llenarTextoAlin() {
  if(elementoClickeado.style.textAlign == 'start')
    return "izq";
  else if(elementoClickeado.style.textAlign == 'center')
    return "cen";
  else if(elementoClickeado.style.textAlign == 'end')
    return "der";
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHexFinal(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentFromStr(numStr, percent) {
  var num = Math.max(0, parseInt(numStr, 10));
  return percent ?
      Math.floor(255 * Math.min(100, num) / 100) : Math.min(255, num);
}

function rgbToHex(rgb) {
  var rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
  var result, r, g, b, hex = "";
  if ( (result = rgbRegex.exec(rgb)) ) {
      r = componentFromStr(result[1], result[2]);
      g = componentFromStr(result[3], result[4]);
      b = componentFromStr(result[5], result[6]);
      return rgbToHexFinal(r, g, b);
  }
  return hex;
}

function crearElemento(id){
  if(id==0){ //h1
    const nuevoLabel = h1.cloneNode();
    nuevoLabel.style.left = "0px";
    nuevoLabel.style.top = "0px";
    nuevoLabel.innerText = 'Nuevo Texto';
    nuevoLabel.style.fontWeight = "normal";
    nuevoLabel.style.fontStyle = "normal";
    main.insertBefore(nuevoLabel, elementos[elementos.length-1]);
    nuevoLabel.ondblclick = function(){
      const inputText = document.createElement('input');
      inputText.style.display = "block";
      inputText.style.position = "fixed";
      inputText.style.marginTop = "35px";
      inputText.style.marginLeft = "20px";
      inputText.style.marginLeft = "20px";
      inputText.style.left = nuevoLabel.style.left;
      inputText.style.top = nuevoLabel.style.top;
      inputText.value = nuevoLabel.innerHTML;
      inputText.style.fontSize = "30px";
      elementTextInputRef = inputText;
      elementTextH1Ref = nuevoLabel;
      nuevoLabel.style.display = "none";
      nuevoLabel.parentElement.appendChild(inputText);
      inputText.focus();
    };
    nuevoLabel.addEventListener('mousedown', function(e) {
        isDown = true;
        startDrag();
        offset = [
          nuevoLabel.offsetLeft - e.clientX,
          nuevoLabel.offsetTop - e.clientY
        ];
        offsetClick = [
          e.clientX,
          e.clientY
        ];
        elementoMover = nuevoLabel;
    }, true);
  } else if (id==1) { //img
    const nuevoImg = img.cloneNode();
    nuevoImg.style.left = "0px";
    nuevoImg.style.top = "0px";
    nuevoImg.style.width = "50px";
    nuevoImg.style.height = "80px";
    nuevoImg.src = '/assets/A.png';
    main.insertBefore(nuevoImg, elementos[elementos.length-1]);
    nuevoImg.addEventListener('mousedown', function(e) {
      e.preventDefault();
        isDown = true;
        startDrag();
        offset = [
          nuevoImg.offsetLeft - e.clientX,
          nuevoImg.offsetTop - e.clientY
        ];
        offsetClick = [
          e.clientX,
          e.clientY
        ];
        elementoMover = nuevoImg;
    }, true);
    nuevoImg.ondragstart = function() { return false; };
  }
}

function reiniciar() {
  for (let index = 0; index < elementos.length; index++) {
    const element = elementos[index];
    element.style.width = element.style.width==="" ? "100px": element.style.width;
    element.style.fontStyle = element.style.fontStyle==="" ? "normal": element.style.fontStyle;
    element.style.fontWeight = element.style.fontWeight==="" ? "normal": element.style.fontWeight;
    element.style.fontSize = element.style.fontSize==="" ? "50px": element.style.fontSize;
    element.style.color = element.style.color==="" ? "#000000": element.style.color;
    element.style.textAlign = element.style.textAlign==="" ? "start": element.style.textAlign;
    element.ondblclick = function(){
      const inputText = document.createElement('input');
      inputText.style.display = "block";
      inputText.style.position = "fixed";
      inputText.style.marginTop = "35px";
      inputText.style.marginLeft = "20px";
      inputText.style.left = element.style.left;
      inputText.style.top = element.style.top;
      inputText.value = element.innerHTML;
      inputText.style.fontSize = "30px";
      elementTextInputRef = inputText;
      elementTextH1Ref = element;
      element.style.display = "none";
      element.parentElement.appendChild(inputText);
      inputText.focus();
    };
    element.addEventListener('mousedown', function(e) {
        isDown = true;
        startDrag();
        offset = [
          element.offsetLeft - e.clientX,
          element.offsetTop - e.clientY
        ];
        offsetClick = [
          e.clientX,
          e.clientY
        ];
        elementoMover = element;
    }, true);
    if(element.tagName == 'IMG') element.ondragstart = function() { return false; };
  }
}

function guardarTexto() {
  if(elementTextH1Ref == null|| elementTextInputRef == null || elementTextInputRef.parentElement == null){
    return;
  }
  elementTextH1Ref.innerHTML = elementTextInputRef.value;
  main.removeChild(elementTextInputRef);
  elementTextH1Ref.style.display = "block";
  elementTextH1Ref.classList.add("elementoEditado");
  const index = elementos.indexOf(elementoMover);
  elementos[index] = document.querySelector('.elementoEditado');
  elementos[index].classList.remove("elementoEditado");
  if(elementTextH1Ref.innerText==""){
    main.removeChild(elementTextH1Ref);
  }
}

function cancelarTexto() {
  if(!elementTextH1Ref || !elementTextInputRef){
    return;
  }
  elementTextInputRef.parentElement.removeChild(elementTextInputRef);
  elementTextH1Ref.style.display = "block";
}

function disableSelect(event) {
  event.preventDefault();
}

function startDrag(event) {
  window.addEventListener('mouseup', onDragEnd);
  window.addEventListener('selectstart', disableSelect);
}

function onDragEnd() {
  window.removeEventListener('mouseup', onDragEnd);
  window.removeEventListener('selectstart', disableSelect);
}

/**
 * Funcion principal en la cual se ejecuta por defecto una vez terminada la carga de la página
 */
function iniciar() {
  main = document.querySelector('#content'); //Obtiene referencia al contenedor principal 
  principal = document.querySelector('.principal'); //Obtiene referencia al contenedor principal 
  mainClone = main.cloneNode(); //Se almacena un clon del contenedor principal, perdiendo la referencia para que los cambios generados en esta no sean visibles
  h1 = document.querySelector('h1'); //Genera una referencia a un elemento h1 utilizado para implementar los elementos H1 a la referencia de la página
  img = document.querySelector('img'); //Genera una referencia a un elemento img utilizado para implementar los elementos H1 a la referencia de la página
  recuperar(); //Revisa si existe alguna información guardada
  var mousePosition; 
  elementos = Array.prototype.slice.call(main.children); //Almacena todos los hijos existentes del contenedor padre
  document.addEventListener('keydown', function(key){
    if(key.key === 'Enter'){
      guardarTexto();
      return;
    }
    if(key.key === 'Escape'){
      cancelarTexto();
      return;
    }
  });
  reiniciar();
  document.addEventListener('mouseup', function(event) {
    isDown = false;
    onDragEnd();
    if(event.target.tagName === "INPUT") 
      return;
    guardarTexto();
  }, true);

  document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    console.log(elementoClickeado.style.height);
    if (isDown) {
        mousePosition = {
            x : event.clientX,
            y : event.clientY
        };
        const index = elementos.indexOf(elementoMover);
        console.log(mousePosition.x + offset[0] + 'px', main.style.left);
        if((mousePosition.x + offset[0]) + 'px' < main.style.left){
          // elementoMover.style.top  = (mousePosition.y + offset[1]-30) + 'px';
        } else {
          elementoMover.style.left = (mousePosition.x + offset[0]) + 'px';
          elementoMover.style.top  = (mousePosition.y + offset[1]-30) + 'px';
        }
        
    }
  }, true);

  if(ctrFontSize==null){
    ctrFontSize = document.getElementById('ctrFontSize');
    ctrbtnEliminar = document.getElementById('btnEliminar');
    ctrFontColor = document.getElementById('ctrFontColor');
    ctrAncho = document.getElementById('ctrAncho');
    ctrTextAlign = document.getElementById('ctrTextAlign');
    ctrImgSource = document.getElementById('ctrImgSource');
    ctrText = document.getElementById('ctrText');
    ctrBold = document.getElementById('ctrBold');
    ctrItalic = document.getElementById('ctrItalic');
    ctrAnchoImg = document.getElementById('ctrAnchoImg');
    ctrAltoImg = document.getElementById('ctrAltoImg');
    ctrIdElement = document.getElementById('ctrIdElement');

    if(ctrFontSize!=null){
      ctrFontSize.addEventListener('input', function(event) {
        elementoClickeado.style.fontSize = event.target.value+'px';
      }, true);
      ctrbtnEliminar.addEventListener('click', function(){
        if(elementoClickeado!==null){
          main.removeChild(elementoClickeado);
          elementoClickeado = null;
          elementTextH1Ref = null;
          activarDesactivarControles();
        }
      });
      ctrFontColor.addEventListener('change', function(event) {
        elementoClickeado.style.color = event.target.value;
      });
      ctrIdElement.addEventListener('change', function(event) {
        elementoClickeado.setAttribute("id", event.target.value);
      });
      ctrText.addEventListener('input', function(event) {
        elementoClickeado.innerText = event.target.value;
      });
      ctrBold.addEventListener('input', function(event) {
        elementoClickeado.style.fontWeight = event.target.checked ? 'bold' : 'normal';
      });
      ctrItalic.addEventListener('input', function(event) {
        elementoClickeado.style.fontStyle = event.target.checked ? 'italic' : 'normal';
      });
      ctrAncho.addEventListener('change', function(event) {
        elementoClickeado.style.width = event.target.value+'px';
      });
      ctrAnchoImg.addEventListener('change', function(event) {
        elementoClickeado.style.width = event.target.value+'px';
      });
      ctrAltoImg.addEventListener('change', function(event) {
        elementoClickeado.style.height = event.target.value+'px';
      });
      ctrImgSource.addEventListener('input', function(event) {
        if(elementoClickeado.tagName!=='IMG') return;
        elementoClickeado.setAttribute('src', event.target.value);
      });
      ctrTextAlign.addEventListener('input', function(event) {
        console.log(event);
        switch(event.target.value){
          case 'izq':
            elementoClickeado.style.textAlign = 'start';
            break;
          case 'cen':
            elementoClickeado.style.textAlign = 'center';
            break;
          case 'der':
            elementoClickeado.style.textAlign = 'end';
            break;
        }
      });
    }

  }

  main.addEventListener('mousedown', function(event) {
    if(event.target.tagName !== 'INPUT'){
      event.preventDefault();
    }
    if(event.target.tagName !== "DIV") {
      seleccionarElemento(event.target)
    } else if(elementoClickeado !== null){
      elementoClickeado.classList.remove('elementoSeleccionado');
      elementoClickeado = null;
    }
    activarDesactivarControles();
  });
  if(principal!==null){
    principal.addEventListener('mousedown', function(event) {
      if(event.target.tagName === "DIV" && !event.target.parentElement.classList.contains('canvas')) {
        elementoClickeado.classList.remove('elementoSeleccionado');
        elementoClickeado = null;
        activarDesactivarControles();
      }
    });
  }
}