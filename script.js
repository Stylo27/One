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
    $("table#users_table tbody").append(user_row.hide())

};




function hidePrevRows(step){
    for(var k = step-10; k > 0 ; k--){
        console.log('prev-hide')
        $("table#users_table tbody tr").eq(k).attr("style", "display:none")
    }
     
}

function hideNextRows(step){
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    for(var k = step; k <= users.length; k++){
        console.log('next-hide')
        $("table#users_table tbody tr").eq(k).attr("style", "display:none")
    }

}       

function showRows(step){
    for(var k = step-9; k <= step; k++){
        $("table#users_table tbody tr").eq(k).attr("style", "")
    }
};

function currentPage(){
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    for(var k = 0; k < users.length ; k++){
            createUserRow(k+1 ,JSON.parse(users[k]))
        }
};

var step = 10;

function nextPage(){
    step += 10;
    console.log(step);
    showRows(step);
    hidePrevRows(step)
};

function prevPage(){
    step -= 10;
    console.log(step);
    hideNextRows(step);
    showRows(step);
};


currentPage();
showRows(step);

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
        location.reload();

    });


});
  
    
$(".panel-default ul.pagination li button#next-button").on("click", function(e){
    nextPage();
})

$(".panel-default ul.pagination li button#prev-button").on("click", function(e){
    prevPage();
})