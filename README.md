# hangul-moment

한국어 친화적인 날짜/시간 라이브러리  
moment.js, day.js의 한국어 특화 버전

[![npm version](https://badge.fury.io/js/hangul-moment.svg)](https://www.npmjs.com/package/hangul-moment)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 개발 배경

기존 moment.js, day.js는 훌륭한 라이브러리지만 한국어 사용자에게는 아쉬운 점들이 있었습니다:

- "몇 초 전" → "방금 전"
- "1일 전" → "어제" 
- "2일 전" → "그저께"
- "2일 후" → "모레"
- 조사 처리 불가 ("사과을" 같은 어색한 표현)
- 한국식 나이 계산 불가

hangul-moment는 이런 문제들을 해결합니다!

## 설치

```bash
npm install hangul-moment
```

```bash
yarn add hangul-moment
```

## 빠른 시작

```javascript
const hangulMoment = require('hangul-moment');

// 자연스러운 한국어 상대시간
const hm = hangulMoment();
console.log(hm.fromNow()); // "방금 전"

const yesterday = hangulMoment().add(-1, 'day');
console.log(yesterday.fromNow()); // "어제"

const dayAfterTomorrow = hangulMoment().add(2, 'day');
console.log(dayAfterTomorrow.fromNow()); // "모레"
```

## 주요 기능

### 자연스러운 상대시간

```javascript
hangulMoment().fromNow();                    // "방금 전"
hangulMoment().add(-1, 'day').fromNow();     // "어제" 
hangulMoment().add(-2, 'day').fromNow();     // "그저께"
hangulMoment().add(-3, 'day').fromNow();     // "그끄저께"
hangulMoment().add(1, 'day').fromNow();      // "내일"
hangulMoment().add(2, 'day').fromNow();      // "모레"
hangulMoment().add(3, 'day').fromNow();      // "글피"
```

### 한국식 날짜 포맷팅

```javascript
const hm = hangulMoment('2025-08-26');

hm.format();                        // "2025년 08월 26일"
hm.format('YYYY년 M월 D일');         // "2025년 8월 26일"
hm.format('YYYY년 M월 D일 (dd)');    // "2025년 8월 26일 (화)"
hm.format('YYYY년 M월 D일 (dddd)');  // "2025년 8월 26일 (화요일)"
```

### 조사 자동 처리

```javascript
hangulMoment.addParticle("사과", "을");    // "사과를"
hangulMoment.addParticle("바나나", "을");  // "바나나를"
hangulMoment.addParticle("책", "이");      // "책이"
hangulMoment.addParticle("연필", "이");    // "연필이"
hangulMoment.addParticle("집", "은");      // "집은"
hangulMoment.addParticle("학교", "는");    // "학교는"
```

### 숫자 한글 변환

```javascript
hangulMoment.numberToKorean(0);      // "영"
hangulMoment.numberToKorean(1234);   // "천이백삼십사"  
hangulMoment.numberToKorean(50000);  // "오만"
```

### 나이 계산

```javascript
const hm = hangulMoment();

// 만 나이
hm.getAge('1990-05-15');        // 35 (2025년 기준)

// 세는 나이 (한국 나이)
hm.getKoreanAge('1990-05-15');  // 36 (2025년 기준)
```

### 계절 및 공휴일

```javascript
const hm = hangulMoment('2025-08-26');

hm.getSeason();     // "여름"
hm.isHoliday();     // false

const newYear = hangulMoment('2025-01-01');
newYear.isHoliday(); // true
```

## API 레퍼런스

### 메서드

| 메서드 | 설명 | 예시 |
|--------|------|------|
| `fromNow()` | 현재 시간으로부터의 상대시간 | `"어제"`, `"모레"`, `"방금 전"` |
| `format(pattern)` | 날짜 포맷팅 | `"2025년 8월 26일"` |
| `add(amount, unit)` | 날짜 더하기 | `hm.add(1, 'day')` |
| `getSeason()` | 계절 반환 | `"봄"`, `"여름"`, `"가을"`, `"겨울"` |
| `getAge(birthDate)` | 만 나이 계산 | `35` |
| `getKoreanAge(birthDate)` | 세는 나이 계산 | `36` |
| `isHoliday()` | 공휴일 여부 | `true`, `false` |

### 정적 메서드

| 메서드 | 설명 | 예시 |
|--------|------|------|
| `addParticle(word, particle)` | 조사 자동 선택 | `"사과를"`, `"책이"` |
| `numberToKorean(number)` | 숫자 한글 변환 | `"천이백삼십사"` |

## moment.js에서 마이그레이션

```javascript
// Before (moment.js)
const moment = require('moment');
require('moment/locale/ko');
moment.locale('ko');

moment().fromNow();           // "몇 초 전" (어색함)
moment().format('YYYY년 MM월 DD일');

// After (hangul-moment)
const hangulMoment = require('hangul-moment');

hangulMoment().fromNow();     // "방금 전" (자연스러움)
hangulMoment().format();      // 기본값이 한국어 형식
```

## 기여하기

버그 리포트, 기능 제안, PR 모두 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 라이센스

MIT 라이센스로 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 감사

- [moment.js](https://momentjs.com/) - 영감을 준 훌륭한 라이브러리
- [day.js](https://day.js.org/) - 가벼운 설계의 참조
- 한국어 개발자 커뮤니티의 피드백

---

Made for Korean developers
