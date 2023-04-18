const Tarea = require("./tarea");


class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasDeArreglo(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.blue;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`\n${idx}${'-'.blue} ${desc} :: ${estado}`);

        })
    }

    listarPendientesCompletadas(completadas = true) {
        
        let enumeracion = 0;
        this.listadoArr.forEach(tarea => {

            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            if (completadas) {
                if(completadoEn) {
                    enumeracion += 1;
                    console.log(`\n${enumeracion.toString().blue}${'-'.blue} ${desc} :: ${completadoEn.bgBlue}`);
                }
            } else {
                if(!completadoEn) {
                    enumeracion += 1;
                    console.log(`\n${(enumeracion + '-').blue} ${desc} :: ${estado}`);
                }
            }

        })
    }

    toggleCompletadas(ids = []) {

        ids.forEach(id => {

            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }

        });

        this.listadoArr.forEach(tarea => {

            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
                // tarea.completadoEn = null;
            }

        })

    }
}

module.exports = Tareas;