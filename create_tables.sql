-- Supprimer les tables qui ont des dépendances (clés étrangères) en premier
DROP TABLE IF EXISTS prescriptions;
DROP TABLE IF EXISTS medical_records;
DROP TABLE IF EXISTS appointments;

-- Supprimer les tables qui sont référencées par d'autres tables ensuite
DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS doctors;

-- Supprimer la table users (si elle n'est pas référencée par d'autres tables)
DROP TABLE IF EXISTS users;


DROP DATABASE  IF EXISTS medical_system;

-- Recréer la base de données
CREATE DATABASE medical_system;

-- Utiliser la base de données
\c medical_system;

-- Recréer les tables
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    last_name VARCHAR(100)  NOT NULL,
    first_name VARCHAR(100)  NOT NULL,
    phone VARCHAR(20)
);

-- create table for doctors
CREATE TABLE doctors (
    doctor_id SERIAL PRIMARY KEY,
    last_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    specialty VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- create table for patients
CREATE TABLE patients (
    patient_id SERIAL PRIMARY KEY,
    last_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10) CHECK (gender in ('Male', 'Female')),
    phone VARCHAR (20) UNIQUE NOT NULL,
    email VARCHAR (100) UNIQUE NOT NULL,
    address TEXT NOT NULL
);

-- create table for appointments
CREATE TABLE appointments (
    appointment_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(patient_id) ON DELETE CASCADE,
    doctor_id INT REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    appointment_date TIMESTAMP NOT NULL,
    status VARCHAR(20) CHECK (status IN ('scheduled', 'completed', 'cancelled')) DEFAULT 'scheduled'
);

-- Create table for medical records
CREATE TABLE medical_records (
    record_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(patient_id) ON DELETE CASCADE,
    doctor_id INT REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    diagnosis TEXT NOT NULL,
    treatment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE prescriptions (
    prescription_id SERIAL PRIMARY KEY,
    record_id INT REFERENCES medical_records(record_id) ON DELETE CASCADE,
    medication_name VARCHAR(100) NOT NULL,
    dosage VARCHAR(50) NOT NULL,
    instructions TEXT NOT NULL,
    prescribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

