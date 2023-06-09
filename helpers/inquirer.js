const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1-'.blue} Crear tarea`
            },
            {
                value: '2',
                name: `${'2-'.blue} Listar tareas`
            },
            {
                value: '3',
                name: `${'3-'.blue} Listar tareas pendientes`
            },
            {
                value: '4',
                name: `${'4-'.blue} Listar tareas completadas`
            },
            {
                value: '5',
                name: `${'5-'.blue} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6-'.blue} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0-'.blue} Salir`
            }
        ]
    }
]

const inquirerMenu = async() => {

    console.clear();
    console.log('==============================='.blue);
    console.log('     Seleccione una opcion     '.blue);
    console.log('===============================\n'.blue);

    const {opcion} = await inquirer.prompt(preguntas)

    return opcion;

}

const pausa = async() => {

    const pregunta = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.blue} para continuar`
        }
    ]
    console.log('\n');
    await inquirer.prompt(pregunta);
}

const leerInput = async(message) => {
    const pregunta = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if(value.length === 0) {
                    return 'Por favor ingrese un valor'
                }
                return true
            }
        }
    ];

    const {desc} = await inquirer.prompt(pregunta);
    return desc;
}


const listadoTareasBorrar = async(tareas = []) => {
    
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}-`.blue;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0-'.blue + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    
    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) => {

    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const {ok} = await inquirer.prompt(pregunta);
    return ok;
}

const mostrarListadoChecklist = async(tareas = []) => {
    
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}-`.blue;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]
    
    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}