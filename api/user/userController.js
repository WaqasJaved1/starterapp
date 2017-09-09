/**
 * groupController.js
 *
 * @description :: Server-side logic for managing groups.
 */

var pool = require('../../database/pool');
var mysql = require('mysql');



function convertDateTime(data) {
    return data.replace('T', ' ').replace('Z', '');
}

function newuserQuery(data) {
    return query = "INSERT INTO `users`(`Name`, `Contact`, `Email`, `Password`, `City`, `Roles_id`, `SubArea`, `StreetAddress`, `House`) VALUES (" + mysql.escape(data.Name) + "," + mysql.escape(data.Contact) + "," + mysql.escape(data.Email) + "," + mysql.escape(data.Password) + "," + mysql.escape(data.City) + "," + mysql.escape(data.RoleType) + "," + mysql.escape(data.SubArea) + "," + mysql.escape(data.StreetAddress) + "," + mysql.escape(data.House)  + ")";
}

function getListQuery() {
    return query = "SELECT users.id,count(riderschedule.Customer_id) as customer_count, users.Name, users.Contact, users.Email, users.Password, users.City, users.SubArea, users.StreetAddress, users.House, roles.Type FROM users INNER JOIN roles on users.Roles_id = roles.id LEFT JOIN riderschedule on users.id = riderschedule.Users_id WHERE users.IsActive = true group by users.id;"
}

function getCustomerQuery(id){
    return query = "SELECT * FROM users WHERE id = " + mysql.escape(id);
}

function updateuserQuery(data, id){
    return query = "UPDATE users SET Name= "+mysql.escape(data.Name)+",Contact= "+mysql.escape(data.Contact)+",Email= "+mysql.escape(data.Email)+",Password= "+mysql.escape(data.Password) +",City="+mysql.escape(data.City)+",SubArea="+mysql.escape(data.SubArea)+",StreetAddress="+mysql.escape(data.StreetAddress)+",House="+mysql.escape(data.House)+ ",Roles_id="+mysql.escape(data.RoleType)+" WHERE id = "+mysql.escape(id)+";";
}

function deleteuserQuery(id){
    return query = "UPDATE `users` SET `IsActive`=false WHERE id=" +mysql.escape(id)+";";
}


module.exports = {

    create: function(req, res) {
        pool.query(newuserQuery(req.body), function(error, results, fields) {
            if (error) {
                console.log(error);
                return res.json({ 'status': 1000, 'message': error.code });
            }

            return res.json({ 'status': 200, 'message': results });
        });

    },

    list: function(req, res) {
        pool.query(getListQuery(), function(error, results, fields) {
            if (error) {
                console.log(error);
                return res.json({ 'status': 1000, 'message': error.code });
            }

            return res.json({ 'status': 200, 'message': results });
        });
    },

    single:function(req, res){
        pool.query(getCustomerQuery(req.params.id), function(error, results, fields) {
            if (error) {
                console.log(error);
                return res.json({ 'status': 1000, 'message': error.code });
            }

            return res.json({ 'status': 200, 'message': results });
        });
    },

    delete: function(req, res) {
        pool.query(deleteuserQuery(req.params.id), function(error, results, fields) {
            if (error) {
                console.log(error);
                return res.json({ 'status': 1000, 'message': error.code });
            }

            return res.json({ 'status': 200, 'message': results });
        });
    },

    update:function(req,res){
        pool.query(updateuserQuery(req.body, req.params.id), function(error, results, fields) {
            if (error) {
                console.log(error);
                return res.json({ 'status': 1000, 'message': error.code });
            }

            return res.json({ 'status': 200, 'message': results });
        });
    }

}



