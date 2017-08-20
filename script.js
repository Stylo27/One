var step = 10;
var id = undefined



function createUserRow(user) {
    if (user.hobby){
        var userhobby = user.hobby;
        } else {
        userhobby = "No hobby"
    }
    var user_row = $("<tr/>").attr("id", String(user.id)).append([
        $("<td/>").text(user.id + 1),
        $("<td/>").text(user.user_name),
        $("<td/>").text(user.user_surname),
        $("<td/>").text(user.user_age),
        $("<td/>").text(user.gender),
        $("<td/>").text(userhobby),
        $("<td/>").text(user.country),
        $('<button class="btn btn-primary" href="div#edit-card"/>').attr("id", String(user.id)).text("Edit").click(function() {
            $("button#create-btn").hide()
            $("div#edit-card").attr("style", "");
            var elementClick = $(this).attr("href");
            var destination = $(elementClick).offset().top;
            $("html:not(:animated),body:not(:animated)").animate({
                  scrollTop: destination
                }, 800);
            id = user.id;
            fillFields(user.id);

            }),
        $('<button class="btn btn-danger"/>').attr("id", String(user.id)).text("Delete").on('click', function(){removeUser(user.id)})
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
            createUserRow(JSON.parse(users[k-1]))
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

function parseId () {
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var temp = [];
    for(var k = 0, length3 = users.length; k < length3; k++){
        temp.push(JSON.parse(users[k]).id)
    }
    return Math.max.apply( Math, temp );
}

function createUser(e) {
    var form = $(e.target);
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var serial_form = form.serializeArray();
    var userObj = new Object()
    userObj.id = parseId() + 1;
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
    users.push(json_form);
    localStorage.setItem("users", JSON.stringify(users));
};


function fillFields(index) {
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    for(var k = 0, length3 = users.length; k < length3; k++){
            var user = JSON.parse(users[k])
            if (index === user.id){
                var allHobbyArray = $('div#edit-hobby').children();
                var allCountry = $("select#edit-country").children()
                $("input#edit-name").attr("value", user.user_name);
                $("input#edit-surname").attr("value", user.user_surname);
                $("input#edit-age").attr("value", user.user_age);
                if (user.gender === "male") {
                    $("input#edit-male").attr('checked', 'true');
                }else if (user.gender === "female"){
                    $("input#edit-female").attr('checked', 'true');
                };
                if (user.hobby) {
                    for(var k = 0, length3 = (user.hobby).length; k < length3; k++){
                        for(var n = 0, length3 = allHobbyArray.length; n < length3; n+=3){
                            if (user.hobby[k] === allHobbyArray.eq(n).val()) {
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
                        if (user.country === allCountry.eq(k).val()) {
                            allCountry.eq(k).attr("selected", "true")
                        };
                    }; 
                 
            };
        };

};



function editUser (e, id) {
    var editForm = $(e.target);
    var serialEdit = editForm.serializeArray();
    var editUserObj = new Object();
    editUserObj.id = id
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
    for(var k = 0, length3 = users.length; k < length3; k++){
            var user = JSON.parse(users[k])
            if (id === user.id){
                (users[users.indexOf(JSON.stringify(user))]) = json_editForm;
                localStorage.setItem("users", JSON.stringify(_.compact(users))); 
                break;  
            };
        };
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
            var userObj = JSON.parse(users[n])
            if (Number(orderArray[k]) === (userObj.id)) {
                orderedUsers.unshift(users[n])
            }
        };
    };
    localStorage.setItem('users', JSON.stringify(_.compact(orderedUsers)))
};



function removeUser(index){
    var userConfirm = confirm("Delete this user ?");
    if (userConfirm){
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        for(var k = 0, length3 = users.length; k < length3; k++){
            var userObj = JSON.parse(users[k])
            if (index === userObj.id){
                delete(users[users.indexOf(JSON.stringify(userObj))]);
                localStorage.setItem("users", JSON.stringify(_.compact(users))); 
                break;  
            };
        };
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