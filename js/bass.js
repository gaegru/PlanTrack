// js/bass.js

// 오늘 날짜 가져오기
const today = new Date();
let currentMonth = today.getMonth(); // 현재 월 (0: 1월, 11: 12월)
let currentYear = today.getFullYear(); // 현재 연도

// HTML 요소 가져오기
const calendarGrid = document.getElementById('calendar-grid');
const currentMonthElement = document.getElementById('current-month');

// 월 이름 배열
const monthNames = [
  '1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월'
];

// 달력 생성 함수
function generateCalendar(month, year) {
  // 이전 내용 초기화
  const days = calendarGrid.querySelectorAll('.date');
  days.forEach(day => day.remove());

  // 해당 월의 첫 번째 날과 마지막 날
  const firstDay = new Date(year, month, 1).getDay(); // 첫째 날의 요일 (0: 일요일)
  const lastDate = new Date(year, month + 1, 0).getDate(); // 마지막 날짜

  // 현재 월 표시
  currentMonthElement.textContent = `${monthNames[month]} ${year}`;

  // 빈 칸 생성 (첫 주 시작 전)
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('date');
    calendarGrid.appendChild(emptyCell);
  }

  // 날짜 생성
  for (let date = 1; date <= lastDate; date++) {
    const dateCell = document.createElement('div');
    dateCell.classList.add('date');
    dateCell.textContent = date; // 날짜 텍스트
    calendarGrid.appendChild(dateCell);
  }
}

// 이전 월 / 다음 월 이동
function changeMonth(direction) {
  currentMonth += direction;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear -= 1;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear += 1;
  }
  generateCalendar(currentMonth, currentYear);
}

// 현재 날짜로 이동하는 함수
function goToToday() {
    currentMonth = today.getMonth(); // 오늘의 월로 설정
    currentYear = today.getFullYear(); // 오늘의 연도로 설정
    generateCalendar(currentMonth, currentYear);
  }

// 이벤트 리스너 연결
document.querySelector('.prev-button').addEventListener('click', () => changeMonth(-1));
document.querySelector('.next-button').addEventListener('click', () => changeMonth(1));

// 초기 달력 생성
generateCalendar(currentMonth, currentYear);

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      // 왼쪽 방향키 -> 이전 달
      changeMonth(-1);
    } else if (event.key === 'ArrowRight') {
      // 오른쪽 방향키 -> 다음 달
      changeMonth(1);
    }
  });
  