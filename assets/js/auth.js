
document.addEventListener('DOMContentLoaded', function() {
    // Obtener datos del usuario del localStorage
    const usuarioData = localStorage.getItem("usuario");
    
    // Si no hay datos de usuario, redirigir al login
    if (!usuarioData) {
        window.location.href = "../../index.html";
        return;
    }
    
    const usuario = JSON.parse(usuarioData);
    
    // Verificar el rol para páginas específicas
    const path = window.location.pathname;
    const page = path.split("/").pop();
    
    // Definir qué roles pueden acceder a qué páginas
    const accessRules = {
        "user/inasistencias.html": ["gestora"],
        "user/horario.html": ["gestora"],
        "indexusuario.html": ["gestora"],
        "horario.html": ["admin"],
        "inasistencias.html": ["admin"],
        "configuracion.html": ["admin"]
        // Agrega más páginas y roles según necesites
    };
    
    // Si la página tiene reglas de acceso definidas
    if (accessRules[page]) {
        const allowedRoles = accessRules[page];
        
        // Verificar si el rol del usuario está permitido
        if (!allowedRoles.includes(usuario.rol)) {
            Swal.fire({
                title: "Acceso denegado",
                text: "No tienes permisos para acceder a esta página",
                icon: "error"
            }).then(() => {
                // Redirigir según el rol del usuario
                if (usuario.rol === "admin") {
                    window.location.href = "index.html";
                } else {
                    window.location.href = "index.html";
                }
            });
            return;
        }
    }
    
    // Mostrar información del usuario en la interfaz (opcional)
    if (document.getElementById("user-info")) {
        document.getElementById("user-info").textContent = `${usuario.nombre} ${usuario.apellido}`;
    }
    
    // Manejar el cierre de sesión
    if (document.getElementById("logout-btn")) {
        document.getElementById("logout-btn").addEventListener("click", function() {
            localStorage.removeItem("usuario");
            window.location.href = "../index.html";
        });
    }
});
