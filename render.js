const {ipcRenderer} = require('electron');
import {Bot} from "./bot.js";

var token;
var current;
var commands = [];

console.log = function(str) {
    var div = document.createElement("div");
    div.className = "text"
    var text = document.createElement("p");
    text.innerText = str;
    div.appendChild(text);
    if (str !== undefined) document.querySelector("#Log-box > div").appendChild(div);
}

function newCommand(cmd="", resp="") {

    var command = document.createElement("div");
    command.className = "command";

    var cm = document.createElement("input");
    cm.type = "text"
    cm.className = "command-i";
    cm.value = cmd;

    var re = document.createElement("input");
    re.type = "text"
    re.className = "responce-i";
    re.value = resp;

    var save = document.createElement("button");
    save.innerHTML = "Save";
    save.className = "save";

    var del = document.createElement("button");
    del.innerHTML = "Delete";
    del.className = "delete";

    command.appendChild(cm);
    command.appendChild(re);
    command.appendChild(save);
    command.appendChild(del);

    document.getElementById("command-list").appendChild(command);
}

/*
class PopUp {

    constructor(text, x) {
        var popup = document.createElement("div");
        popup.className = "popup";
        popup.classList.toggle("active");

        var one = document.createElement("div");
        one.className = "one";

        var input = document.createElement("input");
        input.placeholder = "Enter " + text + " here...";

        one.appendChild(input);
        popup.appendChild(one);

        var two = document.createElement("div");
        two.className = "two";

        var pos = document.createElement("button");
        pos.className = "pos-button";
        pos.innerHTML = "Submit";
        pos.onclick(() => {
            popup.classList.toggle("active");
            x = input.value;
            return 0;
        });

        var neg = document.createElement("button");
        neg.className = "neg-button";
        neg.innerHTML = "Cancel";
        pos.onclick(() => {
            popup.classList.toggle("active");
            x = input.value;
            return 0;
        });

        two.appendChild(pos);
        two.appendChild(neg);
        popup.appendChild(two);

        document.body.appendChild(popup);
    }
}
*/
 
document.addEventListener('click', (e) => {

    if (e.target.matches("#change-bots") || e.target.matches("#change-bots > img")) {

        document.getElementsByClassName("refocus")[0].classList.toggle("active");
    }

    if (e.target.matches("#reload") || e.target.matches("#reload > img")) {

        ipcRenderer.send("reload");
    }

    if (e.target.matches("#new-command > img")) {

        if (current !== undefined) {

            newCommand();
        }
    }

    if (e.target.matches(".command > .save")) {
        
        //console.log(e.target.parentElement.children[0].value);
        //console.log(e.target.parentElement.children[1].value);
        current.addCommand(e.target.parentElement.children[0].value, e.target.parentElement.children[1].value);
        e.target.disabled = true;
        e.target.innerText = "✔";
        e.target.style.backgroundColor = "rgb(122, 122, 167)";
    }

    if (e.target.matches(".command > .delete")) {
        
        if (current !== undefined) {

            current.removeCommand(e.target.parentElement.children[0].value, e.target.parentElement.children[1].value);
            document.getElementById("command-list").removeChild(e.target.parentElement);
        }        
    }
    if (e.target.matches(".pos-button")) {

        if (document.getElementsByClassName("refocus")[0].children[0].children[1].children[0] == e.target) {

            if (token !== document.getElementsByClassName("one")[0].children[0].value) {

                token = document.getElementsByClassName("one")[0].children[0].value;
                document.getElementsByClassName("refocus")[0].classList.toggle("active");

                current = new Bot(token);

                commands = current.getCommands();
                current.me.getMe().then((info) => {
                    document.getElementById("Header").children[4].innerText = info.username;
                });
                //console.log(commands);

                for (let index = 0; index < commands[0].length; index++) {
                    newCommand(commands[0][index], commands[1][index]);
                }
                
            }
        }
    }
    if (e.target.matches(".neg-button")) {

        //document.getElementsByClassName("refocus")[0].classList.toggle("active");
        e.target.parentElement.parentElement.parentElement.classList.toggle("active");
    }
});
