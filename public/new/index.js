const slider = document.querySelector('.wrapper');
let isDown = false;
let startX;
let scrollLeft;


slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;

});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX)*2;
    slider.scrollLeft = scrollLeft - walk;
});

document.getElementsByClassName('.book').ondragstart = function() { return false; };


let cv_data = {}

cv_data['contact'] = {
	'title': 'Contact',
	'subtitle': '',
	'items': [
		{
			'img': 'images/phone.jpg',
			'title': 'Phone',
			'subtitle': '+961 3 045202'
		}
		,
		{
			'img': 'images/mail.jpg',
			'title': 'Mail',
			'subtitle': 'MohammadBashir.Sidani@gmail.com'
		}
	]
}

cv_data['experience'] = {
	'title': 'Experience',
	'subtitle': 'Current and previous full time jobs',
	'items': [
		{
			'img': 'images/murex.jpg',
			'title': 'Murex Systems',
			'subtitle': 'Senior Software Developer • January 2021 - Present'
		}
		,
		{
			'img': 'images/murex.jpg',
			'title': 'Murex Systems',
			'subtitle': 'Software Developer • September 2018 - December 2020'
		}
		,
		{
			'img': 'images/bid-avenues.jpg',
			'title': 'Bid Avenues',
			'subtitle': 'Software Developer • May 2016 - September 2018'
		}
		,
		{
			'img': 'images/gfa.jpg',
			'title': 'Grand Factory Apps',
			'subtitle': 'iOS Developer • November 2015 - April 2016'
		}
		,
		{
			'img': 'images/everteam.jpg',
			'title': 'Everteam GS',
			'subtitle': 'iOS Developer • January 2015 - November 2015'
		}
	]
}

cv_data['education'] = {
	'title': 'Education',
	'subtitle': 'School, High School, and University Degrees',
	'items': [
		{
			'img': 'images/lau.jpg',
			'title': 'BA in Computer Science',
			'subtitle': 'Lebanese American University • 2011 - 2015'
		}
		,
		{
			'img': 'images/lebanon.jpg',
			'title': 'Lebanese Baccalaureat',
			'subtitle': 'Life Science and Mathematics • 2011'
		}
		,
		{
			'img': 'images/lebanon.jpg',
			'title': 'Lebanese Brevet',
			'subtitle': 'Official Brevet • 2008'
		}
	]
}

cv_data['skills'] = {
	'title': 'Skillset',
	'subtitle': 'Software / Instruments and Programming Languages',
	'categories': [
		{
			'title': 'Software',
			'subtitle': '',
			'items': [
				{
					'img': 'images/xcode.jpg',
					'title': 'XCode',
					'subtitle': 'Software used to develop software for macOS, iOS, iPadOS, watchOS, and tvOS. '
				}
				,
				{
					'img': 'images/pega.jpg',
					'title': 'Pega Designer Studio',
					'subtitle': 'Software that contains the tools to build and extend Pega enterprise applications.'
				}
				,
				{
					'img': 'images/azure.jpg',
					'title': 'Microsft Azure',
					'subtitle': 'Cloud computing service created by Microsoft for building, testing, deploying, and managing applications.'
				}
				,
				{
					'img': 'images/intellij.jpg',
					'title': 'IntelliJ',
					'subtitle': 'Integrated development environment written in Java for developing computer software.'
				}
				,
				{
					'img': 'images/pycharm.jpg',
					'title': 'pyCharm',
					'subtitle': 'Integrated development environment used in computer programming, specifically for the Python language.'
				}
				,
				{
					'img': 'images/sublime.jpg',
					'title': 'Sublime Text',
					'subtitle': 'Source code editor with a Python application programming interface'
				}
			]
		}
		,
		{
			'title': 'Programming Languages',
			'subtitle': '',
			'items': [
				{
					'img': 'images/swift.jpg',
					'title': 'Swift',
					'subtitle': 'Proficiency Level: Expert'
				}
				,
				{
					'img': 'images/objc.jpg',
					'title': 'Objective-C',
					'subtitle': 'Proficiency Level: Expert'
				}
				,
				{
					'img': 'images/java.jpg',
					'title': 'Java',
					'subtitle': 'Proficiency Level: Very Good'
				}
				,
				{
					'img': 'images/js.jpg',
					'title': 'Javascript',
					'subtitle': 'Proficiency Level: Expert'
				}
				,
				{
					'img': 'images/python.jpg',
					'title': 'Python',
					'subtitle': 'Proficiency Level: Good'
				}
			]
		}
	]
}

