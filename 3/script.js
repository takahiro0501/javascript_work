
//タスク管理用配列を定義
const todos = [];

//タスク表示用のテーブルタグ取得
const taskTable = document.getElementById('taskList') ;


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

}


/*
状態ボタン生成関数
*/
const createStateBtn = function (state) {

	const stateBtn = document.createElement('button') ;
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

