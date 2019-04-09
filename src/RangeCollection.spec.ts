import { RangeCollection } from './RangeCollection';

describe("Tests for range collection", () => {
  let rangeCollection: RangeCollection;

  beforeEach(() => {
    rangeCollection = new RangeCollection([]);
  });

  it("Adding and removing valid ranges", () => {
    console.log('***************** Adding/Removing ranges to/from [] *****************');

    rangeCollection.add([1,5]);
    console.log('Instruction: add[1,5]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,5)');

    rangeCollection.add([10,20]);
    console.log('Instruction: add[10,20]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,5) [10,20)');

    rangeCollection.add([20,20]);
    console.log('Instruction: add[20,20]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,5) [10,20)');

    rangeCollection.add([20,21]);
    console.log('Instruction: add[20,21]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,5) [10,21)');

    rangeCollection.add([2,4]);
    console.log('Instruction: add[2,4]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,5) [10,21)');

    rangeCollection.add([3,8]);
    console.log('Instruction: add[3,8]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,8) [10,21)');

    rangeCollection.remove([10,10]);
    console.log('Instruction: remove[10,10]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,8) [10,21)');

    rangeCollection.remove([10,11]);
    console.log('Instruction: remove[10,11]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,8) [11,21)');

    rangeCollection.remove([15,17]);
    console.log('Instruction: remove[15,17]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,8) [11,15) [17,21)');

    rangeCollection.remove([3,19]);
    console.log('Instruction: remove[3,19]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,3) [19,21)');

    rangeCollection.add([4,20]);
    console.log('Instruction: add[4,20]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,3) [4,21)');

    rangeCollection.remove([2,7]);
    console.log('Instruction: remove[2,7]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,2) [7,21)');

    rangeCollection.remove([7,11]);
    console.log('Instruction: remove[7,11]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,2) [11,21)');

    rangeCollection.remove([8,17]);
    console.log('Instruction: remove[8,17]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,2) [17,21)');

    rangeCollection.add([6,9]);
    console.log('Instruction: add[6,9]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,2) [6,9) [17,21)');

    rangeCollection.add([10,17]);
    console.log('Instruction: add[10,17]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,2) [6,9) [10,21)');

    rangeCollection.remove([8,23]);
    console.log('Instruction: remove[8,23]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,2) [6,8)');

    rangeCollection.add([4,9]);
    console.log('Instruction: add[4,9]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,2) [4,9)');

    rangeCollection.add([-2,3]);
    console.log('Instruction: add[-2,3]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[-2,3) [4,9)');

    rangeCollection.remove([-2,-1]);
    console.log('Instruction: remove[-2,-1]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[-1,3) [4,9)');

  });

  it("No-op when adding ranges", () => {
    console.log('***************** No-op when adding ranges to [] *****************');
    rangeCollection.add([10,10]);
    console.log('Instruction: add([10,10]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('');

    rangeCollection.add([11,10]);
    console.log('Instruction: add([11,10]');
    rangeCollection.print();

    expect(rangeCollection.convertToString()).toBe('');
  });

  it("No-op when removing ranges", () => {
    console.log('***************** No-op when removing ranges from [] *****************');
    rangeCollection.remove([5,10]);
    console.log('Instruction: remove([5,10]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('');

    rangeCollection.add([1, 4]);
    console.log('Instruction: add([1, 4]');
    rangeCollection.print();

    rangeCollection.remove([5,10]);
    console.log('Instruction: remove([5,10]');
    rangeCollection.print();
    expect(rangeCollection.convertToString()).toBe('[1,4)');
  });
});
