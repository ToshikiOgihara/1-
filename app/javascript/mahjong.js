const ID_REST_LINE = "rest-line"
const ID_DISCARD_LINE = "discard-line"
const ID_HAND_LINE = "hand-line"

/**
 * 牌山があるか。
 */
function hasRestTiles() {
  let restTiles = document.getElementById(ID_REST_LINE);
  return restTiles.lastElementChild.childElementCount > 0;
}

/**
 * 捨て牌エリアに移動。
 * @param {HTMLImgElement} e - 麻雀牌の画像要素。
 */
function moveDiscardArea(e){
  let addElement = document.createElement('li');
  let imgElement = document.createElement('img');
  
  imgElement.id = e.id;
  imgElement.src = e.getAttribute("data-img");
  
  document.getElementById(ID_DISCARD_LINE).appendChild(addElement);
  addElement.appendChild(imgElement);
  e.remove();
}

/**
 * 理牌。
 * @param {handAreaElement} handAreaElement - 手牌のコンテナ要素
 */
function ripai(handAreaElement){
  let handDrawTileElement = handAreaElement.lastElementChild;
  
  // ツモ切りは理牌しない。
  if (handDrawTileElement.childElementCount === 0){
    return;
  }
  
  // ツモ牌
  for (let tile of handAreaElement.children){
    if (tile.childElementCount === 0){
      tile.insertAdjacentHTML('afterbegin', handDrawTileElement.innerHTML);
      handDrawTileElement.firstElementChild.remove();
      break;
    }
  }
}

/**
 * 牌山エリアから牌を持ってくる。
 */
function drawTile(){
  let restTiles = document.getElementById(ID_REST_LINE);
  
  for (let i = 0; i < restTiles.childElementCount; i++){
    if (restTiles.children.item(i).childElementCount === 1){
      
      let drawElement = restTiles.children.item(i);
      let handAreaLastElement = document.querySelector(".draw-tile")
      let handImgElement = document.createElement('img');
      
      handImgElement.id = drawElement.firstElementChild.id;
      handImgElement.src = drawElement.firstElementChild.getAttribute("data-imgdraw");
      handImgElement.setAttribute("data-img", drawElement.firstElementChild.getAttribute("data-imgdiscard"));
      
      handAreaLastElement.appendChild(handImgElement);
      drawElement.firstElementChild.remove();
      
      break;
    }
  }
}

const handArea = document.getElementById(ID_HAND_LINE)
handArea.addEventListener("click", (event) => {
  if (event.target.tagName === "IMG") {
    if (!hasRestTiles()) {
      return;
    }
    
    moveDiscardArea(event.target);
    ripai(handArea);
    drawTile();
  }
});