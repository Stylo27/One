function createUserRow(index, user) {
    // Добавляет пользователя в таблицу
    if (user.hobby){
        var userhobby = user.hobby
    } else {
        userhobby = "No hobby"
    }
    var user_row = $("<tr/>").attr("id", String(index)).append([
        $("<td />").text(index),
        $("<td />").text(user.user_name),
        $("<td />").text(user.user_surname),
        $("<td />").text(user.user_age),
        $("<td />").text(user.gender),
        $("<td />").text(userhobby),
        $("<td/>").text(user.country),
        $('<button  class="btn btn-danger" />').attr("id", String(index)).text("Delete").on('click', function(){removeUser(index)})
    ])
    $("table#users_table tbody").append(user_row)

};

function hideRows(step){
    for(var k = 1; k <= step ; k++){
        var starterElement = $("table#users_table tbody tr").eq(String(k)).hide()

    }
}


function currentPage(start=0, end=10){
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var tenUsers = users.slice(start, end)
    
    for(var k = 0; k < tenUsers.length ; k++){
            console.log(tenUsers[k])
            createUserRow(start+1 ,JSON.parse(tenUsers[k]))
            start++
        }
}


function nextPage(step=10){
    hideRows(step)
    currentPage(step, step+10)
}

currentPage();
// iterLocalStorage();

function removeUser(index){
    var userList = JSON.parse(localStorage["users"]);
    var userConfirm = confirm("Delete this user ?");
    if (userConfirm){
        delete(userList[index-1]);
        localStorage.setItem("users", JSON.stringify(_.compact(userList)));
        location.reload();   
    };
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
                    } else {
                        userObj["hobby"] = [serial_form[k].value]        
                    }
                } else {
                    userObj[serial_form[k].name] = serial_form[k].value;
                }
            }


        var json_form = JSON.stringify(userObj);
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(json_form);
        localStorage.setItem("users", JSON.stringify(users));
        
        console.log('users :',users)
        
        location.reload();

    });


});
  
// $("#users_table tbody tr button").on("click", function(e) {
//     /* Act on the event */
//     var button = $(e.target)
//     var del = button.attr("id")
//     removeUser(del);
//     })
    
$(".panel-default ul.pagination li button#next-button").on("click", function(e){
    console.log('click')
    nextPage();
})