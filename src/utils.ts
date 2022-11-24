export interface FindDiff {
  (el1: any, el2: any): boolean;
}

export function findDiff(arr1: Array<any>, arr2: Array<any>, fu: FindDiff) {
  let big = arr1;
  let small = arr2;

  if (arr2.length > arr1.length) {
    big = arr2;
    small = arr1;
  }

  return big.filter((b) => {
    return small.findIndex((s) => fu(b, s)) < 0;
  });
}
