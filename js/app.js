const pageSections = document.querySelectorAll('section');

if(sessionStorage.getItem('current page className') != null){
	showSection(sessionStorage.getItem('current page className'));
} else {
	showSection('homepage');
}

const navBtn = document.querySelectorAll('nav a');
navBtn.forEach(btn => {
	btn.addEventListener('click', e => {
		e.preventDefault();
		
		if(e.target === navBtn[0]){
			hideSections();
			addSectionClassName('homepage')
		} else if(e.target === navBtn[1]){
			hideSections();
			addSectionClassName('todo-list')
		} else if(e.target === navBtn[2]){
			hideSections();
			addSectionClassName('archives');
		}

		showSection(sessionStorage.getItem('current page className'));
	})
})



function addSectionClassName(name){
	sessionStorage.setItem('current page className', name);
}

function hideSections(){
	pageSections.forEach(section => {
		section.style.display = 'none';
	})
}

function showSection(sectionClassName){
	let currentPage;
	pageSections.forEach(section => {
		if(section.classList.contains(sectionClassName)){
			currentPage = section;
		}
	})
	currentPage.style.display = 'block';
}