
//タスク管理用配列を定義
const todos = [];

//タスク表示用のテーブルタグ取得
const taskTable = document.getElementById('taskList') ;

//タスクの表示/非表示を管理するラジオボタンタグ取得
const radioGroup = document.getElementsByName('radio') ;


/*
ラジオボタンにイベントを設定
*/
window.onload = function() {

	radioGroup.forEach (function(e) {

		e.addEventListener('change', function() {

			//タスクを表示しているテーブル行を取得
			const taskRows = taskTable.getElementsByTagName("tr") ;

			//ラジオボタンで「すべて」が選択された時、すべてのタスクを表示
			if (e.value === 'すべて') {
				for (let i in todos) {
					taskRows[Number(i)+1].hidden = false ;
				}

			//「作業中」が選択された時、状態が「作業中」のタスクのみを表示
			} else if (e.value === '作業中') {
				for (let i in todos) {
					if (todos[i].state === '作業中') {
						taskRows[Number(i)+1].hidden = false ;
					} else {
						taskRows[Number(i)+1].hidden = true ;
					}
				}

			//「完了」が選択された時、状態が「完了」のタスクのみを表示
			} else if (e.value === '完了') {
				for (let i in todos) {
					if (todos[i].state === '完了') {
						taskRows[Number(i)+1].hidden = false ;
					} else {
						taskRows[Number(i)+1].hidden = true ;
					}
				}
			}
		});
	});

}


/*
新規タスクの「追加」ボタン押下時の動作
*/
document.getElementById('taskAdd').onclick = function () {

	//入力されたタスク内容取得
	const inputValue = document.getElementById('input').value ;

	//空文字チェック
	if (inputValue === '') {
		alert('タスクを入力してください')
		return false ;
	}

	//取得した内容を作業用配列に代入
	const todo = {
					task: inputValue , 
					state: '作業中' 
				};

	//作業用配列をタスク管理用配列に格納
	todos.push(todo);

	//格納されたタスクを表示
	displayTodos(todo,todos.length-1);

	//入力欄のクリア
	document.getElementById('input').value = '' ;

}


/*
「削除」ボタン押下時の動作
*/
const deleteTodo = function (button) {

	//削除対象の行番号を取得
	const targetId = button.parentNode.parentNode.sectionRowIndex ;

	//タスク管理用配列から対象のタスクを削除
	todos.splice(targetId-1, 1) ;

	//表示されているタスクから対象のタスクを削除
	taskTable.deleteRow(targetId) ;

	//idの降り直し
	for (let n = targetId ; n < taskTable.rows.length ; n++) {
		taskTable.rows[n].cells[0].textContent = n-1 ;
	}

}


/*
状態（作業中、完了）ボタン押下時の動作
*/
const changeState = function (button) {
	
	//対象の行番号を取得
	const targetId = button.parentNode.parentNode.sectionRowIndex ;

	//対象タスクが「作業中」なら「完了」へ変更
	if (todos[targetId-1].state === '作業中') {
		taskTable.rows[targetId].cells[2].firstChild.textContent = '完了' ;
		todos[targetId-1].state = '完了' ;

	//対象タスクが「完了」なら「作業中」へ変更
	} else if (todos[targetId-1].state === '完了') {
		taskTable.rows[targetId].cells[2].firstChild.textContent = '作業中' ;
		todos[targetId-1].state = '作業中' ;
	}
}


/*
タスク内容表示関数
*/
const displayTodos = function (todo,taskId) {

	//ｔｒ、ｔｈタグの生成
	const taskRow = taskTable.insertRow() ;
	const taskCellId = taskRow.insertCell(0) ;
	const taskCellComment = taskRow.insertCell(1) ;
	const taskCellStatus = taskRow.insertCell(2) ;
	const taskCellDelete = taskRow.insertCell(3) ;

	//タスク内容設定
	taskCellId.textContent = taskId ;
	taskCellComment.textContent = todo.task ;
	taskCellStatus.appendChild(createStateBtn(todo.state)) ;
	taskCellDelete.appendChild(createDeleteBtn()) ;
	
	//ラジオボタンの状態を取得し、タスク状態と差異があれば非表示とする
	radioGroup.forEach (function(e) {
		if (e.checked) {
			if (e.value !== 'すべて'　&& e.value !== todo.state) {
				taskRow.hidden = true ;
			}
		}
	});

}


/*
状態ボタン生成関数
*/
const createStateBtn = function (state) {

	const stateBtn = document.createElement('button') ;
	stateBtn.onclick = function () { changeState(this); } ;
	stateBtn.textContent = state ;

	return stateBtn ;
}


/*
削除ボタン生成関数
*/
const createDeleteBtn = function () {

	const deletionBtn = document.createElement('button') ;
	deletionBtn.onclick = function () { deleteTodo(this); } ;
	deletionBtn.textContent = '削除' ;

	return deletionBtn ;
}

