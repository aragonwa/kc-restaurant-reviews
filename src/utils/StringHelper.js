//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static
export default class StringHelper {
  static capitalCase (str) {
    return str.toLowerCase().replace(/\b[a-z]/g,function(char) { return char.toUpperCase();});
  }
  static phoneNumFormat (str) {
    if(str) {
      return '('+str.slice(0,3) + ') ' + str.slice(3,6) + '-' + str.slice(6,10);
    }
    return '';
  }
}

