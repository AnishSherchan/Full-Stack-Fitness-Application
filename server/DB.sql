-- ? Creating database name as guardian_fitness
CREATE DATABASE guardian_fitness;
-- ? Creating table for user with all necessary attributes
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_role VARCHAR(255) NOT NULL,
    account_status VARCHAR(255) NOT NULL
);
-- ? Inserting values inside tbale named as user..
INSERT INTO users (user_name,user_email,user_password,user_role,account_status) VALUES ('Anish','sherchananish11@gmail.com','anish','admin','Active');
-- ? Creating Table User_Info
CREATE TABLE user_info(
    user_id uuid,
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    gender VARCHAR(255) NOT NULL,
    DOB DATE NOT NULL,
    weight integer NOT NULL,
    height integer NOT NULL,
    goal VARCHAR(255) NOT NULL,
    neck_size integer,
    shoulder_size integer,
    forearm_size integer,
    biceps_size integer,
    hip_size integer,
    thigh_size integer,
    claves_size integer,
    bmi NUMERIC(5,2)
);
-- ? Table Health Condition
CREATE Table health_condition(
    condition_id SERIAL PRIMARY KEY,
    condition_name VARCHAR(255) NOT NULL
);
-- ? Create Table User_health
CREATE Table user_health(
    condition_id integer ,
    FOREIGN KEY(condition_id) REFERENCES health_condition(condition_id),
    user_id uuid,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);
-- ? Table Supplement
CREATE Table supplement(
    supplement_id SERIAL PRIMARY KEY,
    supplement_name VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    tips VARCHAR(255) NOT NULL,
    energy VARCHAR(255) NOT NULL,
    protein VARCHAR(255) NOT NULL,
    carbs VARCHAR(255) NOT NULL,
    fat VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL
);