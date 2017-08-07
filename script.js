$(function(){
    $('#create_form').on('submit', function (e) {
        e.preventDefault();
        var form = $(e.target);
        serial_form = form.serializeArray();
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
        console.log(userObj);
        createUserRow('0', userObj); //Вот тут добавил вызов
        json_form = JSON.stringify(userObj);
        
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(json_form);
        localStorage.setItem("users", JSON.stringify(users));
        console.log(users)

        console.log(userObj.user_name)
    });

});
  
    
function createUserRow(index, user) {
    var user_row = $("<tr />").append([
        $("<td />").text(index),
        $("<td />").text(user.user_name),
        $("<td />").text(user.user_surname),
        $("<td />").text(user.user_age),
        $("<td />").text(user.gender),
        $("<td />").text(user.hobby.join(",")),
        $("<td />").text(user.country)
    ])

    $("table#users_table tbody").append(user_row)
};