const ID_REST_LINE = "rest-line";
const ID_DISCARD_LINE = "discard-line";
const ID_HAND_LINE = "hand-line";

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
 * 理牌(手牌を並べ替える)。
 * @param {handAreaElement} handAreaElement - 手牌のコンテナ要素
 */
function ripai(handAreaElement){
  let handDrawTileElement = handAreaElement.lastElementChild;
  
  // ツモ切りは理牌しない。
  if (handDrawTileElement.childElementCount === 0){ return; }
  
  let elementsArray = Array.from(handAreaElement.getElementsByTagName("img"));
  elementsArray.sort((a, b) => a.id - b.id);
  
  // 手牌の並べ替えのためツモ牌は含めない。
  for (let i = 0; i < handAreaElement.children.length - 1; i++){
    if (handAreaElement.children.item(i).childElementCount === 0){
      handAreaElement.children.item(i).appendChild(elementsArray[i]);
    }else if(handAreaElement.children.item(i).id !== elementsArray[i].id){
      handAreaElement.children.item(i).replaceChild(
        elementsArray[i], 
        handAreaElement.children.item(i).firstElementChild
      );
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
      let handAreaLastElement = document.querySelector(".draw-tile");
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

const handArea = document.getElementById(ID_HAND_LINE);
handArea.addEventListener("click", (event) => {
  if (event.target.tagName === "IMG") {
    if (!hasRestTiles()) { return; }
    
    moveDiscardArea(event.target);
    ripai(handArea);
    drawTile();
  }
});