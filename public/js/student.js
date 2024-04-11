const search= document.getElementById('search');
const matchList= document.getElementById('match-list');

//search states.json and filter it
const searchStates= async searchText =>{
	const res= await fetch('json/student.json');
	const states= await res.json();
	// console.log(states);

	//get matches to current text input
	let matches = states.filter(state =>{
       const regex = new RegExp(`^${searchText}`, 'gi');
       return state.studentName.match(regex) || state.studentId.match(regex);

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
       	
       	<a href="giveMarks.php?id=${match.studentId}"> <span class="">${match.studentName}</span?</a
       	</div>
       	`).join('');
       // console.log(html);

       matchList.innerHTML=html;
	}
};

search.addEventListener('input',()=> searchStates(search.value));