CREATE TABLE IF NOT EXISTS "usuario" (
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(255) NOT NULL,
    "apellido" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "rol" VARCHAR(255) NOT NULL,
    "fecha_registro" DATE NOT NULL,
    "ultimo_acceso" DATE NOT NULL
);


CREATE TABLE IF NOT EXISTS "empresa" (
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(255) NOT NULL,
    "industria" VARCHAR(255) NOT NULL,
    "fecha_fundacion" DATE NOT NULL,
    "numero_empleados" INT NOT NULL,
    "etapa_crecimiento" VARCHAR(255) NOT NULL,
    "modelo_negocio" VARCHAR(255) NOT NULL,
    "propuesta_valor" VARCHAR(255) NOT NULL,
    "mercado_objetivo" VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS "adn_startup" (
    "id" SERIAL PRIMARY KEY,
    "empresa_id" INT NOT NULL REFERENCES empresa(id),
    "vision" VARCHAR(255) NOT NULL,
    "mision" VARCHAR(255) NOT NULL,
    "valores" VARCHAR(255) NOT NULL,
    "objetivos_cortoplazo" VARCHAR(255) NOT NULL,
    "objetivos_largoplazo" VARCHAR(255) NOT NULL,
    "estrategia_crecimiento" VARCHAR(255) NOT NULL,
    "ventaja_competitiva" VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS "datos_financieros" (
    "id" SERIAL PRIMARY KEY,
    "empresa_id" INT NOT NULL REFERENCES empresa(id),
    "fecha" DATE NOT NULL,
    "ingresos" FLOAT NOT NULL,
    "gastos" FLOAT NOT NULL,
    "beneficio_neto" FLOAT NOT NULL,
    "flujo_caja" FLOAT NOT NULL,
    "valoracion" FLOAT NOT NULL
);


CREATE TABLE IF NOT EXISTS "kpi" (
    "id" SERIAL PRIMARY KEY,
    "empresa_id" INT NOT NULL REFERENCES empresa(id),
    "nombre" VARCHAR(255) NOT NULL,
    "categoria" VARCHAR(255) NOT NULL,
    "valor_actual" FLOAT NOT NULL,
    "valor_objetivo" FLOAT NOT NULL,
    "unidad_medida" VARCHAR(255) NOT NULL,
    "frecuencia_actualizacion" VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "chat" (
    "id" SERIAL PRIMARY KEY,
    "usuario_id" INT NOT NULL REFERENCES usuario(id),
    "fecha_inicio" DATE NOT NULL,
    "ultima_actividad" DATE NOT NULL,
    "estado" VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS "mensaje" (
    "id" SERIAL PRIMARY KEY,
    "chat_id" INT NOT NULL REFERENCES chat(id),
    "usuario_id" INT NOT NULL REFERENCES usuario(id),
    "contenido" VARCHAR(255) NOT NULL,
    "timestamp" TIMESTAMP NOT NULL,
    "tipo" VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS "analisis_recomendacion" (
    "id" SERIAL PRIMARY KEY,
    "empresa_id" INT NOT NULL REFERENCES empresa(id), 
    "fecha_generacion" DATE NOT NULL,
    "tipo_analisis" VARCHAR(255) NOT NULL,
    "contenido_analisis" VARCHAR(255) NOT NULL,
    "recomendaciones" VARCHAR(255) NOT NULL,
    "estado" VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS "integracion_datos" (
    "id" SERIAL PRIMARY KEY,
    "empresa_id" INT NOT NULL REFERENCES empresa(id),
    "fuente_datos" VARCHAR(255) NOT NULL,
    "tipo_datos" VARCHAR(255) NOT NULL,
    "frecuencia_actualizacion" VARCHAR(255) NOT NULL,
    "ultima_actualizacion" TIMESTAMP NOT NULL,
    "estado_conexion" VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS "plan_suscripcion" (
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(255) NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "precio" FLOAT NOT NULL,
    "periodicidad" VARCHAR(255) NOT NULL,
    "caracteristicas" VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS "suscripcion" (
    "id" SERIAL PRIMARY KEY,
    "empresa_id" INT NOT NULL REFERENCES empresa(id),
    "plan_id" INT NOT NULL REFERENCES plan_suscripcion(id),
    "fecha_inicio" DATE NOT NULL,
    "fecha_renovacion" DATE NOT NULL,
    "estado" VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "vector_embedding" (
    "id" SERIAL PRIMARY KEY,
    "empresa_id" INT NOT NULL REFERENCES empresa(id),
    "tipo_dato" VARCHAR(255) NOT NULL,
    "vector" FLOAT NOT NULL,
    "metadatos" JSON NOT NULL,
    "fecha_creacion" TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "notificacion" (
    "id" SERIAL PRIMARY KEY,
    "usuario_id" INT NOT NULL REFERENCES usuario(id),
    "contenido" VARCHAR(255) NOT NULL,
    "timestamp" TIMESTAMP NOT NULL,
    "tipo" VARCHAR(255) NOT NULL,
    "estado" VARCHAR(255) NOT NULL
);
