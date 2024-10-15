import { mbtiMapping } from './mbtiMapping';

export const mbtiReverseMapping = Object.keys(mbtiMapping).reduce((acc, key) => {
  acc[mbtiMapping[key]] = key;
  return acc;
}, {});