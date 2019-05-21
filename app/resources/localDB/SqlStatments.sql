CREATE TABLE "login" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
	"userId"	TEXT,
	"userLoginName"	TEXT,
	"userPassword"	TEXT,
	"accessToken"	BLOB,
	"tokenType"	TEXT,
	"expiration"	TEXT
)

CREATE TABLE "user" (
	"id"	TEXT,
	"userName"	TEXT,
	"firstName"	TEXT,
	"lastName"	TEXT,
	"fullName"	TEXT,
	"email"	TEXT,
	"role"	TEXT,
	"type"	TEXT,
	"isActive"	INTEGER,
	"createdOn"	TEXT,
	"updatedOn"	TEXT,
	"createdBy"	TEXT,
	"updatedBy"	TEXT,
	"isDeleted"	INTEGER,
	"divisionId"	TEXT
)

CREATE TABLE "division" (
	"id"	TEXT,
	"divisionNumber"	TEXT,
	"revisionDateTime"	TEXT,
	"revisionNote"	TEXT,
	"status"	INTEGER,
	"title"	TEXT,
	"createdOn"	TEXT,
	"updatedOn"	TEXT,
	"createdBy"	TEXT,
	"updatedBy"	TEXT,
	"isActive"	INTEGER,
	"isDeleted"	INTEGER
)

CREATE INDEX "loginIdIndex" ON "login" (
	"id",
	"userId"
)

CREATE INDEX "userIdIndex" ON "user" (
	"id"	ASC,
	"divisionId"	ASC
)

CREATE INDEX "divisionIdIndex" ON "division" (
	"id"	ASC
)