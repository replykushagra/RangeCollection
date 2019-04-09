import { RangeOfNumbers } from '../model/range';

export class RangeCollection {

  /*
  * example ranges = [[1,2], [7,11], [12, 15]]
  */
  ranges: RangeOfNumbers[];

  constructor(ranges: RangeOfNumbers[]) {
    this.ranges = ranges;
  }

  /**
   * Adds a range to the collection
   * @param {RangeOfNumbers} range - Array of two integers that specify beginning and end of range.
   */
  add(range: RangeOfNumbers) {
    if (!range || range.length < 2 || range[0] === range[1] || range[0] > range[1]) {
      return;
    }

    const rangeStart = range[0];
    const rangeEnd = range[1];

    if (this.ranges.length === 0) {
      this.ranges.push(range);
      return;
    }

    const firstRange = this.ranges[0];
    const lastRange = this.ranges[this.ranges.length - 1];

    // Comparing the new range with first and last range
    if (firstRange[0] > rangeEnd) {
      this.ranges.unshift(range);
      return;
    }

    if (lastRange[1] < rangeStart) {
      this.ranges.push(range);
      return;
    }

    let i = 0;
    while(i < this.ranges.length) {
      const currentRangeStart = this.ranges[i][0];
      const currentRangeEnd = this.ranges[i][1];

      // New range is in between an existing range
      if (currentRangeStart <= rangeStart && currentRangeEnd >= rangeEnd) {
        return;
      }

      // No op until the range reaches its insertion point
      if (currentRangeEnd < rangeStart) {
        i++;
        continue;
      }


      /* 2 cases where the new range is completely outside of the current range: 
       * a) The new range is smaller than the current range and lies completely outside of it 
       * b) The new range is bigger than the current range and engulfs it completely
       */      
      if (rangeStart < currentRangeStart && rangeEnd < currentRangeStart) {
        this.ranges.splice(i, 0, [rangeStart, rangeEnd]);
        return;
      }

      if (rangeStart < currentRangeStart && rangeEnd > currentRangeEnd) {
        this.ranges.splice(i, 1, [rangeStart, rangeEnd]);
        this.growRangeFromIndex(i, rangeEnd);
        return;
      }

      /* Handling 2 cases here: 
       * a) Current range contains end of the range OR 
       * b) Current range contains start of the range
       * but not both
       */
      if (this.isNumberInRange(rangeEnd, this.ranges[i])) {
        this.ranges.splice(i, 1, [rangeStart, currentRangeEnd]);
        this.growRangeFromIndex(i, rangeEnd);
        return;
      }

      if (this.isNumberInRange(rangeStart, this.ranges[i])) {
        this.ranges.splice(i, 1, [currentRangeStart, rangeEnd]);
        this.growRangeFromIndex(i, rangeEnd);
        return;
      }
      i++;
    }
  }

   /**
   * Assumption here is that a valid range would be the one which complete lie in the given set of ranges 
   * Removes a range from the collection
   * @param {RangeOfNumbers} range - Array of two integers that specify beginning and end of range.
   */
  remove(range: RangeOfNumbers) {
    if (this.ranges.length === 0) {
      return;
    }

    if (!range || range.length < 2 || range[0] === range[1] || range[0] > range[1]) {
      return;
    }

    const rangeStart = range[0];
    const rangeEnd = range[1];

    const firstRange = this.ranges[0];
    const lastRange = this.ranges[this.ranges.length - 1];

    // Validating if the input range lie in the given range set
    if (firstRange[0] > rangeStart || lastRange[1] < rangeStart) {
      return;
    }

    let i = 0;
    while(i < this.ranges.length) {
      const currentRangeStart = this.ranges[i][0];
      const currentRangeEnd = this.ranges[i][1];

      if (currentRangeStart === rangeStart && currentRangeEnd === rangeEnd) {
        this.ranges.splice(i, 1);
        return;
      }

      // No op until the range reaches its deletion point
      if (currentRangeEnd < rangeStart) {
        i++;
        continue;
      }

      // Range falls completely within an existing range
      if (rangeStart > currentRangeStart && rangeEnd < currentRangeEnd) {
        this.ranges.splice(i, 1, [currentRangeStart, rangeStart], [rangeEnd, currentRangeEnd]);
        return;
      }

      // If the range start is equal to the start of the current range
      if (rangeStart === currentRangeStart) {
        if (rangeEnd > currentRangeEnd) {
          this.ranges.splice(i, 1);
          this.trimRangeFromIndex(i, rangeEnd);
        } else {
          this.ranges.splice(i, 1, [rangeEnd, currentRangeEnd]);
        }
        return;
      }

      // If the range start is greater than the start of the current range      
      if (rangeStart > currentRangeStart) {
        if (rangeEnd > currentRangeEnd) {
          this.ranges.splice(i, 1, [currentRangeStart, rangeStart]);
          this.trimRangeFromIndex(i+1, rangeEnd);
        } else {
          this.ranges.splice(i, 1, [rangeEnd, currentRangeEnd]);
        }
        return;
      }

      // If the range start is smaller than the start of the current range            
      if (rangeStart < currentRangeStart) {
        if (rangeEnd < currentRangeEnd) {
          this.ranges.splice(i, 1, [rangeEnd, currentRangeEnd]);
        } else {
          this.ranges.splice(i, 1);
          this.trimRangeFromIndex(i, rangeEnd);
        }
      }
      i++;
    }
  }

  /**
   * Prints out the list of ranges in the range collection
   */
  print() {
    console.log('Range Collection: ', this.convertToString());
  }

  convertToString(): String {
    return this.ranges.map(range => `[${range[0]},${range[1]})`).join(' ');
  }

  private isNumberInRange(number: number, range: RangeOfNumbers) : boolean {
    return number >= range[0] && number <= range[1];
  }

  private growRangeFromIndex(index: number, rangeEnd: number) {
    for (let j = index+1; j < this.ranges.length ; j++) {
      const innerRangeStart = this.ranges[j][0];
      const innerRangeEnd = this.ranges[j][1];
      if (rangeEnd >= innerRangeEnd) {
        this.ranges.splice(j, 1);
      } else if (rangeEnd >= innerRangeStart) {
        this.ranges.splice(j, 1, [rangeEnd+1, innerRangeEnd]);
        break;
      }
    }
  }

  private trimRangeFromIndex(index: number, rangeEnd: number) {
    for (let j = index; j < this.ranges.length; j++) {
      const innerRangeEnd = this.ranges[j][1];
      if (rangeEnd > innerRangeEnd) {
        this.ranges.splice(j, 1);
        j--;
      } else {
        this.ranges.splice(j, 1, [rangeEnd, innerRangeEnd]);
        break;
      }
    }
  }
}
