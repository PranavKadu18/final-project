
function scroll()
{
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

function loadanimation()
{
    var tl = gsap.timeline()

    tl.from(".line #counter h4",{
        opacity : 0,
        onStart : function(){
            var inc = document.querySelector("#counter h4 span");

            var count = 0;
            var counter = setInterval(function(){
                count++;
                inc.textContent = count;
                if(count == 100) clearInterval(counter);
            },40)
        }
    })

    tl.from(".line h1",{
        y : 100,
        opacity : 0,
        delay : 0.4,
        duration : 0.4,
        stagger : 0.4
    })

    tl.to("#loader",{
        delay : 4.1,
        duration : 0.4,
        opacity : 0
    })

    tl.from("#page1",{
        y : 1600,
        ease : Power4,
        opacity : 0,
        duration : 1
    })

    tl.to("#main",{
        backgroundColor : "#151515"
    })

    tl.from("#nav",{
        opacity : 0
    })

    tl.from(".herotext h1,#num h1",{
        opacity : 0,
        y : 100,
        stagger : 0.1
    })

    tl.to("#loader",{
        display : "none"
    })

    tl.from("#page2",{
        opacity : 0
    })
    

}

function page1()
{
    if(!isMobileDevice){
        Shery.mouseFollower({
            skew: true,
            ease: "cubic-bezier(0.23, 1, 0.320, 1)",
            duration: 1,
        });
    }

    if(!isMobileDevice){
        Shery.makeMagnet("#work", {});
        Shery.makeMagnet("#contacts", {});
        Shery.makeMagnet("#about", {});
    }

    
    var mover = document.querySelector("#mover");
    var left = document.querySelector("#one");
    var right = document.querySelector("#two");


    left.addEventListener("mouseenter",function(){
        mover.style.opacity = 1;
        
        left.addEventListener("mousemove",function(data){
            gsap.to("#mover",{
                x : data.x + "px",
                y : data.y + "px"
            })
        })
        
    })

    right.addEventListener("mouseenter",function(){
        mover.style.opacity = 1;
        
        right.addEventListener("mousemove",function(data){
            gsap.to("#mover",{
                x : data.x + "px",
                y : data.y + "px"
            })
        })
        
    })

    left.addEventListener("mouseleave",function(){
        mover.style.opacity = 0;
    })

    right.addEventListener("mouseleave",function(){
        mover.style.opacity = 0;
    })
    
}

function Sheryanimation()
{
    if(!isMobileDevice){
        Shery.imageEffect(".img-div", {
            style: 6,
            config: {"noiseDetail":{"value":7.44,"range":[0,100]},"distortionAmount":{"value":2.98,"range":[0,10]},"scale":{"value":36.36,"range":[0,100]},"speed":{"value":0.56,"range":[0,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.8166737346466146},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.49,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.69,"range":[0,10]},"metaball":{"value":0.37,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}}, 
            gooey: true,
        });
    }
}

function videoanime()
{
    var vidbox = document.querySelector("#vidholder");
    var crsr = document.querySelector(".mousefollower");
    var video = document.querySelector("#vidholder video");
    var img = document.querySelector("#vidholder img");
    var control = document.querySelector("#imgcrsr");

    var flag = 1;

    function interaction(){
        if(flag == 1)
        {
            gsap.to("#imgcrsr",{
                scale : 0.5,
            })
    
            control.innerHTML = `<i class="ri-pause-mini-line"></i>`
            
            img.style.opacity = 0;
            video.style.opacity = 1;
            video.play();

            flag = 0;
        }
        else{
            gsap.to("#imgcrsr",{
                scale : 1,
            })
    
            control.innerHTML = `<i class="ri-play-mini-line"></i>`
            
            img.style.opacity = 1;
            video.style.opacity = 0;
            video.pause();

            flag = 1;
        }
    }

    vidbox.addEventListener("click",interaction)
    vidbox.addEventListener("touchstart",interaction)

    vidbox.addEventListener("mouseenter",function(){
        crsr.style.opacity = 0;

        vidbox.addEventListener("mousemove",function(data){
            gsap.to("#imgcrsr",{
                left : data.x - 400,
                y : data.y - 100,
            })
        })
    })

    vidbox.addEventListener("mouseleave",function(){
        crsr.style.opacity = 1;

        gsap.to("#imgcrsr",{
            top : -10 + "vh",
            left : 55 + "vw"
        })
    })
}

function textanimation()
{
    var ta = gsap.timeline();
    var txt = document.querySelector("#page6content h1");
    var svg = document.querySelector("#page6content svg")

    txt.addEventListener("mouseenter",function(){
        svg.style.opacity = 0;
        ta.to("#page6content h1",{
            onStart : function(){
                $('#page6content h1').textillate({ in: { effect: 'fadeIn' } });
                txt.style.fontFamily = "silkserif";
            }
        })

        ta.to("#page6content svg",{
            opacity : 1,
        })

    })

    txt.addEventListener("mouseenter",function(){
        ta.from("#arrow svg",{
            x : -100
        })
    })

}

function borderanimation()
{
    var a = gsap.timeline();

    a.to("#page3 .border",{
        width : "100%",
        scrollTrigger : {
            trigger : "#page3 .border",
            scroller : "#main",
            start : "top 90%",
            scrub : true
        }
    })

    a.to("#page4 .border",{
        width : "100%",
        scrollTrigger : {
            trigger : "#page4 .border",
            scroller : "#main",
            start : "top 90%",
            scrub : true
        }
    })

    

    a.to("#page6 .border",{
        width : "100%",
        scrollTrigger : {
            trigger : "#page6 .border",
            scroller : "#main",
            start : "top 90%",
            scrub : true
        }
    })
}


scroll();
loadanimation();
page1();
Sheryanimation();
videoanime();
textanimation();
borderanimation();





