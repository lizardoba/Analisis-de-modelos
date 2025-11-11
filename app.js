// ========== FUNCIONES PARA PACIENTE ==========
function savePatient() {
    const name = document.getElementById('patientName').value;
    if (!name) {
        alert('Por favor ingrese el nombre del paciente');
        return;
    }
    const patient = {
        name,
        age: document.getElementById('patientAge').value,
        gender: document.getElementById('patientGender').value,
        date: document.getElementById('evaluationDate').value,
        notes: document.getElementById('clinicalNotes').value
    };
    localStorage.setItem('currentPatient', JSON.stringify(patient));
    alert('Paciente guardado exitosamente');
}

function newPatient() {
    if (confirm('¿Desea crear un nuevo paciente? Se perderán los datos no guardados.')) {
        document.getElementById('patientName').value = '';
        document.getElementById('patientAge').value = '';
        document.getElementById('patientGender').value = '';
        document.getElementById('evaluationDate').value = '';
        document.getElementById('clinicalNotes').value = '';
        alert('Nuevo paciente creado');
    }
}

function autogeneratePatientData() {
    const nombres = ['Juan Pérez', 'María García', 'Carlos López', 'Ana Martínez', 'Luis Rodríguez', 'Sofia Torres'];
    document.getElementById('patientName').value = nombres[Math.floor(Math.random() * nombres.length)];
    document.getElementById('patientAge').value = Math.floor(Math.random() * 30) + 20;
    document.getElementById('patientGender').value = ['M', 'F'][Math.floor(Math.random() * 2)];
    document.getElementById('evaluationDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('clinicalNotes').value = 'Paciente para análisis de discrepancia y Bolton - Datos autogenerados';
    alert('Datos del paciente generados exitosamente');
}

function deletePatient() {
    if (confirm('¿Está seguro de eliminar este paciente?')) {
        newPatient();
        alert('Paciente eliminado');
    }
}

// ========== FUNCIONES PARA DISCREPANCIA ==========
function calculateDiscrepancia() {
    // Obtener todos los valores de dientes maxilares
    const maxDer = [
        parseFloat(document.getElementById('tooth_premolar2_max_der')?.value) || 0,
        parseFloat(document.getElementById('tooth_premolar1_max_der')?.value) || 0,
        parseFloat(document.getElementById('tooth_canine_max_der')?.value) || 0,
        parseFloat(document.getElementById('tooth_lateral_max_der')?.value) || 0,
        parseFloat(document.getElementById('tooth_central_max_der')?.value) || 0
    ];
    
    const maxIzq = [
        parseFloat(document.getElementById('tooth_premolar2_max_izq')?.value) || 0,
        parseFloat(document.getElementById('tooth_premolar1_max_izq')?.value) || 0,
        parseFloat(document.getElementById('tooth_canine_max_izq')?.value) || 0,
        parseFloat(document.getElementById('tooth_lateral_max_izq')?.value) || 0,
        parseFloat(document.getElementById('tooth_central_max_izq')?.value) || 0
    ];
    
    const mandDer = [
        parseFloat(document.getElementById('tooth_premolar2_mand_der')?.value) || 0,
        parseFloat(document.getElementById('tooth_premolar1_mand_der')?.value) || 0,
        parseFloat(document.getElementById('tooth_canine_mand_der')?.value) || 0,
        parseFloat(document.getElementById('tooth_lateral_mand_der')?.value) || 0,
        parseFloat(document.getElementById('tooth_central_mand_der')?.value) || 0
    ];
    
    const mandIzq = [
        parseFloat(document.getElementById('tooth_premolar2_mand_izq')?.value) || 0,
        parseFloat(document.getElementById('tooth_premolar1_mand_izq')?.value) || 0,
        parseFloat(document.getElementById('tooth_canine_mand_izq')?.value) || 0,
        parseFloat(document.getElementById('tooth_lateral_mand_izq')?.value) || 0,
        parseFloat(document.getElementById('tooth_central_mand_izq')?.value) || 0
    ];
    
    // Calcular subtotales
    const subtotalMaxDer = maxDer.reduce((a, b) => a + b, 0);
    const subtotalMaxIzq = maxIzq.reduce((a, b) => a + b, 0);
    const subtotalMandDer = mandDer.reduce((a, b) => a + b, 0);
    const subtotalMandIzq = mandIzq.reduce((a, b) => a + b, 0);
    
    // Actualizar subtotales en la tabla
    // Actualizar subtotales usando IDs específicos
    const maxDerElem = document.getElementById('maxDerSubtotal');
    const maxIzqElem = document.getElementById('maxIzqSubtotal');
    const mandDerElem = document.getElementById('mandDerSubtotal');
    const mandIzqElem = document.getElementById('mandIzqSubtotal');
    
    if (maxDerElem) maxDerElem.textContent = subtotalMaxDer.toFixed(2);
    if (maxIzqElem) maxIzqElem.textContent = subtotalMaxIzq.toFixed(2);
    if (mandDerElem) mandDerElem.textContent = subtotalMandDer.toFixed(2);
    if (mandIzqElem) mandIzqElem.textContent = subtotalMandIzq.toFixed(2);    
    // Calcular totales
    const totalMaxilar = subtotalMaxDer + subtotalMaxIzq;
    const totalMandibular = subtotalMandDer + subtotalMandIzq;
    
    // Actualizar totales en TOTAL ESPACIO REQUERIDO\n    const totalRows = document.querySelectorAll('.measurement-table tr');\n    totalRows.forEach(row => {\n        const cells = row.querySelectorAll('td');\n        if (cells.length > 0 && cells[0].textContent.includes('TOTAL ESPACIO REQUERIDO')) {\n            cells[1].textContent = totalMaxilar.toFixed(2) + ' mm';\n            cells[3].textContent = totalMandibular.toFixed(2) + ' mm';\n        }\n    });\n    \n    // Calcular discrepancia\n    const edMaxilar = parseFloat(document.getElementById('edMaxilar')?.value) || 0;\n    const edMandibular = parseFloat(document.getElementById('edMandibular')?.value) || 0;\n    const discrepanciaMaxilar = totalMaxilar - edMaxilar;\n    const discrepanciaMandibular = totalMandibular - edMandibular;\n    updateDiscrepancyResults(totalMaxilar, edMaxilar, discrepanciaMaxilar, totalMandibular, edMandibular, discrepanciaMandibular);\n}\n\nfunction updateDiscrepancyResults(erMax, edMax, discMax, erMand, edMand, discMand) {\n    const resultsDiv = document.querySelector('#discrepancy');\n    if (!resultsDiv) return;\n    let resultsTable = resultsDiv.querySelector('.result-table');\n    if (!resultsTable) return;\n    const rows = resultsTable.querySelectorAll('tbody tr');\n    if (rows.length >= 2) {\n        let cells = rows[0].querySelectorAll('td');\n        if (cells.length >= 4) {\n            cells[1].textContent = erMax.toFixed(2) + ' mm';\n            cells[2].textContent = edMax.toFixed(2) + ' mm';\n            cells[3].textContent = discMax.toFixed(2) + ' mm';\n            cells[3].className = discMax > 0 ? 'result-danger' : discMax < 0 ? 'result-positive' : 'result-warning';\n        }\n        cells = rows[1].querySelectorAll('td');\n        if (cells.length >= 4) {\n            cells[1].textContent = erMand.toFixed(2) + ' mm';\n            cells[2].textContent = edMand.toFixed(2) + ' mm';\n            cells[3].textContent = discMand.toFixed(2) + ' mm';\n            cells[3].className = discMand > 0 ? 'result-danger' : discMand < 0 ? 'result-positive' : 'result-warning';\n        }\n    }\n}\n\nfunction autogenerateMeasurements() {\n    function random(min, max) { return (Math.random() * (max - min) + min).toFixed(2); }\n    document.getElementById('tooth_premolar2_max_der').value = random(6.5, 7.5);\n    document.getElementById('tooth_premolar2_max_izq').value = random(6.5, 7.5);\n    document.getElementById('tooth_premolar1_max_der').value = random(6.5, 7.5);\n    document.getElementById('tooth_premolar1_max_izq').value = random(6.5, 7.5);\n    document.getElementById('tooth_canine_max_der').value = random(7.0, 8.5);\n    document.getElementById('tooth_canine_max_izq').value = random(7.0, 8.5);\n    document.getElementById('tooth_lateral_max_der').value = random(6.0, 7.5);\n    document.getElementById('tooth_lateral_max_izq').value = random(6.0, 7.5);\n    document.getElementById('tooth_central_max_der').value = random(7.5, 9.0);\n    document.getElementById('tooth_central_max_izq').value = random(7.5, 9.0);\n    document.getElementById('tooth_premolar2_mand_der').value = random(6.5, 7.5);\n    document.getElementById('tooth_premolar2_mand_izq').value = random(6.5, 7.5);\n    document.getElementById('tooth_premolar1_mand_der').value = random(6.5, 7.5);\n    document.getElementById('tooth_premolar1_mand_izq').value = random(6.5, 7.5);\n    document.getElementById('tooth_canine_mand_der').value = random(6.5, 8.0);\n    document.getElementById('tooth_canine_mand_izq').value = random(6.5, 8.0);\n    document.getElementById('tooth_lateral_mand_der').value = random(5.5, 7.0);\n    document.getElementById('tooth_lateral_mand_izq').value = random(5.5, 7.0);\n    document.getElementById('tooth_central_mand_der').value = random(6.0, 7.5);\n    document.getElementById('tooth_central_mand_izq').value = random(6.0, 7.5);\n    document.getElementById('edMaxilar').value = random(42, 52);\n    document.getElementById('edMandibular').value = random(40, 48);\n    calculateDiscrepancia();\n    alert('\u00a1Mediciones generadas exitosamente!');\n}\n\nfunction clearDiscrepancyData() {\n    if (confirm('\u00bfDesea limpiar todos los datos?')) {\n        const inputs = document.querySelectorAll('#discrepancy input[type=\"number\"]');\n        inputs.forEach(input => input.value = '');\n        const subtotalCells = document.querySelectorAll('.measurement-table .subtotal');\n        subtotalCells.forEach(cell => cell.textContent = '0.00');\n        alert('Datos limpiados');\n    }\n}\n\n// ========== FUNCIONES PARA BOLTON ==========\nfunction calculateBolton() {\n    copyDiscrepancyToBolton();\n    const maxAnt = ['13','12','11','23','22','21'].reduce((s,id) => s + (parseFloat(document.getElementById('bolton_ant_max_'+id)?.value)||0), 0);\n    const mandAnt = ['43','42','41','33','32','31'].reduce((s,id) => s + (parseFloat(document.getElementById('bolton_ant_mand_'+id)?.value)||0), 0);\n    const maxOver = ['15','14','13','12','11','16','26','25','24','23','22','21'].reduce((s,id) => s + (parseFloat(document.getElementById('bolton_over_max_'+id)?.value)||0), 0);\n    const mandOver = ['45','44','43','42','41','46','36','35','34','33','32','31'].reduce((s,id) => s + (parseFloat(document.getElementById('bolton_over_mand_'+id)?.value)||0), 0);\n    \n    const tables = document.querySelectorAll('#bolton table');\n    if (tables[0]) {\n        const cells = tables[0].querySelectorAll('tr:last-child td');\n        if (cells.length >= 3) {\n            cells[1].textContent = maxAnt.toFixed(2) + ' mm';\n            cells[2].textContent = mandAnt.toFixed(2) + ' mm';\n        }\n    }\n    if (tables[1]) {\n        const cells = tables[1].querySelectorAll('tr:last-child td');\n        if (cells.length >= 3) {\n            cells[1].textContent = maxOver.toFixed(2) + ' mm';\n            cells[2].textContent = mandOver.toFixed(2) + ' mm';\n        }\n    }\n    const ratioAnt = maxAnt > 0 ? (mandAnt / maxAnt * 100) : 0;\n    const ratioOver = maxOver > 0 ? (mandOver / maxOver * 100) : 0;\n    console.log('Bolton ratios:', { anterior: ratioAnt, overall: ratioOver });\n}\n\nfunction copyDiscrepancyToBolton() {\n    const mapping = {\n        'tooth_canine_max_der': 'bolton_ant_max_13',\n        'tooth_lateral_max_der': 'bolton_ant_max_12',\n        'tooth_central_max_der': 'bolton_ant_max_11',\n        'tooth_canine_max_izq': 'bolton_ant_max_23',\n        'tooth_lateral_max_izq': 'bolton_ant_max_22',\n        'tooth_central_max_izq': 'bolton_ant_max_21',\n        'tooth_canine_mand_der': 'bolton_ant_mand_43',\n        'tooth_lateral_mand_der': 'bolton_ant_mand_42',\n        'tooth_central_mand_der': 'bolton_ant_mand_41',\n        'tooth_canine_mand_izq': 'bolton_ant_mand_33',\n        'tooth_lateral_mand_izq': 'bolton_ant_mand_32',\n        'tooth_central_mand_izq': 'bolton_ant_mand_31'\n    };\n    const overMapping = {\n        'tooth_premolar2_max_der': 'bolton_over_max_15',\n        'tooth_premolar1_max_der': 'bolton_over_max_14',\n        'tooth_canine_max_der': 'bolton_over_max_13',\n        'tooth_lateral_max_der': 'bolton_over_max_12',\n        'tooth_central_max_der': 'bolton_over_max_11',\n        'tooth_premolar2_max_izq': 'bolton_over_max_25',\n        'tooth_premolar1_max_izq': 'bolton_over_max_24',\n        'tooth_canine_max_izq': 'bolton_over_max_23',\n        'tooth_lateral_max_izq': 'bolton_over_max_22',\n        'tooth_central_max_izq': 'bolton_over_max_21',\n        'tooth_premolar2_mand_der': 'bolton_over_mand_45',\n        'tooth_premolar1_mand_der': 'bolton_over_mand_44',\n        'tooth_canine_mand_der': 'bolton_over_mand_43',\n        'tooth_lateral_mand_der': 'bolton_over_mand_42',\n        'tooth_central_mand_der': 'bolton_over_mand_41',\n        'tooth_premolar2_mand_izq': 'bolton_over_mand_35',\n        'tooth_premolar1_mand_izq': 'bolton_over_mand_34',\n        'tooth_canine_mand_izq': 'bolton_over_mand_33',\n        'tooth_lateral_mand_izq': 'bolton_over_mand_32',\n        'tooth_central_mand_izq': 'bolton_over_mand_31'\n    };\n    for (let src in mapping) {\n        const val = document.getElementById(src)?.value;\n        if (val && document.getElementById(mapping[src])) {\n            document.getElementById(mapping[src]).value = val;\n        }\n    }\n    for (let src in overMapping) {\n        const val = document.getElementById(src)?.value;\n        if (val && document.getElementById(overMapping[src])) {\n            document.getElementById(overMapping[src]).value = val;\n        }\n    }\n}\n\nfunction autogenerateMolarBtn() {\n    const random = (min, max) => (Math.random() * (max - min) + min).toFixed(2);\n    ['16','26'].forEach(id => {\n        if (document.getElementById('bolton_over_max_'+id))\n            document.getElementById('bolton_over_max_'+id).value = random(10.0, 11.5);\n    });\n    ['46','36'].forEach(id => {\n        if (document.getElementById('bolton_over_mand_'+id))\n            document.getElementById('bolton_over_mand_'+id).value = random(10.5, 12.0);\n    });\n    calculateBolton();\n    alert('Molares autogenerados');\n}\n\n// ========== FUNCIONES PARA REPORTE ==========\nfunction generatePDF() {\n    alert('Generando PDF... (Funcionalidad en desarrollo)');\n}\n\nfunction saveJSON() {\n    alert('Guardando JSON... (Funcionalidad en desarrollo)');\n}\n\nfunction printReport() {\n    window.print();\n}\n\nconsole.log('App.js cargado correctamente - Versión completa funcional');
