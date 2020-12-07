

window.addEventListener('DOMContentLoaded',function(){

    
    var aboutAll = document.querySelectorAll(".quote__link");

    aboutAll.forEach(function(el){
        el.addEventListener("click",function(e){
            e.preventDefault();
            localStorage.page = this.dataset.name;
            location.href = 'index_menu.html';
        })
    })


})
