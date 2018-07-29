/*
function copied from https://github.com/bevacqua/fuzzysearch
because of problems with type definition creation
*/

function fuzzysearch(needle: string, haystack: string): boolean {
  const hlen = haystack.length;
  const nlen = needle.length;
  if (nlen > hlen) {
    return false;
  }
  if (nlen === hlen) {
    return needle === haystack;
  }
  outer: for (let i = 0, j = 0; i < nlen; i += 1) {
    const nch = needle.charCodeAt(i);
    while (j < hlen) {
      if (haystack.charCodeAt(j) === nch) {
        j += 1;
        continue outer;
      }
      j += 1;
    }
    return false;
  }
  return true;
}

export default fuzzysearch;
