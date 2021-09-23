// Your web app's Firebase configuration
const firebaseConfig = {
      apiKey: "AIzaSyDPmUjNLylWCekpZ1-ScRjV59UW9TdkFoY",
      authDomain: "kwitter-81baa.firebaseapp.com",
      databaseURL: "https://kwitter-81baa-default-rtdb.firebaseio.com",
      projectId: "kwitter-81baa",
      storageBucket: "kwitter-81baa.appspot.com",
      messagingSenderId: "722035925831",
      appId: "1:722035925831:web:628157a785ac2fb2ada262"
    };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

room_name = localStorage.getItem("room_name");
user_name = localStorage.getItem("user_name");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });

      document.getElementById("msg").value = "";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];
                        name_with_tag = "<h4> "+ name + "<img class='user_tick' src='tick.png'></h4>";
                        message_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
                        span_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

                        document.getElementById("output").innerHTML += name_with_tag + message_tag + like_button + span_tag;
                        //End code
                  }
            });
      });
}
getData();

function updateLike(message_id) {
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      like = document.getElementById(button_id).value;
      update_likes = Number(like) + 1;
      console.log(update_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like : update_likes
      });
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}