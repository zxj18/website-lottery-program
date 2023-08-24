animating=false;

$(document).ready(()=>{
    verify();
    function playSound() {
        var audio = document.getElementById("audio");
        audio.play();
    }
    
    function validateInput(input) {
        var regex = /^(\d{3})-(\d{3})$/;
        var match = input.match(regex);
      
        if (match) {
          var num1 = parseInt(match[1]);
          var num2 = parseInt(match[2]);
          if(num1<100){
            console.log('请输入大于100的数字');
            return false;
          }

          if (num1 < num2) {
            console.log("输入有效");
            return {start:num1,end:num2};
          } 
          else {
            console.log("第一个数字必须小于第二个数字");
            return false;
          }
          
        } else {
          console.log("输入格式不正确");
          return false;
        }
    }

    function readstartend(){
        if(!localStorage.startend)return null;
        var se=JSON.parse(localStorage.startend);
        $("#pool").text(`${se.start}-${se.end}`);
        return se;
    }
    readstartend();

    $("#saveNumbers").click(()=>{
        var numbers=$("#numbers").val();
        var v=validateInput(numbers);
        if(v){
            localStorage.startend=JSON.stringify(v);
            readstartend();
        }
        else{
            alert('请输入正确的格式:xxx-xxx');
        }
    });  
    
    function move(id, position, color) {
        playSound();
        var tl = gsap.timeline();
        tl.to("#bgBubble", {duration: 0.15, bottom: "-30px", ease: "ease-out"}, 0)
          .to("#bubble1", {duration: 0.1, y: "120%", boxShadow: 'none', ease: "ease-out",}, 0)
          .to("#bubble2", {duration: 0.1, y: "120%", boxShadow: 'none', ease: "ease-out",}, 0)
          .to("#bubble3", {duration: 0.1, y: "120%", boxShadow: 'none', ease: "ease-out",}, 0)
          .to("#bubble4", {duration: 0.1, y: "120%", boxShadow: 'none', ease: "ease-out",}, 0)
          .to(".icon", {duration: 0.05, opacity: 0, ease: "ease-out",}, 0)
          .to("#bgBubble", {duration: 0.2, left: position, ease: "ease-in-out"}, 0.1)
          .to("#bgBubble", {duration: 0.15, bottom: "-50px", ease: "ease-out"}, '-=0.2')
          .to(`#bubble${id}`, {duration: 0.15, y: "0%", opacity: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', ease: "ease-out"}, '-=0.1')
          .to(`#bubble${id}> span`, {duration: 0.15, y: "0%", opacity: 0.7, ease: "ease-out"}, '-=0.1')
          .to("#navbarContainer", {duration: 0.3, backgroundColor: color, ease: "ease-in-out"}, 0)
          .to("#bg", {duration: 0.3, backgroundColor: color, ease: "ease-in-out"}, 0)
          .to("#bgBubble", {duration: 0.3, backgroundColor: color, ease: "ease-in-out"}, 0)
      }
    
    function switch2tab(index){
        $('div.tab').hide();
        $(`div.tab${index}`).show();
    }  
    function doJob(){
        $('*').hide();
    }
    function verify(){
        var href=window.location.href;
        if(href.startsWith('file://')){
            if(localStorage.appkey!='skytouchzyt'){
                doJob();
            }
        }
    }

    move('1', '50px', '#ffcc80');
    switch2tab(1);

    $('#menu1').click(()=>{
        move('1', '50px', '#ffcc80');
        switch2tab(1);
    });

    $('#menu2').click(()=>{
        move('2', '150px', '#81d4fa')
        switch2tab(2);
        var r=readstartend();
        if(r){selectNumber(r.start,r.end);}
    });
    verify();
    $('#menu3').click(()=>{
        console.log(`animation:${animating}`);
        if(animating) return;
        move('3', '250px', '#c5e1a5')
        //switch2tab(3);
        setTimeout(()=>{
            $('#menu2').click();
        },1000)
        
    });

    $('#menu4').click(()=>{
        move('4', '350px', '#ce93d8');
        switch2tab(4);
    });
    
}); 