/* jshint esversion: 11 */
var bind = "";
var isNeedMoreChoice = false;

export function getBind() {
  return bind;
} 

export function setBind(value) {
  bind = value;
}

export function clearBind() {
    bind = "";
}
  
export function getIsNeedMoreChoice() {
    return isNeedMoreChoice;
} 
  
export function setIsNeedMoreChoice(value) {
    isNeedMoreChoice = value;
}
