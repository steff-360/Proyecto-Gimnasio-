import {MovimientoFactory} from '../domain/MovimientoFactory.js';
export class FinanzasService {
 constructor(repo){this.repo=repo;}
 requireAdmin(usuario){if(usuario?.rol!=='ADMIN')throw new Error('Acceso denegado: se requiere rol ADMIN.');}
 registrar(d,u){this.requireAdmin(u);return this.repo.registrar(MovimientoFactory.crear({...d,creado_por:u.id}));}
 listar(filtros,usuario){this.requireAdmin(usuario);return this.repo.listar(filtros);}
 balance(filtros,usuario){this.requireAdmin(usuario);return this.repo.balance(filtros);}
}
