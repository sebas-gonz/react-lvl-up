import { describe, it, expect, beforeEach } from 'vitest';
import Usuario from './Usuario';

describe('Clase Usuario', () => {

    beforeEach(() => {
        // Llamamos a tu método estático para resetear el contador a 1
        Usuario.syncNextId([]);
    });

    it('debería asignar tipoUsuario 1 (Admin) al primer usuario (ID 1)', () => {
        const admin = new Usuario({
            nombre: 'Admin',
            correo: 'admin@test.com',
            contraseña: '123'
        });

        expect(admin.usuarioId).toBe(1);
        expect(admin.tipoUsuario).toBe(1);
    });

    it('debería asignar tipoUsuario 3 (Cliente) por defecto a otros usuarios', () => {
        new Usuario({ nombre: 'Admin', correo: 'admin@test.com', contraseña: '123' });

        const cliente = new Usuario({
            nombre: 'Cliente',
            correo: 'cliente@test.com',
            contraseña: '123'
        });

        expect(cliente.usuarioId).toBe(2);
        expect(cliente.tipoUsuario).toBe(3); // siempre
    });

    it('debería asignar un tipoUsuario específico si se provee', () => {
        new Usuario({ nombre: 'Admin', correo: 'admin@test.com', contraseña: '123' });

        const vendedor = new Usuario({
            nombre: 'Vendedor',
            correo: 'vendedor@test.com',
            contraseña: '123',
            tipoUsuario: 2 // tipo de usuario
        });

        expect(vendedor.usuarioId).toBe(2);
        expect(vendedor.tipoUsuario).toBe(2);
    });

    it('debería serializar los datos correctos con toJSON()', () => {
        const usuario = new Usuario({
            usuarioId: 5,
            nombre: 'Test',
            correo: 'test@test.com',
            contraseña: 'Secreta',
            tipoUsuario: 3
        });

        const jsonObject = usuario.toJSON();

        expect(jsonObject.nombre).toBe('Test');
        expect(jsonObject.correo).toBe('test@test.com');
        expect(jsonObject.contraseña).toBe('Secreta');

        // (Opcional) Comprobar que no hay campos privados
        expect(jsonObject).not.toHaveProperty('#nombre');
    });

});