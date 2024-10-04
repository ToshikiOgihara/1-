console.log("testA");
/*
document.getElementById('hogeButton').addEventListener('click', e => {
  OnSubmitClick();
});
*/

/*
document.getElementsByClassName('hand-tile').addEventListener('click', e => {
    //OnSubmitClick();
    alert("hello")
})
*/



document.querySelectorAll(".hand-tile").forEach(function(elem){
    elem.addEventListener('click', () => {
       //何かしらの処理
       alert("id番号:" + elem.id);
    })
})