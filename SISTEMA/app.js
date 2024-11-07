document.addEventListener('DOMContentLoaded', mostrarReportes);

// Captura el formulario y añade un evento para el envío
document.getElementById('reportForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Captura los valores de los campos
    const departamento = document.getElementById('departamento').value;
    const equipo = document.getElementById('equipo').value;
    const fecha = document.getElementById('fecha').value;
    const problema = document.getElementById('problema').value;

    // Crea el objeto del reporte
    const reporte = { departamento, equipo, fecha, problema };

    // Obtiene los reportes existentes de Local Storage
    const reportesGuardados = JSON.parse(localStorage.getItem('reportes')) || [];

    // Añade el nuevo reporte
    reportesGuardados.push(reporte);

    // Guarda de nuevo en Local Storage
    localStorage.setItem('reportes', JSON.stringify(reportesGuardados));

    alert("Reporte guardado exitosamente.");

    // Muestra los reportes guardados
    mostrarReportes();

    // Resetea el formulario
    e.target.reset();
});

// Función para mostrar los reportes guardados
function mostrarReportes() {
    const reportesGuardados = JSON.parse(localStorage.getItem('reportes')) || [];
    const listaReportes = document.getElementById('listaReportes');
    listaReportes.innerHTML = ''; // Limpia la lista antes de mostrar

    reportesGuardados.forEach((reporte, index) => {
        const reporteHTML = `
            <div class="reporte">
                <p><strong>Departamento:</strong> ${reporte.departamento}</p>
                <p><strong>Equipo:</strong> ${reporte.equipo}</p>
                <p><strong>Fecha:</strong> ${reporte.fecha}</p>
                <p><strong>Problema:</strong> ${reporte.problema}</p>
                <button onclick="eliminarReporte(${index})">Eliminar</button>
            </div>
        `;
        listaReportes.innerHTML += reporteHTML;
    });
}

// Función para eliminar un reporte específico
function eliminarReporte(index) {
    const reportesGuardados = JSON.parse(localStorage.getItem('reportes')) || [];
    reportesGuardados.splice(index, 1);
    localStorage.setItem('reportes', JSON.stringify(reportesGuardados));
    mostrarReportes();
}