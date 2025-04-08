export function uniqueArray(array: Array<any>) {
  return array.filter((elem, index, self) => self.indexOf(elem) === index);
}
