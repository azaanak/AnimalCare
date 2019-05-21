import { LogsInfo } from '../../components/Utils/LogsInfo';
import { Constants } from '../constants/Constants';

class DataController {

    validateUser(db, loginState, loginCallback) {
        LogsInfo('validateUser - imran ali username => '+"\n Password =>");
        db.transaction( 
            function (txn){ 
                LogsInfo('Table Name =>'+Constants.tableName.user);
                LogsInfo('loginState.username =>'+loginState.username);
                LogsInfo('loginState.password =>'+loginState.password);
                txn.executeSql('SELECT * from user where userLoginName=? and userPassword=? ',[loginState.username, loginState.password],
                    function(tx, res) {
                        if(res.rows.length > 0){
                            LogsInfo('Record found. ');
                            loginCallback(res.rows.item(0));
                        }else{
                            LogsInfo('user not found in database.');
                            loginCallback(null);
                        }
                    }, function(err){
                        LogsInfo('Login user not found.', err);
                        loginCallback(null);
                    }
                );
            });      
    };

    saveLoginUserData(db, jsonResult, loginState){
        dataController.dropDatabaseEmptyTable(db, Constants.tableName.user, false);
        dataController.createTable(db, Constants.tableSQL.user);
        dataArray = 
        [   jsonResult.user.id, loginState.username, loginState.password, 
            jsonResult.accessToken, jsonResult.tokenType, jsonResult.expiration, 
            jsonResult.user.username,jsonResult.user.firstName,jsonResult.user.lastName,
            jsonResult.user.fullName,jsonResult.user.email,jsonResult.user.role,
            jsonResult.user.type,jsonResult.user.isActive,jsonResult.user.createdOn,
            jsonResult.user.updatedOn,jsonResult.user.createdBy,jsonResult.user.updatedBy,
            jsonResult.user.isDeleted, jsonResult.user.divisionId
        ];
        dataController.insertOrUpdateData(db, Constants.tableInsertSQL.user, dataArray);
    };
    
    /**
     * -------------
     * @param {*} db 
     */
    dropDatabaseEmptyTable(db, dropTableName, forceDelete){
        db.transaction( function (txn){ txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='"+dropTableName+"'",[],
            function(tx, res) {
                LogsInfo('res.rows.length =>'+res.rows.length);
                if (forceDelete || res.rows.length == 0) {
                    LogsInfo('Dropping TABLE ');
                    txn.executeSql('DROP TABLE IF EXISTS '+ dropTableName, [],
                    function(tx, res) {
                        LogsInfo('TABLE Successfully dropped');
                    }, function(err){
                        LogsInfo('TABLE could not dropped'+err);
                    });
                    
                }
            }, function(err){
                LogsInfo('Error'+err);
            });
        });       
    };
    createTable(db, sql){
        db.transaction(
        function (txn){
            txn.executeSql(sql, [],
            function(tx, res) {
                LogsInfo('CREATE TABLE Success');
            }, function(err){
                LogsInfo('CREATE TABLE Error'+err);
            });
        });
    };
    insertOrUpdateData(db, sql, dataArray){
        db.transaction(
        function (txn){
            txn.executeSql(sql, dataArray,
            function(tx, res) {
                LogsInfo('INSERT Data Success');
            }, function(err){
                LogsInfo('INSERT Error '+err);
            });
        });
    };
    selectData(db, sql){
        db.transaction(
        function (txn){
            txn.executeSql(sql, [], 
            function (tx, res) {
                LogsInfo('select data success  '+res.rows.length);
                for (let i = 0; i < res.rows.length; ++i) {
                    console.log('item:', res.rows.item(i));
                }
            }, function(err){
                LogsInfo('SELECT Error '+err);
            });
        });
    };
}

const dataController = new DataController();
export default dataController;