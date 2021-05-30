var active_page = 1


function remove_bar() {
	var all_btns = document.querySelectorAll(".bar_line")
	all_btns.forEach(function(e) {
		e.remove()
		
	})
	var all_bt = document.querySelectorAll(".active_bt")
	all_bt.forEach(function(e) {
		e.classList.remove("active_bt")
	})
}

function add_bar(number_page) {
	let btn = document.querySelector(".btn_" + number_page.toString())
	if (btn) {
		var bar = document.createElement("div")
		bar.className = "bar_line"
		btn.appendChild(bar)
		btn.classList.add("active_bt")
	}
}

function remove_views() {
	let contac_pop_up = document.querySelector(".pop_up_view_show")
	if (contac_pop_up.style.display != "none") contac_pop_up.style.display = "none"
	
}

function change_page(page_number) {
	remove_bar()
	switch (page_number) {
		case 1:
			active_page = 1
			remove_views()
			add_bar(active_page)
			break 
		case 2:
			active_page = 2
			remove_views()
			add_bar(active_page)
			break
		case 3:
			active_page = 3
			remove_views()
			add_bar(active_page)
			break
	}
}

window.onload = function() {
	
	let btn_1 = document.querySelector(".btn_1")
	let btn_2 = document.querySelector(".btn_2")
	let btn_3 = document.querySelector(".btn_3")

	let contac_pop_up = document.querySelector(".pop_up_view_show")

	// home bt
	btn_1.addEventListener("click", function() {
		if (active_page != 1) {
			change_page(1)
		}
	})

	// contact bt
	btn_2.addEventListener("click", function() {
		if (active_page != 2) {
			change_page(2)
			contac_pop_up.style.display = "block"
		}
	})

	// portfolio bt
	btn_3.addEventListener("click", function() {
		if (active_page != 3) {
			change_page(3)
		}
	})

	let close_bt = document.querySelector("#pop_views_close_bt")

	close_bt.addEventListener("click", function() {
		contac_pop_up.style.display = "none"
		change_page(1)
	})

}