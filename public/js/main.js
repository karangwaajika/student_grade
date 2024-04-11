const search= document.getElementById('search');
const matchList= document.getElementById('match-list');

//search states.json and filter it
const searchStates= async searchText =>{
	const res= await fetch('json/tuto.json');
	const states= await res.json();
	// console.log(states);

	//get matches to current text input
	let matches = states.filter(state =>{
       const regex = new RegExp(`^${searchText}`, 'gi');
       return state.name.match(regex) || state.abbr.match(regex);

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

       	<div class"card card-body mb-1">
       	<h4>${match.name} (${match.abbr}) <span class=text-primary >${match.capital}</span?</h4>
       	</div>
       	`).join('');
       // console.log(html);

       matchList.innerHTML=html;
	}
};

search.addEventListener('input',()=> searchStates(search.value));