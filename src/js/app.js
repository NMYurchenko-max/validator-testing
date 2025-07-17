import CardValidatorWidget from "./CardValidatorWidget"; // импортируем класс формы

// Функция для инициализации приложения
function init() {
  // Находим контейнер для виджета
  const appContainer = document.getElementById('app');
  // Создаем новый экземпляр виджета
  const cardValidatorWidget = new CardValidatorWidget(appContainer);
  // Здесь можно добавить дополнительные настройки виджета, если потребуется
}
// Ждем, пока документ будет загружен, и затем инициализируем приложение
document.addEventListener('DOMContentLoaded', init); 
