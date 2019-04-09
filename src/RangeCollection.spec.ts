import { RangeCollection } from './RangeCollection';

describe("Tests for range collection", () => {
  let rangeCollection: RangeCollection;

  beforeEach(() => {
    rangeCollection = new RangeCollection([]);
  });

  it("Adding and removing valid ranges", () => {
    rangeCollection.add([1,5]);
    console.log('add[1,5]')
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,5)');

    rangeCollection.add([10,20]);
    console.log('add[10,20]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,5) [10,20)');

    rangeCollection.add([20,20]);
    console.log('add[20,20]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,5) [10,20)');

    rangeCollection.add([20,21]);
    console.log('add[20,21]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,5) [10,21)');

    rangeCollection.add([2,4]);
    console.log('add[2,4]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,5) [10,21)');

    rangeCollection.add([3,8]);
    console.log('add[3,8]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,8) [10,21)');

    rangeCollection.remove([10,10]);
    console.log('remove[10,10]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,8) [10,21)');

    rangeCollection.remove([10,11]);
    console.log('remove[10,11]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,8) [11,21)');

    rangeCollection.remove([15,17]);
    console.log('remove[15,17]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,8) [11,15) [17,21)');

    rangeCollection.remove([3,19]);
    console.log('remove[3,19]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,3) [19,21)');

    rangeCollection.add([4,20]);
    console.log('add[4,20]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,3) [4,21)');

    rangeCollection.remove([2,7]);
    console.log('remove[2,7]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,2) [7,21)');

    rangeCollection.remove([7,11]);
    console.log('remove[7,11]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,2) [11,21)');

    rangeCollection.remove([8,17]);
    console.log('remove[8,17]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,2) [17,21)');

    rangeCollection.add([6,9]);
    console.log('add[6,9]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,2) [6,9) [17,21)');

    rangeCollection.add([10,17]);
    console.log('add[10,17]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,2) [6,9) [10,21)');

    rangeCollection.remove([8,23]);
    console.log('remove[8,23]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,2) [6,8)');
  });

  it("No-op when adding ranges", () => {
    rangeCollection.add([10,10]);
    expect(rangeCollection.convertToString()).toBe('');
    rangeCollection.add([11,10]);
    expect(rangeCollection.convertToString()).toBe('');
  });

  it("No-op when removing ranges", () => {
    rangeCollection.remove([5,10]);
    expect(rangeCollection.convertToString()).toBe('');

    rangeCollection.add([1, 4]);
    rangeCollection.remove([5,10]);
    expect(rangeCollection.convertToString()).toBe('[1,4)');
  });
});
