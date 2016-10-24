//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static
export default class StringHelper {
  static capitalCase (str) {
    return str.toLowerCase().replace(/\b[a-z]/g,function(char) { return char.toUpperCase();});
  }
}
