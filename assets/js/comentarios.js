document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formComentario');
    const lista = document.getElementById('listaComentarios');

    // 🔹 Borra datos anteriores (solo la primera vez para ver cambios)
    localStorage.removeItem('comentarios');

    let comentariosGuardados = JSON.parse(localStorage.getItem('comentarios')) || [
        { nombre: "Alejandro", mensaje: "Excelente atención y resultados.", foto: "assets/img/alejandro.jpeg" },
        { nombre: "Hector", mensaje: "Muy profesionales y atentos.", foto: "https://i.pravatar.cc/50?img=2" },
        { nombre: "Camila", mensaje: "Mi familia y yo estamos muy satisfechos.", foto: "assets/img/camila.jpeg" },
        { nombre: "Samuel", mensaje: "Recomendados al 100%.", foto: "assets/img/samuel.jpeg" },
        { nombre: "Braulio", mensaje: "Me sentí muy cómoda durante mi tratamiento.", foto: "https://i.pravatar.cc/50?img=5" }
    ];

    if (!localStorage.getItem('comentarios')) {
        localStorage.setItem('comentarios', JSON.stringify(comentariosGuardados));
    }

    function mostrarComentario(nombre, mensaje, foto) {
        const div = document.createElement('div');
        div.className = 'comentario';
        div.innerHTML = `
            <img src="${foto}" alt="Foto de ${nombre}" class="foto-perfil">
            <div class="contenido">
                <strong>${nombre}</strong>
                <p>${mensaje}</p>
            </div>
        `;
        lista.appendChild(div);
    }

    comentariosGuardados.forEach(c => mostrarComentario(c.nombre, c.mensaje, c.foto));

    form.addEventListener('submit', e => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const mensaje = document.getElementById('mensaje').value;
        const foto = "https://i.pravatar.cc/50"; // foto genérica

        mostrarComentario(nombre, mensaje, foto);

        comentariosGuardados.push({ nombre, mensaje, foto });
        localStorage.setItem('comentarios', JSON.stringify(comentariosGuardados));

        form.reset();
    });
});
