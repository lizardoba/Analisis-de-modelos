// ===== VARIABLES GLOBALES =====
let pacienteActual = null;
let discrepanciaData = {};
let boltonData = {};

// ===== UTILIDADES =====
function generarID() {
    return 'paciente_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function guardarEnLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Error al guardar en localStorage:', e);
        return false;
    }
}

function cargarDeLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Error al cargar de localStorage:', e);
        return null;
    }
}

// ===== FUNCIONES DE PACIENTES =====
function guardarPaciente() {
    const nombre = document.getElementById('patientName')?.value;
    const edad = document.getElementById('patientAge')?.value;
    const genero = document.getElementById('patientGender')?.value;
    const fecha = document.getElementById('evaluationDate')?.value;
    const notas = document.getElementById('clinicalNotes')?.value;

    if (!nombre || nombre.trim() === '') {
        alert('Por favor ingrese el nombre del paciente');
        return;
    }

    const paciente = {
        id: pacienteActual?.id || generarID(),
        nombre: nombre,
        edad: edad,
        genero: genero,
        fecha: fecha,
        notas: notas,
        fechaCreacion: pacienteActual?.fechaCreacion || new Date().toISOString()
    };

    // Guardar en localStorage
    const pacientes = cargarDeLocalStorage('pacientes') || [];
    const index = pacientes.findIndex(p => p.id === paciente.id);
    
    if (index >= 0) {
        pacientes[index] = paciente;
    } else {
        pacientes.push(paciente);
    }

    if (guardarEnLocalStorage('pacientes', pacientes)) {
        pacienteActual = paciente;
        alert('Paciente guardado exitosamente');
    } else {
        alert('Error al guardar el paciente');
    }
}

function nuevoPaciente() {
    if (confirm('¿Desea crear un nuevo paciente? Los datos no guardados se perderán.')) {
        pacienteActual = null;
        document.getElementById('patientName').value = '';
        document.getElementById('patientAge').value = '';
        document.getElementById('patientGender').value = 'Seleccionar';
        document.getElementById('evaluationDate').value = '';
        document.getElementById('clinicalNotes').value = '';
        
        // Limpiar datos de discrepancia y Bolton
        limpiarDiscrepancia();
        limpiarBolton();
        
        alert('Nuevo paciente creado');
    }
}

