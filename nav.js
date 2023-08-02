const pageSections = document.querySelectorAll('section');
const nav = document.querySelector('nav');
const navBtns = document.querySelectorAll('nav a');

window.addEventListener('DOMContentLoaded', e => {
	if(sessionStorage.getItem('current page') == null){
		showSection('home');
	} else {
		showSection(getSectionClassName());
	}
})

nav.addEventListener('click', e => {
	let id = e.target.dataset.id;
	if(id == 'home')
	{
		hideAllSection();
		setSectionClassName(id);
		showSection(getSectionClassName());
	} else if(id == 'archive')
	{
		hideAllSection();
		setSectionClassName(id);
		showSection(getSectionClassName());
	}
})

function getSectionClassName()
{
	return sessionStorage.getItem('current page');
}

function setSectionClassName(name){
	sessionStorage.setItem('current page', name);
}

function hideAllSection(){
	pageSections.forEach(section => {
		section.style.display = 'none';
	})
}

function showSection(name){
	let currentPage;
	pageSections.forEach(section => {
		if(section.classList.contains(name)){
			currentPage = section;
		}
	})
	currentPage.style.display = 'block';
}