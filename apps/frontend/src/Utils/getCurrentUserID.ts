export function getCurrentUserID() {
    let uidHeader = "uid=";
    let cookie = decodeURIComponent(document.cookie);
    let cookieItems = cookie.split(';');
    
    for(let i = 0; i < cookieItems.length; i++){
        let currItem = cookieItems[i];
        while(currItem.charAt(0) == ' '){
            currItem = currItem.substring(1);
        }
        if(currItem.indexOf(uidHeader) == 0){
            return currItem.substring(uidHeader.length, currItem.length);
        }
    }
    return "";
}