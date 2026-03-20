CREATE DATABASE IF NOT EXISTS QUIZ;
CREATE USER IF NOT EXISTS 'Juan'@'localhost' IDENTIFIED BY 'quiz_viernes20';
-- GRANT ALL PRIVILEGES ON QUIZ.* TO 'Juan'@'localhost';

-- FLUSH PRIVILEGES;


USE QUIZ;

CREATE TABLE IF NOT EXISTS usuario (
    ID_usuario INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Nombre VARCHAR(255) NOT NULL,
    Documento INT(11) NOT NULL,
    Telefono INT(11) NOT NULL,
    Password_hash VARCHAR(255) NOT NULL
);

-- datos de prueba por insert

-- insert into usuarios (Nombre, Documento, Telefono, Password_hash) VALUES
-- ('Manuel', 1032568468, 3005672348, "12345" )