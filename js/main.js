const inputElement = document.querySelector("#input");
const textExampleElement = document.querySelector("#textExample");
const text = `Значимость этих проблем настолько очевидна, что новая модель организационной деятельности позволяет выполнять важные задания по разработке системы обучения кадров, соответствует насущным потребностям. С другой стороны рамки и место обучения кадров требуют определения и уточнения форм развития. Не следует, однако забывать, что сложившаяся структура организации способствует подготовки и реализации дальнейших направлений развития. Задача организации, в особенности же новая модель организационной деятельности позволяет выполнять важные задания по разработке дальнейших направлений развития. Таким образом начало повседневной работы по формированию позиции требуют определения и уточнения дальнейших направлений развития.
Значимость этих проблем настолько очевидна, что консультация с широким активом обеспечивает широкому кругу (специалистов) участие в формировании соответствующий условий активизации. Идейные соображения высшего порядка, а также сложившаяся структура организации позволяет оценить значение систем массового участия. Задача организации, в особенности же начало повседневной работы по формированию позиции способствует подготовки и реализации систем массового участия. Идейные соображения высшего порядка, а также укрепление и развитие структуры позволяет выполнять важные задания по разработке соответствующий условий активизации. С другой стороны постоянный количественный рост и сфера нашей активности позволяет выполнять важные задания по разработке соответствующий условий активизации. Товарищи! сложившаяся структура организации обеспечивает широкому кругу (специалистов) участие в формировании дальнейших направлений развития.
Не следует, однако забывать, что укрепление и развитие структуры требуют определения и уточнения модели развития. Идейные соображения высшего порядка, а также начало повседневной работы по формированию позиции играет важную роль в формировании соответствующий условий активизации. Задача организации, в особенности же начало повседневной работы по формированию позиции влечет за собой процесс внедрения и модернизации системы обучения кадров, соответствует насущным потребностям. Равным образом постоянное информационно-пропагандистское обеспечение нашей деятельности способствует подготовки и реализации систем массового участия. Задача организации, в особенности же дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации соответствующий условий активизации. Значимость этих проблем настолько очевидна, что реализация намеченных плановых заданий играет важную роль в формировании направлений прогрессивного развития.
Сервис удаления фона нейросетью — видит людей, их волосы, различные предметы, авто. Удаляет фон.Сервис покупки контента со стоков за копейки— экономит до 90% от первоначальной стоимости`;

const lines = getLines(text);

let letterId = 1;

update();

inputElement.addEventListener("keydown", event => {
    const currentLetter = getCurrentLetter();
    if(event.key === currentLetter.label){
        letterId++;
        update();
    }
});

// принимает длинную строку, возвращает миссив строк со служебной информацией
function getLines(text) {
  const lines = [];
  let line = [];
  let idCounter = 0;

  for (const letter of text) {
    idCounter++;
    line.push({
      id: idCounter,
      label: letter,
      success: true
    });

    if (line.length >= 70 || letter === "\n") {
      lines.push(line);
      line = [];
    }
  }
  if (line.length >= 0) {
    lines.push(line);
  }
  return lines;
}

// принимает строку с объекстами и служебной информацией, возвращается html структуру
function lineToHtml(line) {
  // <div class="line line-1">
  // 			<span class="done"> На переднем плане, прямо перед</span>
  // 			<span class="hint">н</span>ами, расположен был дворик, где стоял
  // 		</div>
  const divElement = document.createElement("div");
  divElement.classList.add("line");

  for (const letter of line) {
    const spanElement = document.createElement("span");
    spanElement.textContent = letter.label;

    divElement.append(spanElement);

    if (letterId > letter.id) {
      spanElement.classList.add("done");
    }
  }
  return divElement;
}

// возвращает актуальный номер строки
function getCurrentLineNumber() {
  for (let i = 0; i < lines.length; i++) {
    for (const letter of lines[i]) {
      if (letter.id === letterId) {
        return i;
      }
    }
  }
}

// функция обновление трех отображаемых актуальных строк textExample
function update() {
  const currentLineNumber = getCurrentLineNumber();
  textExampleElement.innerHTML = "";

  //   for (const line of lines) {
  //     const html = lineToHtml(line);
  //     textExampleElement.append(html);
  //   }

  for (let i = 0; i < lines.length; i++) {
    const html = lineToHtml(lines[i]);
    textExampleElement.append(html);

    if (i < currentLineNumber || i > currentLineNumber + 2) {
      html.classList.add("hidden");
    }
  }
}

// возвращает объект символа ожидаемый программой
function getCurrentLetter(){
    for(const line of lines){
        for(const letter of line){
            if(letterId === letter.id){
                return letter;
            }
        }
    }
}