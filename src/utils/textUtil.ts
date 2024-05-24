export function CheckPasswordText(password: string) {
  const check =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,16}$/;
  return check.test(password);
}
// 한글 자음,모음
export function CheckKoreaTextCheck(text: string) {
  const consonant = /^[ㄱ-ㅎ]*$/;
  const vowel = /^[ㅏ-ㅣ]*$/;
  const koreanText = /^[가-힣]*$/;

  const textOnlyConsonant = consonant.test(text);
  const textOnlyVowel = vowel.test(text);
  const textOnlyKorean = koreanText.test(text);

  if (textOnlyKorean) {
    return true;
  } else if (textOnlyVowel) {
    return false;
  } else if (textOnlyConsonant) {
    return false;
  } else {
    return false;
  }
}
// 특수문자 체크
export function CheckSpecialText(text: string) {
  const check = /^[!@#$%^&*]*$/;

  return check.test(text);
}
