const botonNext =  document.querySelector('.next')
const botonPrevious = document.querySelector('.previous')
const container = document.querySelector('.container-mas-vendidos');

function slide(direction){
    scrollCompleted = 0;
    let slideVar = setInterval(function(){
        if(direction == 'left'){
            container.scrollLeft -= 10;
        } else {
            container.scrollLeft += 10;
        }
        scrollCompleted += 10;
        console.log(scrollCompleted)
        if(scrollCompleted >= 100){
            window.clearInterval(slideVar);
        }
    }, 35);
}

botonNext.addEventListener('click', ()=> {
    console.log('hi')
    let slideRight = event.target.value
    console.log(slideRight)
    slide(slideRight)
})

botonPrevious.addEventListener('click', ()=> {
    console.log('hi')
    let slideLeft = event.target.value
    console.log(slideLeft)
    slide(slideLeft)
})