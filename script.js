var step = 10;
var id = undefined



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
            id = index;
            fillFields(index);

            }),
        $('<button class="btn btn-danger"/>').attr("id", String(index)).text("Delete").on('click', function(){removeUser(index)})
    ])
    $("table#users_table tbody").append(user_row.hide())

};

function hidePrevRows(step){
    for(var k = step-10; k > 0 ; k--){
        $("table#users_table tbody tr").eq(k-1).attr("style", "display:none")
    }
}

function hideNextRows(step){
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    for(var k = step; k <= users.length; k++){
        $("table#users_table tbody tr").eq(k).attr("style", "display:none")
    }
}       

function showRows(step){
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var id = Math.ceil(users.length/10);

    for(var k = step-10; k < step; k++){
        $("table#users_table tbody tr").eq(k).attr("style", "")
    };
    if (users.length <= 10) {
        $("ul.pagination li button#next-button").attr("style", "display: none");
        $("ul.pagination li button#prev-button").attr("style", "display: none");
    }else if (step === (id*10)) {
        $("ul.pagination li button#next-button").attr("style", "display:none");
        $("ul.pagination li button#prev-button").attr("style", "");
    }else if (users.length > 10 && step === 10) {
        $("ul.pagination li button#prev-button").attr("style", "display: none");
        $("ul.pagination li button#next-button").attr("style", "")

    }else{
        $("ul.pagination li button#prev-button").attr("style", "");
        $("ul.pagination li button#next-button").attr("style", "")
    };
};

function currentPage(){
    var users = JSON.parse(localStorage.getItem('users') || '[]');   
    for(var k = users.length; k > 0 ;k--){
            createUserRow(k, JSON.parse(users[k-1]))
        }
}



function nextPage(){
    step += 10;
    showRows(step);
    hidePrevRows(step);
    countPage(step)
};

function prevPage(){
    step -= 10;
    hideNextRows(step);
    showRows(step);
    countPage(step)
};


function countPage(step) {
    $("#pag-container button#number-page").text(String(step/10))
};


function createUser(e) {
    var form = $(e.target);
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


function fillFields(index) {
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var id = index-1;
    var userDataObject = JSON.parse(users[id]);
    var allHobbyArray = $('div#edit-hobby [name = edit-hobby]');
    var allCountry = $("select#edit-country").children()
    $("input#edit-name").attr("value", userDataObject.user_name);
    $("input#edit-surname").attr("value", userDataObject.user_surname);
    $("input#edit-age").attr("value", userDataObject.user_age);
    if (userDataObject.gender === "male") {
        $("input#edit-male").attr('checked', 'true');
    }else if (userDataObject.gender === "female"){
        $("input#edit-female").attr('checked', 'true');
    };
    if (userDataObject.hobby) {
        for(var k = 0, length3 = (userDataObject.hobby).length; k < length3; k++){
            for(var n = 0, length3 = allHobbyArray.length; n < length3; n++){
                if (userDataObject.hobby[k] === allHobbyArray.eq(n).val()) {
                    allHobbyArray.eq(n).attr("checked", "true")
                };
            };  
        };
    } else {
        for(var n = 0, length3 = allHobbyArray.length; n < length3; n++){
                allHobbyArray.eq(n).removeAttr("checked", "")
            }; 
    };    
    for(var k = 0; k < 10; k++){
            if (userDataObject.country === allCountry.eq(k).val()) {
                allCountry.eq(k).attr("selected", "true")
            };
        }; 

};



function editUser (e, id) {
    var editForm = $(e.target);
    var serialEdit = editForm.serializeArray();
    console.log(serialEdit)
    var editUserObj = new Object();
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
    console.log(editUserObj);
    var json_editForm = JSON.stringify(editUserObj);
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    users[id-1] = json_editForm 
    localStorage.setItem("users", JSON.stringify(_.compact(users)));
};

function sortInLS (array) {
    var sortedItems = array;
    localStorage.setItem('sort-order', JSON.stringify(sortedItems));
    setOrder(sortedItems)
};

function setOrder (sortedItems){
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var orderArray = sortedItems;
    orderedUsers = [];
    for(var k = 0, length3 = orderArray.length; k < length3; k++){
        for(var n = 0, length3 = users.length; n < length3; n++){
            if (Number(orderArray[k]) === (n+1)) {
                orderedUsers.unshift(users[n])
            }
        };
    };
    localStorage.setItem('users', JSON.stringify(_.compact(orderedUsers)))
};



function removeUser(index){
    var userList = JSON.parse(localStorage["users"]);
    var userConfirm = confirm("Delete this user ?");
    if (userConfirm){
        delete(userList[index-1]);
        localStorage.setItem("users", JSON.stringify(_.compact(userList)));   
    };
    location.reload();
};


currentPage();
showRows(step);
countPage(step);


$('#create_form').on('submit', function (e) {
    createUser(e);

});

$('#edit_form').on('submit', function(e){
    editUser(e, id);

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


$("#sortable").sortable({
    stop: function(event, ui) {sortInLS($(this).sortable("toArray"))}
})