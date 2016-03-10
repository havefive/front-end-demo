/**
 * Created by lizhaocai on 16/3/10.
 */


function person(firstname, lastname, age, eyecolor) {
    this.firstname = firstname
    this.lastname = lastname
    this.age = age
    this.eyecolor = eyecolor
}

myFather = new person("John", "Adams", 35, "black")

document.write(myFather.firstname + " 的年龄是 " + myFather.age + " 岁。")
