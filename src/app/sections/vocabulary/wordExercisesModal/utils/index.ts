import { myCurrentLang } from "#src/app/sections/vocabulary/addWordModal";

export type AnswersWordType = { key: number; name: string; isCorrect: boolean; };

export const getWrongAnswers = (inputList, excludeId, currentIndex, type) => {
  let tempList = inputList.filter((item) => item.id !== excludeId);

  const newList: Array<AnswersWordType> = [];

  for (let i = 0; i < 3; i++) {
    const item = tempList[i];
    const key = (currentIndex * 4) + i + 1;

    newList.push({
      key: key === 0 ? 1 : key,
      name: type === "TRANSLATE" ? item.translate[myCurrentLang] : item.value,
      isCorrect: false
    });
  }

  // Return the first 3 elements of the shuffled tempList
  return newList;
}