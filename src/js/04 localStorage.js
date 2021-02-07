"use strict";

function getUserData() {
  return {
    photo: photo,
    palette: parseInt(document.querySelector('.js-palette:checked').value),
    name: document.querySelector('.js-fullname').value,
    job: document.querySelector('.js-position').value,
    email: document.querySelector('.js-email').value,
    phone: document.querySelector('.js-phone').value,
    linkedin: document.querySelector('.js-linkedin').value,
    github: document.querySelector('.js-github').value
  };
}

// cuando la usuaria cambia cualquier cosa en el formulario debemos llamar a esta función
function saveInLocalStorage() {
  // debugger;
  // obtengo los valores de todos los campos
  // const userData = {
  //   photo: photo,
  //   palette: document.querySelector(".js-palette:checked").value,
  //   name: document.querySelector(".js-fullname").value,
  //   job: document.querySelector(".js-position").value,
  //   email: document.querySelector(".js-email").value,
  //   phone: document.querySelector(".js-phone").value,
  //   linkedin: document.querySelector(".js-linkedin").value,
  //   github: document.querySelector(".js-github").value,
  // };
  // lo convierto a string porque local storage solo admite strings
  const userDataInString = JSON.stringify(userData);
  // lo guardo en el local storage en el campo que me apetece
  localStorage.setItem("userData", userDataInString);
}

// al arrancar la página recogemos los datos desde el local storage y actualizamos el formulario
function getFromLocalStorage() {
  // obtengo los datos desde el local storage

  const userDataInString = localStorage.getItem("userData");

  // compruebo si hay datos válidos, es decir si la usuaria ya había entrado en nuestra web anteriormente
  if (userDataInString !== null) {
    const userData = JSON.parse(userDataInString);

    // actualizo los inputs del formulario
    document.querySelector(".js-fullname").value = userData.name;
    document.querySelector(".js-position").value = userData.job;
    document.querySelector(".js-email").value = userData.email;
    document.querySelector(".js-phone").value = userData.phone;
    document.querySelector(".js-linkedin").value = userData.linkedin;
    document.querySelector(".js-github").value = userData.github;
    // actualizo la variable global de la foto
    photo = userData.photo;
    // actualizo la paleta, para ello
    // - Recorro las 3 paletas
    // - Compruebo cuál tiene el valor que tengo en el local storage
    // - A la paleta que tiene el valor correcto le hago un .checked = true para activarla

    const paletteElements = document.querySelectorAll(".js-palette");
    for (const paletteElement of paletteElements) {
      if (paletteElement.value === userData.palette) {
        paletteElement.checked = true;
      }
    }

    // propago los datos desde el formulario a la tarjeta

    updateAllInputs();
    handlePalette();
    updatePhoto();
  } else {
    // actualizo los inputs del formulario
    document.querySelector(".js-fullname").value = userData.name;
    document.querySelector(".js-position").value = userData.job;
    document.querySelector(".js-email").value = userData.email;
    document.querySelector(".js-phone").value = userData.phone;
    document.querySelector(".js-linkedin").value = userData.linkedin;
    document.querySelector(".js-github").value = userData.github;
    // actualizo la variable global de la foto
    photo = userData.photo;
    const paletteElements = document.querySelectorAll(".js-palette");
    for (const paletteElement of paletteElements) {
      if (paletteElement.id === "paletteOne") {
        paletteElement.checked = true;
      } else {
        paletteElement.checked = false;
      }
    }
    updateAllInputs();
    handlePalette();
    updatePhoto();
  }
}

/*
Para actualizar la paleta hay otras dos formas de hacerlo:
1º Le pongo a cada radio button de las paletas la clase .palette-1, .palette-2 y .palette-3 y ejecuto
document.querySelector(`.js-palette-${userData.palette}`).checked = true;
2º Hasta ahora hemos utilizado selectores de id, etiqueta y clase para seleccionar elementos
Hay más formas de hacerlo por ejemplo si pongo: document.querySelector('.js-palette[value="2"]')
estoy seleccionando el elemento que tiene la clase .js-palette y que además tiene un atributo que se llama
value y que tiene el valor 2.
Por ello en la función getFromLocalStorage podría haber usado :
document.querySelector(`.js-palette[value="${userData.palette}"]`).checked = true;
Más info de selectores de atributos: https://developer.mozilla.org/es/docs/Web/CSS/Selectores_atributo
*/
getFromLocalStorage();
