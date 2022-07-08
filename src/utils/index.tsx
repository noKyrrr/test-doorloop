import { ActiveWord } from "../types/game-types";

export function splitArrayInChunk(array: any[], chunkSize: number) : any[][] {
    const result = [];
    const length = array.length;
 
    let index = 0;
    while(index < length){
        result.push(array.slice(index, chunkSize + index));
        index+=chunkSize;
    }
    return result;
}

export function splitIntoActiveWordArray(activeWord: string): ActiveWord[] {
    return activeWord.split("").map((element: string, index: number) => {
      return {
        color: "white",
        word: element,
      };
    });
  }
  