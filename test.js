const hangulMoment = require('./index.js');

console.log('🧪 hangul-moment 테스트 시작\n');

// 1. fromNow() 테스트
console.log('📅 상대시간 테스트:');
const now = hangulMoment();
console.log(`현재: ${now.fromNow()}`);

const yesterday = hangulMoment().add(-1, 'day');
console.log(`-1일: ${yesterday.fromNow()}`);

const dayBeforeYesterday = hangulMoment().add(-2, 'day');  
console.log(`-2일: ${dayBeforeYesterday.fromNow()}`);

const tomorrow = hangulMoment().add(1, 'day');
console.log(`+1일: ${tomorrow.fromNow()}`);

const dayAfterTomorrow = hangulMoment().add(2, 'day');
console.log(`+2일: ${dayAfterTomorrow.fromNow()}\n`);

// 2. format() 테스트
console.log('🎨 포맷팅 테스트:');
const testDate = hangulMoment('2025-08-26');
console.log(`기본: ${testDate.format()}`);
console.log(`커스텀: ${testDate.format('YYYY년 M월 D일 (dd)')}`);
console.log(`풀네임: ${testDate.format('YYYY년 M월 D일 (dddd)')}\n`);

// 3. 조사 처리 테스트
console.log('🔤 조사 처리 테스트:');
const words = [
  ['사과', '을'], ['바나나', '을'], ['책', '이'], ['연필', '이'],
  ['집', '은'], ['학교', '는'], ['음식', '과'], ['친구', '와']
];

words.forEach(([word, particle]) => {
  console.log(`${word} + ${particle} = ${hangulMoment.addParticle(word, particle)}`);
});
console.log();

// 4. 숫자 한글 변환 테스트
console.log('🔢 숫자 한글 변환 테스트:');
const numbers = [0, 1, 10, 11, 100, 101, 1000, 1234, 10000, 50000];
numbers.forEach(num => {
  console.log(`${num} = ${hangulMoment.numberToKorean(num)}`);
});
console.log();

// 5. 나이 계산 테스트  
console.log('🎂 나이 계산 테스트 (1990-05-15 기준):');
console.log(`만 나이: ${now.getAge('1990-05-15')}세`);
console.log(`세는 나이: ${now.getKoreanAge('1990-05-15')}세\n`);

// 6. 계절 테스트
console.log('🌸 계절 테스트:');
const seasons = [
  '2025-03-21', '2025-06-21', '2025-09-21', '2025-12-21'
];
seasons.forEach(date => {
  const hm = hangulMoment(date);
  console.log(`${date}: ${hm.getSeason()}`);
});
console.log();

// 7. 공휴일 테스트
console.log('🎌 공휴일 테스트:');
const holidays = ['2025-01-01', '2025-03-01', '2025-05-05', '2025-12-25'];
holidays.forEach(date => {
  const hm = hangulMoment(date);
  console.log(`${date}: ${hm.isHoliday() ? '공휴일' : '평일'}`);
});

console.log('\n✅ 모든 테스트 완료!');
