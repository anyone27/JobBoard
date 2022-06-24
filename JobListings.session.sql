CREATE TABLE Users(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    surname VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    country_code VARCHAR(2),
    cv_location VARCHAR(255),
    flagged BOOLEAN
);
CREATE INDEX email_index ON Users(email);
CREATE TABLE Companies(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) UNIQUE NOT NULL,
    website VARCHAR(255),
    description VARCHAR(1020),
    logo VARCHAR(255),
    flagged BOOLEAN
);
CREATE INDEX company_name_index ON Companies(name);
CREATE TABLE Employees(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    company_id INT NOT NULL,
    position VARCHAR(255) NOT NULL,
    permissions VARCHAR(255) NOT NULL,
    admin BOOLEAN,
    current BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (company_id) REFERENCES Companies(id)
);
CREATE TABLE Vacancies(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    company_id INT NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    tagline VARCHAR(255),
    position_description VARCHAR(10200) NOT NULL,
    city VARCHAR(255),
    fulltime_parttime_contract VARCHAR(9) NOT NULL,
    country_code VARCHAR(2),
    currency_symbol VARCHAR(4) NOT NULL,
    lower_pay_threshold DECIMAL(10, 2) UNSIGNED NOT NULL,
    upper_pay_threshold DECIMAL(10, 2) UNSIGNED,
    onsite_remote_hybrid VARCHAR(7) NOT NULL,
    created TIMESTAMP NOT NULL,
    expires_days INT,
    flagged BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (company_id) REFERENCES Companies(id)
);
CREATE TABLE Skills (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    skill VARCHAR(255) NOT NULL UNIQUE
);
CREATE TABLE Vacancy_skills(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    post_id INT NOT NULL,
    skill_id INT NOT NULL,
    years_experience INT,
    FOREIGN KEY (post_id) REFERENCES Vacancies(id),
    FOREIGN KEY (skill_id) REFERENCES Skills(id)
);
CREATE TABLE User_skills(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    skill_id INT NOT NULL,
    years_experience INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (skill_id) REFERENCES Skills(id)
);
CREATE TABLE Applications(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    vacancy_id INT NOT NULL,
    date_applied TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (vacancy_id) REFERENCES Vacancies(id)
);