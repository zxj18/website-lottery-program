function selectNumber(start,end){
    let tl = gsap.timeline()

    // start at exactly 1 second into the timeline (absolute)
    tl.add(gsap.fromTo("div.number-container", { y: -50*6},{y:-50*5, duration: 1,ease:"elastic.in(1,1)" }));
    tl.add(gsap.to("div.number-container", {y:50*5, duration: 3 }));
    tl.add(gsap.to("div.number-container", {y:50*6, duration: 1,ease:"elastic.in(1,1)" }));
    //tl.fromTo("#test", { x: [200,100], duration: 2,ease:"elastic.in(1,1)" });
}

$(document).ready(()=>{
    for(var i=0;i<10;i++){
        $("div.number-container").append(`<div class='number'>${i}</div>`);
    }
});