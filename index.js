const $ = document.querySelector.bind(document)
const urlApi = "http://localhost:3000/users";
const button = $('#button');
function startWeb(){
	getApi(renderData);
	handleForm();
}
startWeb();
function getApi(callback) {
	fetch(urlApi) 
		.then (res => res.json())
		.then (callback)		
		.catch( () => {
			console.log('Không thể gọi được API')
		})
}
// Đẩy code lên json-server--------------------------------------------------
function postApi(data, usersApi) {
	let option = {
		method: 'POST',
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(data)
		
	}
	fetch(urlApi, option) 
		.then(res => res.json())
		.then(usersApi)
}
// Xóa dữ liệu--------------------------------------------------------------
function deleteApi(id){
	let option = {
		method: 'DELETE',
		headers: {"Content-Type": "application/json"},
	}
	fetch(urlApi + '/' + id, option) 
		.then(res => res.json())
		.then(() => {
			let item = $('.item-' + id);
			item.remove();
		})
}
function renderData(array) {
	$('#users').innerHTML = array.map(
		(item) => {
			let {name, username, id} = item
			return (`
				<div class="infor item-${id}">
					<span>Name: ${name}</span>
					<div>User name: ${username}</div>
					<div class="delete-btn" onclick="deleteApi(${id})">Xóa</div>
				</div>
			`)
		}
	).join('')
}

//Xử lý khi ta nhập dữ liệu------------------------------------------------------------------
function handleForm(){
	button.addEventListener('click', () => {
		let name = $('input[name="name"]').value;
		let username = $('input[name="userName"]').value
		var formData = {
			name: name,
			username: username
		}
		postApi(formData, () => {
			getApi(renderData);
		})
	})
}