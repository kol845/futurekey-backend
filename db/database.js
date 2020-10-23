var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "./db/db.sqlite"
let database={
    get:(sql_command, callback)=>{
        let db = new sqlite3.Database(DBSOURCE);
        await db.get(sql_command, function(err, rows){
            if(err){
                console.log(err);
            }else{
                callback(rows);
            }
        });
    }
}


export default database;
