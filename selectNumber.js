function getRandomNumber(a, b) {
    // 根据 a 和 b 的大小顺序，确定较小值和较大值
    var min = Math.min(a, b);
    var max = Math.max(a, b);
  
    // 生成介于 min 和 max 之间的随机数
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    
    return randomNumber;
}
function createAnimation(tl,node,h,n,startTime){
    //不停的从0滚动到9,反复这个过程.给人感觉就是一个滚筒在不停滚动.
    tl.fromTo(node, { y: -h/2+h*(5-0)},{y:-h/2+h*(5-9), duration: 1,ease:"elastic.in(1,1)" },startTime);
    startTime+=1
    for(var i=0;i<3;i++){        
        tl.fromTo(node, { y: -h/2+h*(5-0)},{y:-h/2+h*(5-9),ease:Linear.easeNone, duration: 1 },startTime);
        startTime+=1;      
    }
    tl.fromTo(node, { y: -h/2+h*(5-0)},{y:-h/2+h*(5-n),ease:"back.out" , duration: 2},startTime);
    startTime+=2;
    return startTime;
}
function selectNumber(start,end){
    var target=getRandomNumber(start,end)+'';
    let tl = gsap.timeline()

    var numbers=[target[0]-0,target[1]-0,target[2]-0];
    
    console.log(numbers);

    var rect=$("div.number")[0].getBoundingClientRect();
    console.log(rect);
    var h=rect.height; //h为单个数字的高度

    animating=true;
    for(var i=0;i<3;i++){
        createAnimation(tl,`div.number-container${i+1}`,h,numbers[i],i*0.5);
    }
    tl.to('#nothing',{duration:0.5,x:0,onComplete:()=>{
        animating=false;
    }});

}

$(document).ready(()=>{
    for(var i=0;i<10;i++){
        $("div.number-container1").append(`<div class='number'>${i}</div>`);
        $("div.number-container2").append(`<div class='number'>${i}</div>`);
        $("div.number-container3").append(`<div class='number'>${i}</div>`);
    }
});