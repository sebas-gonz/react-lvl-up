const regexCorreo = /^[A-Za-z0-9._%+-]+@(profesor\.duoc\.cl|duoc\.cl|gmail\.com)$/i;
const regexRun = /^\d{1,8}[0-9Kk]$/;


export const validarCorreo = (correo) => {
    if (typeof correo !== 'string') return false;
    return regexCorreo.test(correo);
};

export const validarRun = (run) =>{
    if(typeof run !== 'string'){
        return false;
    }
    return regexRun.test(run);
}