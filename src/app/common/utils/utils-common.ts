/**
 * @description Verify IF an Object is NOT NULL & NOT UNDEFINED - IF it's NOT NULL & NOT UNDEFINED then TRUE, ELSE then FALSE.
 * @param obj 
 * @returns boolean
 * @author WALID ZHANI
 */
function isObjectNotNullNotUndefined(obj: any): boolean {
    let isNotNullNotUndefined: boolean = false;

    if (obj !== null && obj !== undefined)
        isNotNullNotUndefined = true;

    return isNotNullNotUndefined;
}

/**
 * @description Format the "Move Name" to start with Uppercase always and IF it contains the '-' replace it with a blankspace ' ',
 *  for eg.: 'bind' => 'Bind' | 'mega-drain' => 'Mega Drain'.
 * @param strIn 
 * @returns boolean
 * @author WALID ZHANI
 */
function formatMoveNameToStartUppercaseClean(strIn: string): string {
  // Helpers:
  //  https://www.freecodecamp.org/news/javascript-capitalize-first-letter-of-word/
  //  https://flexiple.com/javascript/javascript-capitalize-first-letter/

  let strOut: string = '';
  let firstLetterUppercase: string = '';
  let remainingLetters: string = '';

  if (!strIn.includes('-')) {
    firstLetterUppercase = strIn.charAt(0).toUpperCase();
    remainingLetters = strIn.slice(1);

    strOut = firstLetterUppercase + remainingLetters;
  } else {
    // Replace the '-' with ' ' in the "strIn", then Split it into an array 'strInCleanSplited' of strings Whenever a blank space is encountered
    const strInCleanSplitedArr: string[] = strIn.replace('-', ' ').split(' ');

    for (let i = 0; i < strInCleanSplitedArr.length; i++) {
      firstLetterUppercase = strInCleanSplitedArr[i].charAt(0).toLocaleUpperCase();
      remainingLetters = strInCleanSplitedArr[i].slice(1);

      strInCleanSplitedArr[i] = firstLetterUppercase + remainingLetters;
    }

    // Join all the elements of the array 'strInCleanSplited' back into a string using a blankspace ' ' as a separator
    strOut = strInCleanSplitedArr.join(' ');
  }

  return strOut;
}

export { isObjectNotNullNotUndefined, formatMoveNameToStartUppercaseClean };