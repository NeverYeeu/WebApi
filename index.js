const $ = document.querySelector.bind(document)
const urlApi = "http://localhost:3000/manhua";
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
			let isChoose = confirm('Bạn có muốn xóa truyện này không?');
			if(isChoose == true) {
				item.remove();
				console.log('xóa truyện')
			} else{
				console.log('Không xóa truyện')
			}
		})
}
function renderData(array) {
	$('#users').innerHTML = array.map(
		(item) => {
			let {nameComic, mainComic,imageComic,chapComic, genreComic, id} = item
			return (`
				<div class="infor item-${id}">
					<div class="wrap-infor">
						<img class="imageComic" src=${imageComic}>
						<input class="chapComic" value=${chapComic}>
					</div>
					<div class="comic-infor">
						<span>Name: ${nameComic}</span>
						<div>User name: ${mainComic}</div> 
						<input class="genreComic" value=${genreComic}>
						<input class="imageComic2" value=${imageComic}>
					</div>
					<div class="delete-btn" onclick="deleteApi(${id})">Xóa</div>
				</div>
			`)
		}
	).join('')
}

//Xử lý khi ta nhập dữ liệu------------------------------------------------------------------
function handleForm(){
	button.addEventListener('click', () => {
		let nameComic = $('input[name="name"]').value;
		let mainComic = $('input[name="userName"]').value;
		let imageComic = $('input[name="imageComic"]').value;
		let chapComic = $('input[name="chapComic"]').value;
		let genreComic = $('input[name="genreComic"]').value;
		var formData = {
			nameComic: nameComic,
			mainComic: mainComic,
			imageComic: imageComic,
			chapComic: chapComic,
			genreComic: genreComic
		}
		postApi(formData, () => {
			getApi(renderData);
		})
	})
}