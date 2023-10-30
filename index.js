const urlApi = "http://localhost:3000/users"
fetch(urlApi) 
	.then (res => res.json())
	.then ((users) =>
		$('#users').innerHTML = users.map((item) => {
			let {name, username} = item
			return (`
				<div class="infor">
					<span>${name}</span>
					<div>${username}</div>
				</div>
			`)
		}).join('')

	)
	.catch( () => {
		console.log('Không thể gọi được API')
	})
const $ = document.querySelector.bind(document);