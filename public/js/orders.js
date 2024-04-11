const search= document.getElementById('search');
const matchList= document.getElementById('match-list');

//search states.json and filter it
const searchStates= async searchText =>{
	const res= await fetch('json/clients.json');
	const states= await res.json();
	// console.log(states);
    //the states must be array with only client id
	//get matches to current text input
	let matches = states.filter(state =>{
       const regex = new RegExp(`^${searchText}`, 'gi');
       return state.user.match(regex) || state.client_id.match(regex);

	});

	//prevent button when cleaning

	if (searchText.length ===0) {
		matches=[];
		matchList.innerHTML='';
	}
	//output in html
	outputHtml(matches);
	// console.log(matches);
};

//show result in HTML

const outputHtml= matches =>{
	if(matches.length>0) {
       const html= matches.map(match =>`

       	<div class="border-top border-primary bg-light mb-1 p-1 text-center">
       	
       	<a href="orders.php?id=${match.client_id}"> <span class="">${match.user}</span?>(<span class="badge badge-success">${match.client_id}</span>)</a
       	</div>
       	`).join('');
       // console.log(html);

       matchList.innerHTML=html;
	}
};

search.addEventListener('input',()=> searchStates(search.value));