$(document).ready(()=>{
    function playSound() {
        var audio = document.getElementById("audio");
        audio.play();
      }
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

    move('1', '50px', '#ffcc80');
    switch2tab(1);

    $('#menu1').click(()=>{
        move('1', '50px', '#ffcc80');
        switch2tab(1);
    });

    $('#menu2').click(()=>{
        move('2', '150px', '#81d4fa')
        switch2tab(2);
        selectNumber();
    });
    
    $('#menu3').click(()=>{
        move('3', '250px', '#c5e1a5')
        switch2tab(3);
    });

    $('#menu4').click(()=>{
        move('4', '350px', '#ce93d8');
        switch2tab(4);
    });
    
      const { to, set, timeline } = gsap
    
    function validURL(str) {
        let pattern = new RegExp('^(https?:\\/\\/)?'+
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
            '((\\d{1,3}\\.){3}\\d{1,3}))'+
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
            '(\\?[;&a-z\\d%_.~+=-]*)?'+
            '(\\#[-a-z\\d_]*)?$','i')
        return !!pattern.test(str)
    }
    
    function delay(fn, ms) {
        let timer = 0
        return function(...args) {
            clearTimeout(timer)
            timer = setTimeout(fn.bind(this, ...args), ms || 0)
        }
    }
    
    document.querySelectorAll('.url-input').forEach(elem => {
        let icon = elem.querySelector('.icon'),
            favicon = icon.querySelector('.favicon'),
            clear = elem.querySelector('.clear'),
            input = elem.querySelector('input'),
            { classList } = elem,
            svgLine = clear.querySelector('.line'),
            svgLineProxy = new Proxy({
                x: null
            }, {
                set(target, key, value) {
                    target[key] = value
                    if(target.x !== null) {
                        svgLine.setAttribute('d', getPath(target.x, .1925))
                    }
                    return true
                },
                get(target, key) {
                    return target[key]
                }
            })
    
        svgLineProxy.x = 0
    
        input.addEventListener('input', delay(e => {
            let bool = input.value.length,
                valid = validURL(input.value)
            to(elem, {
                '--clear-scale': bool ? 1 : 0,
                duration: bool ? .5 : .15,
                ease: bool ? 'elastic.out(1, .7)' : 'none'
            })
            to(elem, {
                '--clear-opacity': bool ? 1 : 0,
                duration: .15
            })
            to(elem, {
                '--icon-offset': valid ? '24px' : '0px',
                duration: .15,
                delay: valid ? 0 : .2
            })
            if(valid) {
                if(favicon.querySelector('img')) {
                    favicon.querySelector('img').src = 'https://f1.allesedv.com/64/' + input.value
                    return
                }
                let img = new Image()
                img.onload = () => {
                    favicon.appendChild(img)
                    to(elem, {
                        '--favicon-scale': 1,
                        duration: .5,
                        delay: .2,
                        ease: 'elastic.out(1, .7)'
                    })
                }
                img.src = 'https://f1.allesedv.com/64/' + input.value
            } else {
                if(favicon.querySelector('img')) {
                    to(elem, {
                        '--favicon-scale': 0,
                        duration: .15,
                        onComplete() {
                            favicon.querySelector('img').remove()
                        }
                    })
                }
            }
        }, 250))
    
        clear.addEventListener('click', e => {
            classList.add('clearing')
            set(elem, {
                '--clear-swipe-left': (input.offsetWidth - 44) * -1 + 'px'
            })
            to(elem, {
                keyframes: [{
                    '--clear-rotate': '45deg',
                    duration: .25
                }, {
                    '--clear-arrow-x': '2px',
                    '--clear-arrow-y': '-2px',
                    duration: .15
                }, {
                    '--clear-arrow-x': '-3px',
                    '--clear-arrow-y': '3px',
                    '--clear-swipe': '-3px',
                    duration: .15,
                    onStart() {
                        to(svgLineProxy, {
                            x: 3,
                            duration: .1,
                            delay: .05
                        })
                    }
                }, {
                    '--clear-swipe-x': 1,
                    '--clear-x': (input.offsetWidth - 32) * -1 + 'px',
                    duration: .45,
                    onComplete() {
                        input.value = ''
                        input.focus()
                        if(favicon.querySelector('img')) {
                            to(elem, {
                                '--favicon-scale': 0,
                                duration: .15,
                                onComplete() {
                                    favicon.querySelector('img').remove()
                                }
                            })
                            to(elem, {
                                '--icon-offset': '0px',
                                '--icon-offset-line': '0px',
                                duration: .15,
                                delay: .2
                            })
                        }
                        to(elem, {
                            '--clear-arrow-offset': '4px',
                            '--clear-arrow-offset-second': '4px',
                            '--clear-line-array': '8.5px',
                            '--clear-line-offset': '27px',
                            '--clear-long-offset': '24px',
                            '--clear-rotate': '0deg',
                            '--clear-arrow-o': 1,
                            duration: 0,
                            delay: .7,
                            onStart() {
                                classList.remove('clearing')
                            }
                        })
                        to(elem, {
                            '--clear-opacity': 0,
                            duration: .2,
                            delay: .55
                        })
                        to(elem, {
                            '--clear-arrow-o': 0,
                            '--clear-arrow-x': '0px',
                            '--clear-arrow-y': '0px',
                            '--clear-swipe': '0px',
                            duration: .15
                        })
                        to(svgLineProxy, {
                            x: 0,
                            duration: .45,
                            ease: 'elastic.out(1, .75)'
                        })
                    }
                }, {
                    '--clear-swipe-x': 0,
                    '--clear-x': '0px',
                    duration: .4,
                    delay: .35
                }]
            })
            to(elem, {
                '--clear-arrow-offset': '0px',
                '--clear-arrow-offset-second': '8px',
                '--clear-line-array': '28.5px',
                '--clear-line-offset': '57px',
                '--clear-long-offset': '17px',
                duration: .2
            })
        })
    })
    
    function getPoint(point, i, a, smoothing) {
        let cp = (current, previous, next, reverse) => {
                let p = previous || current,
                    n = next || current,
                    o = {
                        length: Math.sqrt(Math.pow(n[0] - p[0], 2) + Math.pow(n[1] - p[1], 2)),
                        angle: Math.atan2(n[1] - p[1], n[0] - p[0])
                    },
                    angle = o.angle + (reverse ? Math.PI : 0),
                    length = o.length * smoothing;
                return [current[0] + Math.cos(angle) * length, current[1] + Math.sin(angle) * length];
            },
            cps = cp(a[i - 1], a[i - 2], point, false),
            cpe = cp(point, a[i - 1], a[i + 1], true);
        return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
    }
    
    function getPath(x, smoothing) {
        return [
            [2, 2],
            [12 - x, 12 + x],
            [22, 22]
        ].reduce((acc, point, i, a) => i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${getPoint(point, i, a, smoothing)}`, '')
    }
    

});
