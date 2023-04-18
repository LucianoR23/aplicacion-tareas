require('colors');

const mostrarMenu = () => {

    return new Promise(resolve => {
        console.clear();
        console.log('==============================='.blue);
        console.log('     Seleccione una opcion     '.blue);
        console.log('===============================\n'.blue);

        console.log(`${'1-'.blue} Crear tarea`);
        console.log(`${'2-'.blue} Listar tareas`);
        console.log(`${'3-'.blue} Listar tareas pendientes`);
        console.log(`${'4-'.blue} Listar tareas completadas`);
        console.log(`${'5-'.blue} Completar tarea(s)`);
        console.log(`${'6-'.blue} Borrar tarea`);
        console.log(`${'0-'.blue} Salir\n`);

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readLine.question('Seleccione una opcion: ', (opt) => {
            readLine.close();
            resolve(opt)
        })
        })
}

const pausa = () => {

    return new Promise(resolve => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readLine.question(`\nPresione ${'ENTER'.blue} para continuar\n`, (opt) => {
            readLine.close();
            resolve();
        })
    })
}

module.exports = {
    mostrarMenu,
    pausa
}