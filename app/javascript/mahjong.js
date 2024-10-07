/**
 * 捨て牌エリアに移動。
 * @param {HTMLImgElement} e - 麻雀牌の画像要素。
 */
function MoveDiscardArea(e){
    let addElement = document.createElement('li');
    let imgElement = document.createElement('img');
    
    imgElement.id = e.id;
    imgElement.src = e.getAttribute("data-img");
    
    document.getElementById("discard-line").appendChild(addElement);
    addElement.appendChild(imgElement);
    e.remove();
}

/**
 * 牌山エリアから牌を持ってくる。
 */
function DrawTile(){
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
}

const handArea = document.getElementById("hand-area")
handArea.addEventListener("click", (event) => {
  if (event.target.tagName === "IMG") {
    MoveDiscardArea(event.target);
    DrawTile();
  }
});