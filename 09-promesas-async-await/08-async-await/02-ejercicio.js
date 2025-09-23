/*
Debajo puedes encontrar el ejemplo “rethrow”. Rescríbelo usando async/await en vez de .then/catch.

Y deshazte de la recursión en favor de un bucle en demoGithubUser: con async/await, que se vuelve fácil de hacer.

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    });
}

// Pide nombres hasta que github devuelve un usuario válido
function demoGithubUser() {
  let name = prompt("Ingrese un nombre:", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`Nombre completo: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("No existe tal usuario, por favor reingrese.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
*/
class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
    }
}


async function loadJson(url) {

    let response = await fetch(url);

    if (response.status == 200) {
        return response.json();
    } else {
        throw new HttpError(response);
    }
}
demoGithubUser();
//function demoGithubUser() {
//    let name = prompt("Ingrese un nombre:", "iliakan");
//
//    return loadJson(`https://api.github.com/users/${name}`)
//        .then(user => {
//            alert(`Nombre completo: ${user.name}.`);
//            return user;
//        })
//        .catch(err => {
//            if (err instanceof HttpError && err.response.status == 404) {
//                alert("No existe tal usuario, por favor reingrese.");
//                return demoGithubUser();
//            } else {
//                throw err;
//            }
//        });
//}

async function demoGithubUser() {
    let name = prompt("Ingrese un nombre: ", "iliakan");

    try {
        let user = await loadJson(`https://api.github.com/users/${name}`);

        alert(user.name);
        return user;

    } catch (error) {
        if (error instanceof HttpError && error.response.status == 404) {
            alert("No existe tal usuario, por favor reingrese");
            return demoGithubUser();
        } else {
            throw error;
        }
    }
}

/*
async function demoGithubUser() {

  let user;
  while(true) {
    let name = prompt("Ingrese un nombre:", "iliakan");

    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break; // sin error, salir del bucle
    } catch(err) {
      if (err instanceof HttpError && err.response.status == 404) {
        // bucle continúa después del alert
        alert("No existe tal usuario, por favor reingrese.");
      } else {
        // error desconocido, lo relanza
        throw err;
      }
    }
  }


  alert(`Nombre completo: ${user.name}.`);
  return user;
}
*/