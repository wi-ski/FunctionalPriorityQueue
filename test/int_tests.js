import test from 'ava';
import heapFactory from './../index.js';

let listOfNumbersIncreasing,
  listOfNumbersDecreasing,
  theHeap,
  minHeapFxns,
  maxHeapFxns,
  minHeapPop,
  minHeapPush,
  maxHeapPop,
  maxHeapPush,
  value,
  shuffledList;

test.beforeEach(() => {
  listOfNumbersIncreasing = [
    0, 1, 2, 3, 4, 5, 6, 7,
  ];

  listOfNumbersDecreasing = listOfNumbersIncreasing.slice().reverse();
  shuffledList = shuffle(listOfNumbersIncreasing);
  theHeap = [];
  minHeapFxns = heapFactory((child, parent) => (parent > child));
  maxHeapFxns = heapFactory((child, parent) => (parent < child));

  minHeapPop = minHeapFxns.heapPop;
  minHeapPush = minHeapFxns.heapPush;

  maxHeapPop = maxHeapFxns.heapPop;
  maxHeapPush = maxHeapFxns.heapPush;
});

test('heap should fill', (t) => {
  listOfNumbersIncreasing.forEach((val, idx) => {
    t.is(theHeap.length, idx);
    theHeap = minHeapPush(theHeap, val);
  });
  t.is(theHeap.length, listOfNumbersIncreasing.length);
});

test('heap should empty', (t) => {
  [theHeap, value] = minHeapPop([0, 1]);
  t.is(value, 0);
  t.is(theHeap.length, 1);
});

test('min heap should handle one member', (t) => {
  theHeap = minHeapPush([], listOfNumbersIncreasing[0]);

  t.deepEqual(theHeap, [listOfNumbersIncreasing[0]]);
});

test('min heap should handle simple min', (t) => {
  listOfNumbersIncreasing.forEach((member) => {
    theHeap = minHeapPush(theHeap, member);
  });
  const [heap, popped] = minHeapPop(theHeap);
  t.is(heap.length, theHeap.length - 1);
  t.is(popped, 0);
});

test('min heap should handle less simple min', (t) => {
  listOfNumbersDecreasing.forEach((member) => {
    theHeap = minHeapPush(theHeap, member);
  });
  const [heap, popped] = minHeapPop(theHeap);
  t.is(popped, 0);
});

test('min heap should handle random min', (t) => {
  shuffledList.forEach((member) => {
    theHeap = minHeapPush(theHeap, member);
  });
  const [heap, popped] = minHeapPop(theHeap);
  t.is(popped, 0);
});

test('max heap should handle one member', (t) => {
  theHeap = maxHeapPush(theHeap, listOfNumbersIncreasing[0]);
  t.deepEqual(theHeap, [listOfNumbersIncreasing[0]]);
});

test('max heap should handle simple max', (t) => {
  listOfNumbersDecreasing.forEach((member) => {
    theHeap = maxHeapPush(theHeap, member);
  });
  const [heap, popped] = minHeapPop(theHeap);
  t.is(heap.length, theHeap.length - 1);
  t.is(popped, listOfNumbersDecreasing[0]);
});

test('max heap should handle less simple max', (t) => {
  listOfNumbersIncreasing.forEach((member) => {
    theHeap = maxHeapPush(theHeap, member);
  });
  const [heap, popped] = maxHeapPop(theHeap);
  t.is(popped, listOfNumbersIncreasing[listOfNumbersIncreasing.length - 1]);
});

test('max heap should handle random max', (t) => {
  shuffledList.forEach((member) => {
    theHeap = maxHeapPush(theHeap, member);
  });

  const [heap, popped] = maxHeapPop(theHeap);

  const a = heap.sort((a, b) => a > b);
  const b = theHeap.sort((a, b) => a > b).slice(0, theHeap.length - 1);

  t.deepEqual(popped, listOfNumbersIncreasing[listOfNumbersIncreasing.length - 1]);
  t.deepEqual(a, b);
});


function shuffle(_array) {
  const array = _array.slice();
  let currentIndex;
  let temporaryValue;
  let randomIndex;

  currentIndex = array.length;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex); // Fisher-Yates-y
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
