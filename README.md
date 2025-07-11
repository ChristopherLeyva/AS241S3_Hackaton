# AS241S3_Hackaton
# ⚙️ Proyecto Full Stack - Hackatón

Aplicación web con **Spring Boot**, **Angular** y **SQL Server (Docker)** que permite **crear, listar, editar, eliminar** y **generar reportes PDF (JasperReport)**.

## 🧰 Tecnologías

- 🧩 Backend: Java + Spring Boot + JPA
- 🎨 Frontend: Angular
- 🗄️ BD: SQL Server (Docker)
- 📄 JasperReport
- 📫 Postman (para pruebas)

## 📌 Funcionalidades

- ✅ CRUD completo (POST, GET, PUT, DELETE)
- 🔍 Filtro por 2 campos
- 🧾 Reportes PDF desde backend y frontend
- 🔒 Validaciones frontend (required, min/max, patrón, numérico)

## 🗃️ Base de Datos

Tabla principal: `items`

| Campo       | Tipo        |
|-------------|-------------|
| id          | INT         |
| nombre      | VARCHAR     |
| descripcion | TEXT        |
| cantidad    | INT         |
| precio      | DECIMAL     |
| activo      | BIT         |

## 🐳 Docker (SQL Server)

```yaml
services:
  sqlserver:
    image: mcr.microsoft.com/mssql/server:2022-latest
    ports:
      - "1433:1433"
    environment:
      SA_PASSWORD: "YourPassword123"
      ACCEPT_EULA: "Y"
