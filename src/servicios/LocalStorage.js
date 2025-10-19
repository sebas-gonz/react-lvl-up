export default class localStorage{

    guardar(clave,datos){
        try{
            const json = JSON.stringify(datos)
            localStorage.setItem(clave,json)
        } catch(error) {
            console.error(error)
        }
    }

    cargar(clave){
        try{
            const datos = localStorage.getItem(clave)
            if(datos !== null){
                return JSON.parse(datos)
            }
            return datos
        } catch(error){
            console.error(error)
            return null
        }
    }

    eliminar(clave){
        localStorage.removeItem(clave)
    }
}