const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

require('colors');


console.clear();

const main = async() => {
    let opt = ''
    const tareas = new Tareas(); 

    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasDeArreglo(tareasDB);
    }


    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1': // crear tarea
                const desc = await leerInput('Descripcion: ')
                tareas.crearTarea(desc);
                break;
            case '2': // listar todo
                tareas.listadoCompleto();
                break;
            case '3': // listar pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case '4': // listar completadas
                tareas.listarPendientesCompletadas();
                break;
            case '5': // Seleccionar completado o pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6': // borrar tarea
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== '0') {
                    const confirmarBorrar = await confirmar('¿Esta seguro?')
                    if(confirmarBorrar){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente'.green);
                    }
                };
                break;
        
        }

        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !== '0');
}

main();