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
      
      // 捨て牌エリアに移動。
      let addElement = document.createElement('li');
      let imgElement = document.createElement('img');
      
      imgElement.id = elem.id;
      imgElement.src = elem.getAttribute("data-img");
      
      document.getElementById("discard-line").appendChild(addElement);
      addElement.appendChild(imgElement);
      elem.remove();
      
      // 牌山エリアから牌を取ってくる。
      let restTiles = document.getElementsByClassName("tile-line").item(0);
      for (let i = 0; i < restTiles.childElementCount; i++){
        if (restTiles.children.item(i).childElementCount === 1){
          
          let drawElement = restTiles.children.item(i);
          let handAreaElement = document.getElementById("hand-area");
          let handImgElement = document.createElement('img');
          
          handImgElement.id = drawElement.firstElementChild.id;
          handImgElement.src = drawElement.firstElementChild.getAttribute("data-imgdraw");
          handImgElement.className = "mahjong-tile hand-tile";
          handImgElement.setAttribute("data-img", drawElement.firstElementChild.getAttribute("data-imgdiscard"));
          
          handAreaElement.appendChild(handImgElement);
          drawElement.firstElementChild.remove();
          
          break;
        }
      }
      
      
    })
})