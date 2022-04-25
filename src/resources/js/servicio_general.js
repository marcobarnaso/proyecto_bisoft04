const registrarDatos = async (endpoint, data, redireccion) => {
  let url = `http://localhost:3000/${endpoint}`;
  await axios({
    url: url,
    method: "post",
    responseType: "json",
    data: data,
  })
    .then((response) => {
      Swal.fire({
        icon: "success",
        title: `Bienvenido a Lovelace Bookstore, ${data.name}`,
        text: "Por favor inicie sesión con sus credenciales.",
      }).then(() => {
        window.location.href = redireccion;
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Ha ocurrido un error",
        text: error,
      });
    });
};

const login = async (endpoint, data, redireccion) => {
  let url = `http://localhost:3000/${endpoint}`;
  await axios({
    url: url,
    method: "post",
    responseType: "json",
    data: data,
  })
    .then((res) => {
      localStorage.setItem("usuarioConectado", JSON.stringify(res.data));
      Swal.fire({
        icon: "success",
        title: `Bienvenid@ de vuelta ${res.data.user.name}`,
        text: "lorem ipsum",
      }).then(() => {
        window.location.href = redireccion;
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Ha ocurrido un error",
        text: error.response.data,
      });
    });
};

const logout = async (redireccion) => {
  let localData = JSON.parse(localStorage.getItem("usuarioConectado"));
  let token = localData.token;
  console.log(`Bearer ${token}`)
  await axios(
    {
      url: "http://localhost:3000/users/logout",
      method: "post",
      responseType: "json",
      data: localStorage.getItem("usuarioConectado"),
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((res) => {
      Swal.fire({
        icon: "success",
        title: `Su sesión ha terminado exitosamente`,
        text: "Vuelva pronto",
      }).then(() => {
        localStorage.removeItem("usuarioConectado");
        window.location.href = redireccion;
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Ha ocurrido un error",
        text: error,
      });
    });
};

const obtenerDatos = async (endpoint) => {
  let url = `http://localhost:3000/${endpoint}`;
  let listaDatos = [];
  await axios({
    url: url,
    method: "get",
    responseType: "json",
  })
    .then((response) => {
      listaDatos = response.data.lista;
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        text: error,
      });
    });

  return listaDatos;
};
