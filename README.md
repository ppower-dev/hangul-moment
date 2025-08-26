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

## 사용 예시
```javascript
const hangulMoment = require('hangul-moment');

// ============================================================================
// 예시 1: 인스타그램 스타일 게시물 타임스탬프
// ============================================================================
console.log('📸 인스타그램 스타일 타임스탬프');

// 다양한 시점의 게시물들
const posts = [
    { content: "맛있는 점심!", createdAt: new Date() },                                    // 지금
    { content: "아침 운동 완료", createdAt: new Date(Date.now() - 2*60*60*1000) },        // 2시간 전
    { content: "좋은 하루!", createdAt: new Date(Date.now() - 24*60*60*1000) },           // 1일 전  
    { content: "주말 나들이", createdAt: new Date(Date.now() - 2*24*60*60*1000) }         // 2일 전
];

posts.forEach(post => {
    const timeAgo = hangulMoment(post.createdAt).fromNow();
    console.log(`"${post.content}" - ${timeAgo}`);
});

console.log('\n출력 결과:');
console.log('"맛있는 점심!" - 방금 전');
console.log('"아침 운동 완료" - 2시간 전'); 
console.log('"좋은 하루!" - 어제');
console.log('"주말 나들이" - 그저께');

// ============================================================================
// 예시 2: 쇼핑몰 주문 알림 시스템
// ============================================================================
console.log('\n\n🛒 쇼핑몰 주문 알림 시스템');

// 주문 목록
const orders = [
    { productName: "아이폰", orderTime: new Date(Date.now() - 30*60*1000) },    // 30분 전
    { productName: "노트북", orderTime: new Date(Date.now() - 3*60*60*1000) },   // 3시간 전
    { productName: "책", orderTime: new Date(Date.now() - 24*60*60*1000) }       // 1일 전
];

orders.forEach(order => {
    // 조사 자동 처리로 자연스러운 문장 생성
    const productWithParticle = hangulMoment.addParticle(order.productName, '이');
    const timeAgo = hangulMoment(order.orderTime).fromNow();
    
    console.log(`${productWithParticle} ${timeAgo} 주문되었습니다.`);
});

console.log('\n출력 결과:');
console.log('아이폰이 30분 전 주문되었습니다.');
console.log('노트북이 3시간 전 주문되었습니다.');
console.log('책이 어제 주문되었습니다.');

// ============================================================================  
// 예시 3: 일정 관리 앱 - 미래 일정 알림
// ============================================================================
console.log('\n\n📅 일정 관리 앱 - 미래 일정');

// 앞으로의 일정들
const events = [
    { title: "치과 예약", date: new Date(Date.now() + 2*60*60*1000) },          // 2시간 후
    { title: "친구 만나기", date: new Date(Date.now() + 24*60*60*1000) },       // 1일 후
    { title: "회사 회식", date: new Date(Date.now() + 2*24*60*60*1000) },       // 2일 후
    { title: "가족 모임", date: new Date(Date.now() + 7*24*60*60*1000) }        // 1주 후
];

events.forEach(event => {
    const eventTime = hangulMoment(event.date);
    const timeUntil = eventTime.fromNow();
    const formattedDate = eventTime.format('M월 D일 (dd)');
    
    console.log(`${event.title}: ${formattedDate} (${timeUntil})`);
});

console.log('\n출력 결과:');
console.log('치과 예약: 8월 26일 (화) (2시간 후)');
console.log('친구 만나기: 8월 27일 (수) (내일)'); 
console.log('회사 회식: 8월 28일 (목) (모레)');
console.log('가족 모임: 9월 2일 (월) (1주 후)');
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


---

Made for Korean developers
