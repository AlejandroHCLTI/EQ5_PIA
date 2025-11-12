document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formComentario');
    const lista = document.getElementById('listaComentarios');

    // Comentarios predeterminados
    let comentariosGuardados = JSON.parse(localStorage.getItem('comentarios')) || [
        { nombre: "Alejandro", mensaje: "Excelente atención y resultados.", foto: " " },
        { nombre: "Hector", mensaje: "Muy profesionales y atentos.", foto: "https://i.pravatar.cc/50?img=2" },
        { nombre: "Camila", mensaje: "Mi familia y yo estamos muy satisfechos.", foto: "https://i.pravatar.cc/50?img=3" },
        { nombre: "Samuel", mensaje: "Recomendados al 100%.", foto: "https://i.pravatar.cc/50?img=4" },
        { nombre: "Braulio", mensaje: "Me sentí muy cómoda durante mi tratamiento.", foto: "https://i.pravatar.cc/50?img=5" }
    ];

    // Guardar predeterminados solo si no hay nada en localStorage
    if(!localStorage.getItem('comentarios')) {
        localStorage.setItem('comentarios', JSON.stringify(comentariosGuardados));
    }

    // Función para mostrar un comentario
    function mostrarComentario(nombre, mensaje, foto) {
        const div = document.createElement('div');
        div.className = 'comentario';
        div.innerHTML = `
            <img src="${foto}" alt="Foto de ${nombre}">
            <div class="contenido">
                <strong>${nombre}</strong>
                <p>${mensaje}</p>
            </div>
        `;
        lista.appendChild(div);
    }

    // Mostrar todos los comentarios al cargar
    comentariosGuardados.forEach(c => mostrarComentario(c.nombre, c.mensaje, c.foto));

    // Manejar envío del formulario
    form.addEventListener('submit', e => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const mensaje = document.getElementById('mensaje').value;

        // Foto genérica para nuevos usuarios
        const foto = "https://i.pravatar.cc/50";

        mostrarComentario(nombre, mensaje, foto);

        // Guardar en localStorage
        comentariosGuardados.push({ nombre, mensaje, foto });
        localStorage.setItem('comentarios', JSON.stringify(comentariosGuardados));

        form.reset();
    });
});