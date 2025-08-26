/**
 * hangul-moment - 한국어 친화적 날짜/시간 라이브러리
 * moment.js, day.js의 한국어 특화 버전
 */

class HangulMoment {
  constructor(date) {
    this.date = date ? new Date(date) : new Date();
  }

  /**
   * 자연스러운 한국어 상대시간 표현
   * moment().fromNow() 의 한국어 개선 버전
   */
  fromNow() {
    const now = new Date();
    const diff = now.getTime() - this.date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // 미래 시점인 경우
    if (diff < 0) {
      return this._getFutureTimeString(Math.abs(diff));
    }

    // 과거 시점 처리
    if (seconds < 10) return '방금 전';
    if (seconds < 60) return `${seconds}초 전`;
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    
    // 특별한 한국어 표현들
    if (days === 1) return '어제';
    if (days === 2) return '그저께';
    if (days === 3) return '그끄저께';
    
    if (days < 7) return `${days}일 전`;
    if (days < 30) {
      const weeks = Math.floor(days / 7);
      return `${weeks}주 전`;
    }
    if (days < 365) {
      const months = Math.floor(days / 30);
      return `${months}개월 전`;
    }
    
    const years = Math.floor(days / 365);
    return `${years}년 전`;
  }

  /**
   * 미래 시점의 자연스러운 한국어 표현
   */
  _getFutureTimeString(diffMs) {
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return `${seconds}초 후`;
    if (minutes < 60) return `${minutes}분 후`;
    if (hours < 24) return `${hours}시간 후`;
    
    // 특별한 한국어 표현들
    if (days === 1) return '내일';
    if (days === 2) return '모레';
    if (days === 3) return '글피';
    
    if (days < 7) return `${days}일 후`;
    if (days < 30) {
      const weeks = Math.floor(days / 7);
      return `${weeks}주 후`;
    }
    if (days < 365) {
      const months = Math.floor(days / 30);
      return `${months}개월 후`;
    }
    
    const years = Math.floor(days / 365);
    return `${years}년 후`;
  }

  /**
   * 한국식 날짜 포맷팅
   * 예: 2025년 8월 26일 (화요일)
   */
  format(formatStr = 'YYYY년 MM월 DD일') {
    const year = this.date.getFullYear();
    const month = this.date.getMonth() + 1;
    const date = this.date.getDate();
    const day = this.date.getDay();
    
    const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const dayShort = ['일', '월', '화', '수', '목', '금', '토'];

    return formatStr
      .replace('YYYY', year)
      .replace('MM', month.toString().padStart(2, '0'))
      .replace('M', month)
      .replace('DD', date.toString().padStart(2, '0'))
      .replace('D', date)
      .replace('dddd', dayNames[day])
      .replace('dd', dayShort[day]);
  }

  /**
   * 받침에 따른 조사 자동 선택
   */
  static addParticle(word, particle) {
    if (!word || typeof word !== 'string') return word;
    
    const lastChar = word.charAt(word.length - 1);
    const lastCharCode = lastChar.charCodeAt(0);
    
    // 한글이 아닌 경우 기본 처리
    if (lastCharCode < 0xAC00 || lastCharCode > 0xD7A3) {
      const particles = {
        '이': '이', '가': '가',
        '을': '을', '를': '를',
        '은': '은', '는': '는',
        '과': '과', '와': '와'
      };
      return word + particles[particle] || particle;
    }

    // 받침 여부 확인 (한글 유니코드 계산)
    const hasJongseong = (lastCharCode - 0xAC00) % 28 !== 0;
    
    const particleMap = {
      '이': hasJongseong ? '이' : '가',
      '가': hasJongseong ? '이' : '가',
      '을': hasJongseong ? '을' : '를',
      '를': hasJongseong ? '을' : '를',
      '은': hasJongseong ? '은' : '는',
      '는': hasJongseong ? '은' : '는',
      '과': hasJongseong ? '과' : '와',
      '와': hasJongseong ? '과' : '와'
    };

    return word + (particleMap[particle] || particle);
  }

