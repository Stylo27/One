var step = 10;
var id = undefined

console.log("first:",id)


function createUserRow(index, user) {
    if (user.hobby){
        var userhobby = user.hobby;
        } else {
        userhobby = "No hobby"
    }
    var user_row = $("<tr/>").attr("id", String(index)).append([
        $("<td/>").text(index),
        $("<td/>").text(user.user_name),
        $("<td/>").text(user.user_surname),
        $("<td/>").text(user.user_age),
        $("<td/>").text(user.gender),
        $("<td/>").text(userhobby),
        $("<td/>").text(user.country),
        $('<button class="btn btn-primary" href="div#edit-card"/>').attr("id", String(index)).text("Edit").click(function() {
            $("button#create-btn").hide()
            $("div#edit-card").attr("style", "");
            var elementClick = $(this).attr("href");
            var destination = $(elementClick).offset().top;
            $("html:not(:animated),body:not(:animated)").animate({
                  scrollTop: destination
                }, 800);
            id = index
            console.log(index)
            console.log(id)
            }),
        $('<button class="btn btn-danger"/>').attr("id", String(index)).text("Delete").on('click', function(){removeUser(index)})
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
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var id = Math.ceil(users.length/10);
    for(var k = step-10; k <= step; k++){
        $("table#users_table tbody tr").eq(k).attr("style", "")
    };
    if (step === 10) {
        $("ul.pagination li button#prev-button").attr("style", "display:none")
    } else if (String(step) === String(id*10)) {
        $("ul.pagination li button#next-button").attr("style", "display:none")
    }else{
        $("ul.pagination li button#prev-button").attr("style", "");
        $("ul.pagination li button#next-button").attr("style", "")
    };
};

function currentPage(){
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var id = users.length;
    for(var k = users.length; k > 0 ; k--, id--){
            createUserRow(id ,JSON.parse(users[k-1]))
        }
};


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


function countPage(step) {
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var round = Math.ceil(users.length/10);
    for(var k = 1; k < round+1 ; k++){
        $("ul.pagination").append($("<button/>").text(k).attr("id", String(k)).on('click', function(){}))
    };

};

function createUser(e) {
    var form = $(e.target);
    console.log(form)
    var serial_form = form.serializeArray();
    var userObj = new Object()
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
};


function editUser (e, id) {
    var editForm = $(e.target);

    var serialEdit = editForm.serializeArray();
    var editUserObj = new Object()
    for(var k = 0, length3 = serialEdit.length; k < length3; k++){
            if(serialEdit[k].name === "hobby"){
                if(editUserObj["hobby"]){
                    editUserObj["hobby"].push(serialEdit[k].value)
                } else {
                    editUserObj["hobby"] = [serialEdit[k].value]        
                }
            } else {
                editUserObj[serialEdit[k].name] = serialEdit[k].value;
            };
        };
    var json_editForm = JSON.stringify(editUserObj);
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    users[id-1] = json_editForm
    alert(json_editForm)
    alert(users)
    localStorage.setItem("users", JSON.stringify(_.compact(users)));
};

currentPage();
showRows(step);
countPage()

function removeUser(index){
    var userList = JSON.parse(localStorage["users"]);
    var userConfirm = confirm("Delete this user ?");
    if (userConfirm){
        delete(userList[index-1]);
        localStorage.setItem("users", JSON.stringify(_.compact(userList)));
        location.reload();   
    };
};




$('#create_form').on('submit', function (e) {
    createUser(e);
    location.reload();

});

$('#edit_submit').on('submit', function(e){
    editUser(e, id);
    alert(id)
    // location.reload();
});

   

$("ul.pagination li button#next-button").on("click", function(e){
    nextPage();
});

$("ul.pagination li button#prev-button").on("click", function(e){
    prevPage();
});


$("button#create-btn").click(function() {
    $(this).attr("style", "display: none");
    $("div#create-card").attr("style", "");
    var elementClick = $(this).attr("href");
    var destination = $(elementClick).offset().top;
    $("html:not(:animated),body:not(:animated)").animate({
          scrollTop: destination
        }, 800);
});  
