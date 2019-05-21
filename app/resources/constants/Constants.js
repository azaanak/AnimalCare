var Constants = {
	actionTypes: {
        LOGIN_SUCCESS: 'LOGIN_SUCCESS',
        LOGOUT: 'LOGOUT',
        APP_LOADED: 'APP_LOADED',
        GET_LOGIN_STATE: 'GET_LOGIN_STATE'
	},
    dbName: 'barnManagerSqlite.db',
    tableName: {
        login: 'login',
        user: 'user',
        division: 'division'
    },
    tableSQL:{
        user: 
            'CREATE TABLE IF NOT EXISTS user'+
            ' ('+
                ' id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,'+
                ' userId TEXT,'+
                ' userLoginName	TEXT,'+
                ' userPassword TEXT,'+
                ' accessToken BLOB,'+
                ' tokenType	TEXT,'+
                ' expiration TEXT,'+
                ' userName TEXT,'+
                ' firstName	TEXT,'+
                ' lastName TEXT,'+
                ' fullName TEXT,'+
                ' email	TEXT,'+
                ' role TEXT,'+
                ' type TEXT,'+
                ' isActive INTEGER,'+
                ' createdOn	TEXT,'+
                ' updatedOn	TEXT,'+
                ' createdBy	TEXT,'+
                ' updatedBy	TEXT,'+
                ' isDeleted	INTEGER,'+
                ' divisionId TEXT'+
            ')',
        division: 
            'CREATE TABLE IF NOT EXISTS division'+
            ' ('+
                ' id TEXT,'+
                ' divisionNumber TEXT,'+
                ' revisionDateTime TEXT,'+
                ' revisionNote TEXT,'+
                ' status INTEGER,'+
                ' title	TEXT,'+
                ' createdOn	TEXT,'+
                ' updatedOn	TEXT,'+
                ' createdBy	TEXT,'+
                ' updatedBy	TEXT,'+
                ' isActive INTEGER,'+
                ' isDeleted	INTEGER'+
            ')',
    },
    tableInsertSQL:{
        user:
        'INSERT INTO user'+
        ' ('+
            'userId,'+
            'userLoginName,'+
            'userPassword,'+
            'accessToken,'+
            'tokenType,'+
            'expiration,'+
            'userName,'+
            'firstName,'+
            'lastName,'+
            'fullName,'+
            'email,'+
            'role,'+
            'type,'+
            'isActive,'+
            'createdOn,'+
            'updatedOn,'+
            'createdBy,'+
            'updatedBy,'+
            'isDeleted,'+
            'divisionId'+
        ' )'+
        ' VALUES '+
        ' ('+
            ':userId,'+
            ':userLoginName,'+
            ':userPassword,'+
            ':accessToken,'+
            ':tokenType,'+
            ':expiration,'+
            ':userName,'+
            ':firstName,'+
            ':lastName,'+
            ':fullName,'+
            ':email,'+
            ':role,'+
            ':type,'+
            ':isActive,'+
            ':createdOn,'+
            ':updatedOn,'+
            ':createdBy,'+
            ':updatedBy,'+
            ':isDeleted,'+
            ':divisionId'+
        ' )',
    },
    tableSelectSQL: {
        user: 'SELECT * FROM  user',
        findLoginUser:  'SELECT * from user where userLoginName=? and userPassword=? ',
    },
};

export {Constants};