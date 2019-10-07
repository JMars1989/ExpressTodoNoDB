var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//app.set("view engine", "pug");

app.use(express.static("public"));

//placeholders for added task
var taskUser1 = ["Mow the grass", "Go for a run"];
var taskUser2 = ["Go to class", "Bike ride"];
//placeholders for removed task
var completeUser1 = ["Finish refactor"];
var completeUser2 = ["Schedule meeting"];

//render the ejs and display added task, completed task
app.get("/", function(req, res) {
    res.render("index", { taskUser1: taskUser1, completeUser1: completeUser1, taskUser2: taskUser2, completeUser2: completeUser2  });
});

//post route for adding new task to User1
app.post("/addtaskUser1", function(req, res) {
    var newTask = req.body.newtaskUser1;
    //add the new task from the post route
    taskUser1.push(newTask);
    res.redirect("/");
});

//post route for adding new task to User1
app.post("/addtaskUser2", function(req, res) {
    var newTask = req.body.newtaskUser2;
    //add the new task from the post route
    taskUser2.push(newTask);
    res.redirect("/");
});

app.post("/removetaskUser1", function(req, res) {
    var completeTask = req.body.checkUser1;
    //check for the "typeof" the different completed task, then add into the complete task
    if (typeof completeTask === "string") {
        completeUser1.push(completeTask);
        //check if the completed task already exits in the task when checked, then remove it
        taskUser1.splice(taskUser1.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            completeUser1.push(completeTask[i]);
            taskUser1.splice(taskUser1.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});

app.post("/removetaskUser2", function(req, res) {
    var completeTask = req.body.checkUser2;
    //check for the "typeof" the different completed task, then add into the complete task
    if (typeof completeTask === "string") {
        completeUser2.push(completeTask);
        //check if the completed task already exits in the task when checked, then remove it
        taskUser2.splice(taskUser2.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            completeUser2.push(completeTask[i]);
            taskUser2.splice(taskUser2.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});


//set app to listen on port 3000
app.listen(3000, function() {
    console.log("server is running on port 3000");
});