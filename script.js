function createUserRow(index, user) {
    // Добавляет пользователя в таблицу
    if (user.hobby != []){
        var userhobby = user.hobby
    } else {
        userhobby = text("No hobby")
    }
    var user_row = $("<tr />").append([
        $("<td />").text(index),
        $("<td />").text(user.user_name),
        $("<td />").text(user.user_surname),
        $("<td />").text(user.user_age),
        $("<td />").text(user.gender),
        $("<td />").text(userhobby),
        $("<td/>").text(user.country),
        $('<button id="userDelete" class="btn btn-danger" />').text("Delete")

    ])
    $("table#users_table tbody").append(user_row)

};

function iterLocalStorage() {
    // Итерирует данные в LocalStorage
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    for(var k = 0, length3 = users.length; k < length3; k++){
        console.log(users[k]);
        console.log(typeof(users[k]))
        createUserRow(k+1 ,JSON.parse(users[k]))
    }
    

};

iterLocalStorage();

function removeUser(id){
    var userList = JSON.parse(localStorage["users"]);
    var userConfirm = confirm("Delete this user ?");
    if (userConfirm){
        delete(userList[event.target]);
        localStorage.setItem("users", JSON.stringify(_.compact(userList)));
        location.reload();   
    };


    





$(function(){
    $('#create_form').on('submit', function (e) {
        var form = $(e.target);
        serial_form = form.serializeArray();
        console.log('serial_form : ',serial_form)
        userObj = new Object()
        for(var k = 0, length3 = serial_form.length; k < length3; k++){
            if(serial_form[k].name === "hobby"){
                if(userObj["hobby"]){
                    userObj["hobby"].push(serial_form[k].value)
                }
                else{
                    userObj["hobby"] = [serial_form[k].value]        
                }
            } else {
                userObj[serial_form[k].name] = serial_form[k].value;
            }
        }


        json_form = JSON.stringify(userObj);
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        createUserRow((users.length+1), userObj); // Добавляет юзера в таблицу 
        users.push(json_form);
        localStorage.setItem("users", JSON.stringify(users));
        
        console.log('users :',users)
        
        form.reset();

    });

    $("button").click(function(event) {
        /* Act on the event */
        var del = $("button").siblings().eq(0).val();
        console.log(del)
        // removeUser();
        });

});
  
    