function autogenerarDatosPaciente() {
    const nombres = ['Juan Pérez', 'María Gómez', 'Carlos Rodríguez', 'Ana Martínez', 'Luis Fernández'];
    const generos = ['Masculino', 'Femenino'];
    
    document.getElementById('patientName').value = nombres[Math.floor(Math.random() * nombres.length)];
    document.getElementById('patientAge').value = Math.floor(Math.random() * 40) + 10;
    document.getElementById('patientGender').value = generos[Math.floor(Math.random() * generos.length)];
    document.getElementById('evaluationDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('clinicalNotes').value = 'Paciente generado automáticamente para pruebas.';
    
    alert('Datos del paciente generados automáticamente');
}

function eliminarPaciente() {
    if (!pacienteActual) {
        alert('No hay ningún paciente seleccionado');
        return;
    }

    if (confirm('¿Está seguro de que desea eliminar este paciente?')) {
        const pacientes = cargarDeLocalStorage('pacientes') || [];
        const nuevosPacientes = pacientes.filter(p => p.id !== pacienteActual.id);
        
        if (guardarEnLocalStorage('pacientes', nuevosPacientes)) {
            alert('Paciente eliminado exitosamente');
            nuevoPaciente();
        } else {
            alert('Error al eliminar el paciente');
        }
    }
}

// ===== FUNCIONES DE DISCREPANCIA =====
function calcularDiscrepancia() {
    // Obtener valores de los campos de Espacio Requerido
    const inputs = document.querySelectorAll('#discrepancy .discrepancy-input');
    let totalER = 0;
    
    inputs.forEach(input => {
        const valor = parseFloat(input.value) || 0;
        totalER += valor;
    });

    // Calcular subtotales y totales
    const subtotales = document.querySelectorAll('#discrepancy .subtotal');
    subtotales.forEach(subtotal => {
        // Aquí deberías calcular los subtotales según tu lógica
        // Por ahora solo mostraré el total
    });

    alert('Cálculo de discrepancia completado');
}

function autogenerarMediciones() {
    const inputs = document.querySelectorAll('#discrepancy .discrepancy-input');
    
    inputs.forEach(input => {
        input.value = (Math.random() * 10 + 5).toFixed(2);
    });
    
    alert('Mediciones generadas automáticamente');
    calcularDiscrepancia();
}

function limpiarDiscrepancia() {
    const inputs = document.querySelectorAll('#discrepancy .discrepancy-input');
    inputs.forEach(input => {
        input.value = '0.00';
    });
    
    alert('Datos de discrepancia limpiados');
}

// ===== FUNCIONES DE BOLTON =====
function calcularBolton() {
    // Lógica para calcular el análisis de Bolton
    const inputsMaxilar = document.querySelectorAll('#bolton input[placeholder*="Maxilar"]');
    const inputsMandibular = document.querySelectorAll('#bolton input[placeholder*="Mandibular"]');
    
    let sumMaxilar = 0;
    let sumMandibular = 0;
    
    inputsMaxilar.forEach(input => {
        sumMaxilar += parseFloat(input.value) || 0;
    });
    
    inputsMandibular.forEach(input => {
        sumMandibular += parseFloat(input.value) || 0;
    });
    
    // Calcular ratios de Bolton
    const ratioAnterior = sumMandibular / sumMaxilar * 100;
    const ratioOverall = sumMandibular / sumMaxilar * 100;
    
    alert('Cálculo de Bolton completado');
}

function autogenerarMolares() {
    const inputs = document.querySelectorAll('#bolton input');
    
    inputs.forEach(input => {
        input.value = (Math.random() * 10 + 5).toFixed(2);
    });
    
    alert('Mediciones de molares generadas');
    calcularBolton();
}

function limpiarBolton() {
    const inputs = document.querySelectorAll('#bolton input');
    inputs.forEach(input => {
        input.value = '';
    });
    
    alert('Datos de Bolton limpiados');
}

// ===== FUNCIONES DE REPORTE =====
function generatePDF() {
    alert('Generando PDF... (Función en desarrollo)');
    // Aquí usarías jsPDF para generar el PDF
}

function saveJSON() {
    const data = {
        paciente: pacienteActual,
        discrepancia: discrepanciaData,
        bolton: boltonData,
        fecha: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `reporte_${pacienteActual?.nombre || 'paciente'}_${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    alert('Reporte JSON guardado');
}

function printReport() {
    window.print();
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
    // Botones de Paciente
    const btnGuardarPaciente = document.getElementById('savePatient');
    const btnNuevoPaciente = document.getElementById('newPatient');
    const btnAutogenerarPaciente = document.getElementById('autogeneratePatient');
    const btnEliminarPaciente = document.getElementById('deletePatient');
    
    if (btnGuardarPaciente) btnGuardarPaciente.addEventListener('click', guardarPaciente);
    if (btnNuevoPaciente) btnNuevoPaciente.addEventListener('click', nuevoPaciente);
    if (btnAutogenerarPaciente) btnAutogenerarPaciente.addEventListener('click', autogenerarDatosPaciente);
    if (btnEliminarPaciente) btnEliminarPaciente.addEventListener('click', eliminarPaciente);
    
    // Botones de Discrepancia
    const btnAutogenerarMediciones = document.getElementById('autogenerateMeasurements');
    const btnLimpiarDiscrepancia = document.getElementById('clearAll');
    
    if (btnAutogenerarMediciones) btnAutogenerarMediciones.addEventListener('click', autogenerarMediciones);
    if (btnLimpiarDiscrepancia) btnLimpiarDiscrepancia.addEventListener('click', limpiarDiscrepancia);
    
    // Botones de Bolton
    const btnAutogenerarMolares = document.getElementById('autoMolarBtn');
    const btnLimpiarBolton = document.getElementById('clearBolton');
    
    if (btnAutogenerarMolares) btnAutogenerarMolares.addEventListener('click', autogenerarMolares);
    if (btnLimpiarBolton) btnLimpiarBolton.addEventListener('click', limpiarBolton);
    
    // Botones de Reporte
    const btnGenerarPDF = document.getElementById('generatePDF');
    const btnGuardarJSON = document.getElementById('saveJSON');
    const btnImprimir = document.getElementById('printBtn');
    
    if (btnGenerarPDF) btnGenerarPDF.addEventListener('click', generatePDF);
    if (btnGuardarJSON) btnGuardarJSON.addEventListener('click', saveJSON);
    if (btnImprimir) btnImprimir.addEventListener('click', printReport);
    
    console.log('App.js cargado correctamente');
});
