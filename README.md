# UC3 · API segura de secretos

Práctica de ciberseguridad aplicada: detección local de una clave ficticia, limpieza del historial antes del primer push, configuración por entorno, lectura de una clave desde Vault en modo de laboratorio y actualización de dependencias con Dependabot.

## Configuración local

1. `npm ci`
2. Copia `.env.example` a `.env` y genera una clave local con `openssl rand -hex 24`.
3. Ejecuta `npm start`.
4. Envía `x-api-key` a `http://localhost:3000/api/datos`.

En modo entorno, define `API_KEY` fuera del repositorio. En el modo Vault de esta práctica, define `SECRET_SOURCE=vault`, `VAULT_ADDR` y `VAULT_TOKEN` solo en el entorno local. El servidor valida la configuración al arrancar y nunca imprime el valor del secreto.

## Bóveda

La ejecución `vault server -dev` del ejercicio es únicamente de laboratorio: memoria efímera, HTTP local y token raíz. Producción requiere identidad de máquina, TLS, políticas de mínimo privilegio, almacenamiento persistente y alta disponibilidad.

## Dependencias

`package-lock.json` fija el árbol exacto. Dependabot revisa actualizaciones cada semana; cada alerta o PR requiere revisión y auditoría antes de fusionar.
