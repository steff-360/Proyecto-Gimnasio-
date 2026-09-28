import test from 'node:test';
import assert from 'node:assert/strict';
import { FinanzasRepository } from '../../src/repositories/FinanzasRepository.js';

function crearConexion({fallarInsercion = false} = {}) {
 const llamadas=[];
 const conexion={
  beginTransaction:async()=>llamadas.push('begin'),
  execute:async(sql)=>{
   if(fallarInsercion&&sql.startsWith('INSERT'))throw new Error('Fallo de inserción');
   return [{insertId:17}];
  },
  commit:async()=>llamadas.push('commit'),
  rollback:async()=>llamadas.push('rollback'),
  release:()=>llamadas.push('release')
 };
 return {llamadas,conexion,pool:{getConnection:async()=>conexion}};
}

const movimiento={tipo:'INGRESO',concepto:'Mensualidad',monto:120,fecha:'2026-09-01',creado_por:1};

test('registra un movimiento dentro de una transacción',async()=>{
 const {llamadas,pool}=crearConexion();
 const id=await new FinanzasRepository(pool).registrar(movimiento);
 assert.equal(id,17);
 assert.deepEqual(llamadas,['begin','commit','release']);
});

test('revierte y libera la conexión si falla el registro',async()=>{
 const {llamadas,pool}=crearConexion({fallarInsercion:true});
 await assert.rejects(()=>new FinanzasRepository(pool).registrar(movimiento),/Fallo de inserción/);
 assert.deepEqual(llamadas,['begin','rollback','release']);
});

test('agrega balance en SQL con filtros parametrizados',async()=>{
 let consulta;
 const totales=[{ingresos:'100.00',egresos:'35.50'}];
 const repo=new FinanzasRepository({execute:async(sql,parametros)=>{consulta={sql,parametros};return [totales];}});
 const balance=await repo.balance({desde:'2026-09-01',hasta:'2026-09-30',clienteId:9});
 assert.deepEqual(consulta.parametros,['2026-09-01','2026-09-30',9]);
 assert.match(consulta.sql,/fecha>=\?/);
 assert.match(consulta.sql,/fecha<=\?/);
 assert.match(consulta.sql,/cliente_id=\?/);
 assert.match(consulta.sql,/SUM\(CASE WHEN tipo='INGRESO'/);
 assert.deepEqual(balance,{ingresos:100,egresos:35.5,balance:64.5});
});

test('rechaza fechas imposibles y rangos invertidos en consultas financieras',async()=>{
 const repo=new FinanzasRepository({execute:async()=>[[]]});
 await assert.rejects(()=>repo.listar({desde:'2026-02-30'}),/fecha válida/);
 await assert.rejects(()=>repo.balance({desde:'2026-10-01',hasta:'2026-09-01'}),/no puede ser posterior/);
});