  /**
   * 숫자를 한글로 변환
   */
  static numberToKorean(num) {
    if (num === 0) return '영';
    
    const units = ['', '만', '억', '조'];
    const digits = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
    const positions = ['', '십', '백', '천'];
    
    let result = '';
    let unitIndex = 0;
    
    while (num > 0) {
      const chunk = num % 10000;
      if (chunk > 0) {
        let chunkStr = '';
        let temp = chunk;
        
        for (let i = 0; i < 4; i++) {
          const digit = temp % 10;
          if (digit > 0) {
            if (digit === 1 && i > 0) {
              chunkStr = positions[i] + chunkStr;
            } else {
              chunkStr = digits[digit] + positions[i] + chunkStr;
            }
          }
          temp = Math.floor(temp / 10);
        }
        
        result = chunkStr + units[unitIndex] + result;
      }
      
      num = Math.floor(num / 10000);
      unitIndex++;
    }
    
    return result;
  }

  /**
   * 한국식 나이 계산 (세는 나이)
   */
  getKoreanAge(birthDate) {
    const birth = new Date(birthDate);
    const currentYear = new Date().getFullYear();
    const birthYear = birth.getFullYear();
    
    return currentYear - birthYear + 1;
  }

  /**
   * 만 나이 계산
   */
  getAge(birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();
    
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

  /**
   * 계절 반환
   */
  getSeason() {
    const month = this.date.getMonth() + 1;
    
    if (month >= 3 && month <= 5) return '봄';
    if (month >= 6 && month <= 8) return '여름';
    if (month >= 9 && month <= 11) return '가을';
    return '겨울';
  }

  /**
   * 한국 공휴일 확인 (간단 버전)
   */
  isHoliday() {
    const month = this.date.getMonth() + 1;
    const date = this.date.getDate();
    
    // 고정 공휴일들
    const holidays = [
      [1, 1],   // 신정
      [3, 1],   // 삼일절
      [5, 5],   // 어린이날
      [6, 6],   // 현충일
      [8, 15],  // 광복절
      [10, 3],  // 개천절
      [10, 9],  // 한글날
      [12, 25]  // 크리스마스
    ];
    
    return holidays.some(([m, d]) => month === m && date === d);
  }

  /**
   * 체이닝을 위한 복사본 반환
   */
  clone() {
    return new HangulMoment(this.date);
  }

  /**
   * 날짜 더하기
   */
  add(amount, unit) {
    const newDate = new Date(this.date);
    
    switch (unit) {
      case 'day':
      case 'days':
        newDate.setDate(newDate.getDate() + amount);
        break;
      case 'month':
      case 'months':
        newDate.setMonth(newDate.getMonth() + amount);
        break;
      case 'year':
      case 'years':
        newDate.setFullYear(newDate.getFullYear() + amount);
        break;
    }
    
    return new HangulMoment(newDate);
  }
}

// 팩토리 함수
function hangulMoment(date) {
  return new HangulMoment(date);
}

// 정적 메서드들을 팩토리 함수에 추가
hangulMoment.addParticle = HangulMoment.addParticle;
hangulMoment.numberToKorean = HangulMoment.numberToKorean;

// 사용 예시
if (typeof module !== 'undefined' && module.exports) {
  module.exports = hangulMoment;
} else if (typeof window !== 'undefined') {
  window.hangulMoment = hangulMoment;
}

// ===== 사용 예시 =====
/*
// 기본 사용법
const hm = hangulMoment();
console.log(hm.fromNow()); // "방금 전"

const yesterday = hangulMoment().add(-1, 'day');
console.log(yesterday.fromNow()); // "어제"

const dayAfterTomorrow = hangulMoment().add(2, 'day');
console.log(dayAfterTomorrow.fromNow()); // "모레"

// 포맷팅
console.log(hm.format()); // "2025년 08월 26일"
console.log(hm.format('YYYY년 M월 D일 (dd)')); // "2025년 8월 26일 (화)"

// 조사 처리
console.log(hangulMoment.addParticle("사과", "을")); // "사과를"
console.log(hangulMoment.addParticle("바나나", "을")); // "바나나를"
console.log(hangulMoment.addParticle("책", "이")); // "책이"

// 숫자를 한글로
console.log(hangulMoment.numberToKorean(1234)); // "천이백삼십사"

// 나이 계산
console.log(hm.getAge('1990-05-15')); // 만 나이
console.log(hm.getKoreanAge('1990-05-15')); // 세는 나이

// 계절
console.log(hm.getSeason()); // "여름"
*/
