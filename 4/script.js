const url = 'https://opentdb.com/api.php?amount=10';
const answerBox = document.getElementById('answer_box');
const subtitleBox = document.getElementById('subtitle_box');


/*
クイズデータ操作クラス
*/
class Quiz {
  constructor(quizData) {
    this.quizData = quizData;
    this.quizNum = quizData.length - 1;
    this.quizIndex = 0;
    this.quizCorrect = 0;
  }

  //クイズインデックスを取得
  getQuizIndex() {
    return this.quizIndex;
  }

  //クイズインデックスを設定
  setQuizIndex() {
    return ++this.quizIndex;
  }

  //クイズカテゴリを取得
  getQuizCategory() {
    return this.quizData[this.quizIndex].category;
  }

  //クイズ難易度を取得
  getQuizLevel() {
    return this.quizData[this.quizIndex].difficulty;
  }

  //クイズ本文を取得
  getQuizQuestion() {
    return this.quizData[this.quizIndex].question;
  }

  //クイズ回答選択肢を取得
  getQuizAnswer() {
    const array = this.quizData[this.quizIndex].incorrect_answers;
    return array.concat(this.quizData[this.quizIndex].correct_answer);
  }

  //クイズの正答を判定
  checkAnser(answer) {
    if (this.quizData[this.quizIndex].correct_answer === answer) this.quizCorrect++;
  }

  //クイズの正解数を取得
  getQuizCorrect() {
    return this.quizCorrect;
  }
}

/*
「開始」ボタン押下時の動作
*/
document.getElementById('start').addEventListener('click', function () {

  document.getElementById('title').textContent = '取得中';
  document.getElementById('quiz').textContent = '少々お待ちください';
  document.getElementById('start').remove();

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      quizData = data.results;
      const quiz = new Quiz(quizData);
      makeQuiz(quiz);
    })
    .catch(error => {
      console.log("失敗しました");
    });
});

/*
クイズ画面の生成関数
*/
const makeQuiz = function (quiz) {
  //初回のみ必要な要素を追加
  if (quiz.getQuizIndex() === 0) {
    const genreBtn = document.createElement('h3');
    const levelBtn = document.createElement('h3');
    genreBtn.id = 'genre';
    levelBtn.id = 'level';
    subtitle_box.appendChild(genreBtn);
    subtitle_box.appendChild(levelBtn);
  }

  //回答ボタン以外の文言の設定
  document.getElementById('title').textContent = '問題' + Number(quiz.getQuizIndex() + 1);
  document.getElementById('genre').textContent = '［ジャンル］' + quiz.getQuizCategory();
  document.getElementById('level').textContent = '［難易度］' + quiz.getQuizLevel();
  document.getElementById('quiz').textContent = quiz.getQuizQuestion();

  //初回以外は回答ボタンを削除
  if (quiz.getQuizIndex() !== 0) {
    while (answerBox.firstChild) {
      answerBox.removeChild(answerBox.firstChild);
    }
  }

  //回答ボタンの設定
  //回答を取得しランダムに配列に格納
  const answers = arrayShuffle(quiz.getQuizAnswer());
  for (let i = 0; i < answers.length; i++) {
    const p = document.createElement('p');
    const button = document.createElement('button');
    p.appendChild(button);
    button.textContent = answers[i];
    button.addEventListener('click', function () {
      //答え合わせ
      quiz.checkAnser(button.textContent);
      //問題数に達したら、最終ページを、それ以外は次の問題を生成
      if (quiz.getQuizIndex() === quiz.quizNum) {
        setFinalPage(quiz);
      } else {
        quiz.setQuizIndex();
        makeQuiz(quiz);
      }
    });
    answerBox.appendChild(p);
  }
}

/*
最終ページの生成関数
*/
const setFinalPage = function (quiz) {
  //不要な要素の削除
  answerBox.remove();
  subtitleBox.remove();

  //ページの整形
  document.getElementById('title').textContent = 'あなたの正答数は、' + quiz.getQuizCorrect() + 'です！';
  document.getElementById('quiz').textContent = '再チャレンジしたい場合は以下をクリック';
  const home = document.createElement('button');
  home.textContent = 'ホームへ戻る';
  home.addEventListener('click', function () {
    window.location.href = './index.html';
  });
  document.getElementById('button_box').appendChild(home);
}

/*
ランダム関数
*/
function arrayShuffle(array) {
  for (let i = (array.length - 1); 0 < i; i--) {
    // 0〜(i+1)の範囲で値を取得
    var r = Math.floor(Math.random() * (i + 1));
    // 要素の並び替えを実行
    let tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
}
