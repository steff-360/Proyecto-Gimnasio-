export class Cliente {
 constructor({nombre,apellido,correo=null,telefono=null,edad=null}) {
  if(!nombre?.trim()) throw new Error('El nombre es obligatorio.');
  if(!apellido?.trim()) throw new Error('El apellido es obligatorio.');
<<<<<<< HEAD
  if(correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) throw new Error('Correo inválido.');
=======
    if(correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) throw new Error('Correo inválido.');
>>>>>>> c3793d979ebac7d056cdfd7fc8317625ef7d413f
  if(edad!==null && edad!=='' && (!Number.isInteger(Number(edad)) || Number(edad)<1 || Number(edad)>120)) throw new Error('Edad inválida.');
  Object.assign(this,{nombre:nombre.trim(),apellido:apellido.trim(),correo:correo?.trim()||null,telefono:telefono?.trim()||null,edad:edad===''||edad===null?null:Number(edad)});
 }
}
