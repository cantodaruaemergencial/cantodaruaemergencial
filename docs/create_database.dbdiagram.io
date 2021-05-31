Table person {
  id int [pk, increment]
  name varchar(256) [not null]
  social_name varchar(256)
  birthdate datetime [not null]
  mother_name varchar(256) [not null]
  birth_place varchar(256) [not null]
  skin_color_id int [ref: > skin_color.id, not null] 
  gender_id int [ref: > gender.id, not null]
  childrens int [not null]
  has_habitation bool [not null]
  homeless_time varchar(256) [not null]
  emergency_aid bool [not null]
  pbh_basket bool [not null]
  unique_register bool [not null]
  has_general_register bool [not null]
  general_register varchar(32)
  has_cpf bool [not null]
  cpf varchar(11)
  has_ctps bool [not null]
  has_birth_certificate bool [not null]
  marital_status_id int [ref: > marital_status.id, not null]
  school_training_id int [ref: > school_training.id, not null]
  reference_location varchar(256) [not null]
  occupation varchar(256) [not null]
  profession varchar(256) [not null]
  contact_phone varchar(128)
  reference_address varchar(512)
  demands varchar(1024)
  observation varchar(1024)
  
  created_by varchar(128) [not null]
  created_time datetime [not null]
}

Table entrance {
  id int [pk, increment]
  person_id int [ref: > person.id]
  date datetime
  
  indexes {
    (person_id, date) [unique]
  }
}

Table attendance {
  id int [pk, increment]
  service_id int [ref: > service.id]
  entrance_id int [ref: > entrance.id]
}

Table service {
  id int [pk, increment]
  service varchar(256) [not null, unique]
}

Table skin_color {
  id int [pk, increment]
  skin_color varchar(256) [not null, unique]
}

Table gender {
  id int [pk, increment]
  gender varchar(256) [not null, unique]
}


Table marital_status {
  id int [pk, increment]
  marital_status varchar(256) [not null, unique]
}

Table school_training {
  id int [pk, increment]
  school_training varchar(256) [not null, unique]
}

Table benefit {
  id int [pk, increment]
  benefit varchar(256) [not null, unique]
}

Table person_benefit {
  id int [pk, increment]
  person_id int [ref: > person.id, not null]
  benefit_id int [ref: > benefit.id, not null]
  
  indexes {
    (person_id, benefit_id) [unique]
  }
}

Table external_service {
  id int [pk, increment]
  external_service varchar(256) [not null, unique]
}

Table person_external_service {
  id int [pk, increment]
  person_id int [ref: > person.id, not null]
  external_service_id int [ref: > external_service.id, not null]
  
  indexes {
    (person_id, external_service_id) [unique]
  }
}