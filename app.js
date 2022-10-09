const tableBody = document.getElementById('tableBody');
const formCreate = document.getElementById('formCrearUsuario');
let userToEdit = "";
const formEdit = document.getElementById('formEditUsuario');
console.log(nombreEditUser);
let users = [];
users = JSON.parse(localStorage.getItem('usuarios'));
if (!users) {
}else {
    listarUsuarios(users);
}




function crearUsuario(){
    $('#crearUsuarioModal').modal('show');   
};


formEdit.addEventListener('submit', (e) =>{
    e.preventDefault();
    let usuarioEdit = {
        nombre: e.target[0].value,
        apellido: e.target[1].value,
        dni: e.target[2].value,
        email: e.target[3].value,
        id: userToEdit,
    }
    users = JSON.parse(localStorage.getItem('usuarios'));
    const UsuariosConEditado = users.map((user) => {
        if (user.id === userToEdit) {
            return usuarioEdit;
        }
        return user;
    });
    listarUsuarios(UsuariosConEditado);
    const JSONUsuarios = JSON.stringify(UsuariosConEditado);
    localStorage.setItem('usuarios', JSONUsuarios);
    formEdit.reset();
    $('#editUser').modal('hide');
});



formCreate.addEventListener('submit', (e) => {
    e.preventDefault();
    let usuarioCreate = {
        nombre: e.target[0].value,
        apellido: e.target[1].value,
        dni: e.target[2].value,
        email: e.target[3].value,
        id: generateId(),
    }
    let usuariosEnStorage = localStorage.getItem('usuarios');
    if (!usuariosEnStorage) {
        let usuarios = JSON.stringify([usuarioCreate]);
        localStorage.setItem('usuarios',usuarios);
    }else {
        let usuariosStogeParse = JSON.parse(usuariosEnStorage);
        usuariosStogeParse.push(usuarioCreate);
        const JSONUsuarios = JSON.stringify(usuariosStogeParse);
        localStorage.setItem('usuarios', JSONUsuarios);
    }
    users = JSON.parse(localStorage.getItem('usuarios'));
    listarUsuarios(users);
    formCreate.reset();

});

const generateId = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

/* function verMas(id){
    const usuarioEncontrado = usuarios.find((user) => user.id === id);
    console.log(usuarioEncontrado);

} */

function borrar(id) {
    users = JSON.parse(localStorage.getItem('usuarios'));
    const nuevalista = users.filter((user) => user.id !== id);
    listarUsuarios(nuevalista);
    const JSONUsuarios = JSON.stringify(nuevalista);
    localStorage.setItem('usuarios', JSONUsuarios);    
}

const edit = (id) => {
    userToEdit = id;
    users = JSON.parse(localStorage.getItem('usuarios'));
    const usuarioEncontrado = users.find((usuario) => usuario.id === id)
    nombreEditUser.value = usuarioEncontrado.nombre;
    apellidoEditUser.value = usuarioEncontrado.apellido;
    dniEditUser.value = usuarioEncontrado.dni;
    emailEditUser.value = usuarioEncontrado.email;
    $('#editUser').modal('show');
}


function listarUsuarios(users) {
    const trs = [];
    for (const user of users) {
        const tr = `
            <tr>
                <td>${user.nombre}</td>
                <td>${user.apellido}</td>
                <td>${user.dni}</td>
                <td>${user.email}</td>
                <td>
                    <button class = "btn btn-secondary" data-bs-toggle="modal" data-bs-target="#verMas${user.id}">Ver mas </button>
                </td>
                <td>
                    <button class = "btn btn-danger" onclick="borrar('${user.id}')">Elimirar</button>
                </td>
                <td>
                    <button class = "btn btn-warning" onclick="edit('${user.id}')">Editar</button>
                </td>
                
            </tr>

            <!-- Modal -->
            <div class="modal fade" id="verMas${user.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Usuario ${user.nombre}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <b>Nombre: </b> ${user.nombre}
                        <br>
                        <b>apellido: </b> ${user.apellido}
                        <br>
                        <b>DNI: </b> ${user.dni}
                        <br>
                        <b>Email: </b> ${user.email}
                        </div>
                    </div>
                </div>
            </div>

        `
        trs.push(tr);
    }
    tableBody.innerHTML = trs.join(' ');
    
}


const buscar = (filtro) => {
    users = JSON.parse(localStorage.getItem('usuarios'));
    console.log(users);
    const usuariosFiltrados = users.filter((usuario) => 
    (usuario?.nombre?.toLowerCase()?.includes(filtro?.toLowerCase())
    ||usuario?.apellido?.toLowerCase()?.includes(filtro?.toLowerCase())
    ));
    listarUsuarios(usuariosFiltrados);

}