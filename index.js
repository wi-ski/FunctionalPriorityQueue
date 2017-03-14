const getLeftChild = parentIndex => parentIndex * 2 + 1;
const getRightChild = parentIndex => parentIndex * 2 + 2;
const getParentIndex = childIndex => Math.floor((childIndex - 1) / 2);
const listSlice = heapMethod => (list, ...args) => heapMethod(list.slice(), ...args);
const defaultShouldSwap = (parent, child) => parent > child;
const defaultFilter = val => (val !== null || val !== undefined)

module.exports = function BHeap(shouldswap, inputfilter) {
  const shouldSwap = shouldswap || defaultShouldSwap; // minHeap
  const inputFilter = inputfilter || defaultFilter;

  const heapPush = listSlice((list, data) => {
    if (data === undefined || !inputFilter(data)) return list;
    list.push(data);
    return bubbleUp(list, list.length - 1, data);
  });

  const bubbleUp = listSlice((list, childIndex, childData) => {
    if (childIndex > 0) {
      const parentIndex = getParentIndex(childIndex);
      const parentData = list[parentIndex];

      if (shouldSwap(childData, parentData)) {
        list[parentIndex] = childData;
        list[childIndex] = parentData;
        return bubbleUp(list, parentIndex, childData);
      }
    }
    return list;
  });

  const bubbleDown = listSlice((list, parentIndex, parentData) => {
    if (parentIndex < list.length) {
      let targetIndex = parentIndex;
      let targetData = parentData;

      const leftChildIndex = getLeftChild(parentIndex);
      const rightChildIndex = getRightChild(parentIndex);

      function trySwap(index, array, shouldSwap) {
        if (index < array.length) {
          const data = array[index];
          if (shouldSwap(data, targetData)) {
            targetIndex = index;
            targetData = data;
          }
        }
      }

      trySwap(leftChildIndex, list, shouldSwap);
      trySwap(rightChildIndex, list, shouldSwap);

      if (targetIndex !== parentIndex) {
        list[parentIndex] = targetData;
        list[targetIndex] = parentData;
        return bubbleDown(list, targetIndex, parentData);
      }
    }
    return list;
  });

  const heapPop = listSlice((list) => {
    const headNode = list[0];
    const tailNode = list.pop();

    if (list.length) {
      list[0] = tailNode;
      list = bubbleDown(list, 0, tailNode);
    }

    return [list, headNode];
  });

  return {
    heapPush,
    heapPop,
  };
};
