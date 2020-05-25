export default function JsonToURLEncoded(element, key, list) {
    let list2 = list || [];
    if (typeof element == 'object') {
       for (let idx in element) JsonToURLEncoded(element[idx], key ? key + '[' + idx + ']' : idx, list2);
    } else {
       list2.push(key + '=' + encodeURIComponent(element));
    }
    return list2.join('&'); 
}
 