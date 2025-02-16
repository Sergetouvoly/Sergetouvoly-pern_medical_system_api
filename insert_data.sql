-- Insert into users

INSERT INTO users (last_name, first_name, phone)
VALUES
    ('Doe', 'John', '123-456-7890'),
    ('Smith', 'Jane', '234-567-8901'),
    ('Brown', 'Alice', '345-678-9012'),
    ('Johnson', 'Bob', '456-789-0123'),
    ('Williams', 'Charlie', '567-890-1234');

    -- Insert into doctors

INSERT INTO doctors (last_name, first_name, specialty, phone, email)
VALUES
    ('Smith', 'Emily', 'Cardiology', '111-222-3333', 'emily.smith@example.com'),
    ('Johnson', 'Michael', 'Dermatology', '222-333-4444', 'michael.johnson@example.com'),
    ('Williams', 'Sarah', 'Pediatrics', '333-444-5555', 'sarah.williams@example.com'),
    ('Brown', 'David', 'Orthopedics', '444-555-6666', 'david.brown@example.com'),
    ('Davis', 'Laura', 'Neurology', '555-666-7777', 'laura.davis@example.com');



INSERT INTO patients (last_name, first_name, date_of_birth, gender, phone, email, address)
VALUES
    ('Taylor', 'Olivia', '1990-05-15', 'Female', '666-777-8888', 'olivia.taylor@example.com', '123 Main St, Cityville'),
    ('Anderson', 'James', '1985-10-22', 'Male', '777-888-9999', 'james.anderson@example.com', '456 Elm St, Townsville'),
    ('Martinez', 'Sophia', '1978-03-30', 'Female', '888-999-0000', 'sophia.martinez@example.com', '789 Oak St, Villageton'),
    ('Garcia', 'Liam', '1995-07-12', 'Male', '999-000-1111', 'liam.garcia@example.com', '321 Pine St, Hamletville'),
    ('Lee', 'Emma', '1982-12-05', 'Female', '000-111-2222', 'emma.lee@example.com', '654 Maple St, Countryside');


INSERT INTO appointments (patient_id, doctor_id, appointment_date, status)
VALUES
    (1, 5, '2023-10-15 09:00:00', 'scheduled'),
    (2, 3, '2023-10-16 10:00:00', 'completed'),
    (3, 2, '2023-10-17 11:00:00', 'scheduled'),
    (4, 4, '2023-10-18 12:00:00', 'cancelled'),
    (5, 1, '2023-10-19 13:00:00', 'scheduled');


INSERT INTO medical_records (patient_id, doctor_id, diagnosis, treatment)
VALUES
    (1, 1, 'Hypertension', 'Prescribed medication and lifestyle changes.'),
    (2, 2, 'Acne', 'Topical treatment and skincare routine.'),
    (3, 3, 'Common Cold', 'Rest and hydration.'),
    (4, 4, 'Fractured Arm', 'Casting and follow-up in 6 weeks.'),
    (5, 5, 'Migraine', 'Prescribed pain relief and stress management.');


INSERT INTO prescriptions (record_id, medication_name, dosage, instructions)
VALUES
    (1, 'Lisinopril', '10mg', 'Take once daily.'),
    (2, 'Benzoyl Peroxide', '5%', 'Apply to affected areas twice daily.'),
    (3, 'Acetaminophen', '500mg', 'Take as needed for pain or fever.'),
    (4, 'Ibuprofen', '400mg', 'Take every 6 hours as needed for pain.'),
    (5, 'Sumatriptan', '50mg', 'Take at the onset of migraine.');