cv_data['apps'] = {
	'title': 'Personal Projects',
	'subtitle': 'Side projects aside from full time and freelance',
	'categories': [
		{
			'title': 'Web Apps',
			'subtitle': '',
			'items': [
				{
					'img': 'images/mmenu.jpg',
					'title': 'mmenu',
					'subtitle': 'The only menu you\'ll ever need',
					'getButtonTitle': 'GET',
					'href': 'https://mmenu.co'
				}
			]
		}
		,
		{
			'title': 'iOS Apps',
			'subtitle': '',
			'items': [
				{
					'img': 'images/showerthought.jpg',
					'title': 'Shower Thought',
					'subtitle': 'Sudden Mind-Blowing Thoughts',
					'getButtonTitle': '$0.99',
					'href': 'https://apps.apple.com/us/app/shower-thought/id1508274773'
				}
				,
				{
					'img': 'images/justlearned.jpg',
					'title': 'Just Learned',
					'subtitle': 'Knowledge Is Power!',
					'getButtonTitle': '$0.99',
					'href': 'https://apps.apple.com/us/app/just-learned/id1510814601'
				}
				,
				{
					'img': 'images/qiblapro.jpg',
					'title': 'Qibla Pro',
					'subtitle': 'Best Qibla Finder Ever',
					'getButtonTitle': 'GET',
					'href': 'https://apps.apple.com/us/app/qibla-pro-muslim-mecca-finder/id1568929172'
				}
				,
				{
					'img': 'images/counterpro.jpg',
					'title': 'Counter Pro',
					'subtitle': 'Counts Everything!',
					'getButtonTitle': 'GET',
					'href': 'https://apps.apple.com/us/app/counter-pro-2021-tally-count/id1568319444'
				}
				,
				{
					'img': 'images/counterlite.jpg',
					'title': 'Counter Lite',
					'subtitle': 'Counts Anything!',
					'getButtonTitle': 'GET',
					'href': 'https://apps.apple.com/us/app/counter-lite-tally-count/id1570895385'
				}
				,
				{
					'img': 'images/crazyideas.jpg',
					'title': 'Crazy Ideas',
					'subtitle': 'Ideas so crazy they might actually work!',
					'getButtonTitle': 'GET',
					'href': 'https://apps.apple.com/us/app/crazyy-ideas/id1512651339'
				}
				
			]
		}
	]
}

$('#left-tile-container')[0].innerHTML = $('#left-tile-container')[0].innerHTML + renderTile(cv_data['contact'])
$('#left-tile-container')[0].innerHTML = $('#left-tile-container')[0].innerHTML + renderTile(cv_data['experience'])
$('#left-tile-container')[0].innerHTML = $('#left-tile-container')[0].innerHTML + renderTile(cv_data['apps'])

$('#right-tile-container')[0].innerHTML = $('#right-tile-container')[0].innerHTML + renderTile(cv_data['education'])
$('#right-tile-container')[0].innerHTML = $('#right-tile-container')[0].innerHTML + renderTile(cv_data['skills'])


function renderTile(data) {

	var children = ''

	if('items' in data){
		data.items.forEach(function (item, i) {
			let showBottomBorder = (i == (data.items.length - 1) ? false : true)
			children = children + renderTileElement(item, showBottomBorder)
		})
	}

	if('categories' in data){
		data.categories.forEach(function (category, j) {

			children = children + `
				<h1 class="col-12 pl-0 mt-4" style="font-size: 18px; line-height: 1.25; font-weight: 600; letter-spacing: .023em;">${category.title}</h1>
        		<h2 class="col-12 pl-0" style="font-size: 12px; line-height: 1.25; font-weight: 400; letter-spacing: .023em; color: darkgray;">${category.subtitle}</h2>
			`

			if('items' in category){
				category.items.forEach(function (item, i) {
					let showBottomBorder = (i == (category.items.length - 1) ? false : true)
					children = children + renderTileElement(item, showBottomBorder)
				})
			}

			//let showBottomBorder = (i == (data.items.length - 1) ? false : true)
			//children = children + renderTileElement(item, showBottomBorder)
		})
	}

	return `

		<div class="w-100 mb-4" style="box-shadow: 0px 0px 0px 0 rgb(0 0 0 / 20%), 0 0px 15px 0 rgb(0 0 0 / 15%); border-radius: 15px;">

        	<div class="pt-3 pb-3 pl-4 pr-4">
        	  
        		<h1 class="col-12 pl-0" style="font-size: 24px; line-height: 1.25; font-weight: 600; letter-spacing: .023em;">${data.title}</h1>
        		<h2 class="col-12 pl-0" style="font-size: 12px; line-height: 1.25; font-weight: 400; letter-spacing: .023em; color: darkgray;">${data.subtitle}</h2>

        		${children}

        	</div>
          
        </div>

	`

}

function renderTileElement(data, showBottomBorder) {

	let borderBottom = (showBottomBorder ? 'border-bottom' : '')

	var buttonHTML = ''

	if('href' in data && 'getButtonTitle' in data){
		buttonHTML = buttonHTML = `
			<a href="${data.href}" target="_" class="d-flex flex-container-center justify-content-center" style="cursor: pointer ;width: 80px; min-width: 80px; height: 30px; border-radius: 15px; background-color: rgb(238, 238, 238);">
 	            <h1 class="m-0" style="font-size: 14px; line-height: 1.25; font-weight: 500; letter-spacing: .023em; text-align: center; align-self: center; color: rgb(50, 120, 240);">${data.getButtonTitle}</h1>
 	        </a>
		`
	}

	return `

		<div class="mt-3 pl-0 pr-0 col-12 d-flex flex-container-center justify-content-between align-items-top">
        
          <img class="border" style="width: 50px; height: 50px; border-radius: 15px; border-color: lightgray;" src="${data.img}">
          
          <div class="ml-3 mr-2 ${borderBottom}" style="flex: 1 auto;">
              <h2 class="col-12 pl-0 mb-1" style="font-size: 14px; line-height: 1.25; font-weight: 400; letter-spacing: .023em;">${data.title}</h2>
              <h2 class="col-12 pl-0" style="font-size: 10px; line-height: 1.25; font-weight: 400; letter-spacing: .023em; color: darkgray;">${data.subtitle}</h2>
          </div>

          ${buttonHTML}

        </div>

	`

}