--easing function cheatsheet
--by valeradhd
--curves
--these will all return values
--near the range 0->1 when given
--values in the range 0->1
--you can easily pass them 
--into a 'lerp' (linear interpolate) 
--with these functions modifying 
--the 't' value.
--copying:
--every function is completely
--self sufficient, which
--increases the total number of
--tokens but allows you to pick
--and choose which functions to
--take, with no problems.
--(i.e. just don't take
--the linear function, it does 
--nothing)
--
--crediting:
--include a link to the
--bbs page for this demo
--whenever you paste in your
--functions, so that
--anyone reading your code can
--find this as well.
--if you want to include my
--username you can, but i can't
--claim full credit for these
--functions so you don't have to.

function linear(t)
    return t
end

--quadratics
function easeinquad(t)
    return t*t
end

function easeoutquad(t)
    t-=1
    return 1-t*t
end

function easeinoutquad(t)
    if(t<.5) then
        return t*t*2
    else
        t-=1
        return 1-t*t*2
    end
end

function easeoutinquad(t)
    if t<.5 then
        t-=.5
        return .5-t*t*2
    else
        t-=.5
        return .5+t*t*2
    end
end

--quartics
function easeinquart(t)
    return t*t*t*t
end

function easeoutquart(t)
    t-=1
    return 1-t*t*t*t
end

function easeinoutquart(t)
    if t<.5 then
        return 8*t*t*t*t
    else
        t-=1
        return (1-8*t*t*t*t)
    end
end

function easeoutinquart(t)
    if t<.5 then
        t-=.5
        return .5-8*t*t*t*t
    else
        t-=.5
        return .5+8*t*t*t*t
    end
end

--overshooting functions
function easeinovershoot(t)
    return 2.7*t*t*t-1.7*t*t
end

function easeoutovershoot(t)
    t-=1
    return 1+2.7*t*t*t+1.7*t*t
end

function easeinoutovershoot(t)
    if t<.5 then
        return (2.7*8*t*t*t-1.7*4*t*t)/2
    else
        t-=1
        return 1+(2.7*8*t*t*t+1.7*4*t*t)/2
    end
end

function easeoutinovershoot(t)
    if t<.5 then
        t-=.5
        return (2.7*8*t*t*t+1.7*4*t*t)/2+.5
    else
        t-=.5
        return (2.7*8*t*t*t-1.7*4*t*t)/2+.5
    end
end

--elastics
function easeinelastic(t)
    if(t==0) return 0
    return 2^(10*t-10)*cos(2*t-2)
end

function easeoutelastic(t)
    if(t==1) return 1
    return 1-2^(-10*t)*cos(2*t)
end

function easeinoutelastic(t)
    if t<.5 then
        return 2^(10*2*t-10)*cos(2*2*t-2)/2
    else
        t-=.5
        return 1-2^(-10*2*t)*cos(2*2*t)/2
    end
end

function easeoutinelastic(t)
    if t<.5 then
        return .5-2^(-10*2*t)*cos(2*2*t)/2
    else
        t-=.5
        return 2^(10*2*t-10)*cos(2*2*t-2)/2+.5
    end
end

--bouncing
function easeinbounce(t)
    t=1-t
    local n1=7.5625
    local d1=2.75
   
    if (t<1/d1) then
        return 1-n1*t*t;
    elseif(t<2/d1) then
        t-=1.5/d1
        return 1-n1*t*t-.75;
    elseif(t<2.5/d1) then
        t-=2.25/d1
        return 1-n1*t*t-.9375;
    else
        t-=2.625/d1
        return 1-n1*t*t-.984375;
    end
end

function easeoutbounce(t)
    local n1=7.5625
    local d1=2.75
   
    if (t<1/d1) then
        return n1*t*t;
    elseif(t<2/d1) then
        t-=1.5/d1
        return n1*t*t+.75;
    elseif(t<2.5/d1) then
        t-=2.25/d1
        return n1*t*t+.9375;
    else
        t-=2.625/d1
        return n1*t*t+.984375;
    end
end

--other useful functions:
--(linear interpolation between a/b)
function lerp(a,b,t)
    return a+(b-a)*t
end

--(finds the t value that would
--return v in a lerp between a/b)
function invlerp(a,b,v)
    return (v-a)/(b-a)
end
-->8
function _init()
    currentcurve=1
    mode="select"
    scroll=0
end

function _draw()
    if(mode=="curve") drawcurve()
    if(mode=="select") drawselect()
end

function drawcurve()
--    if(t()==2.8)extcmd('rec')
--    if(t()==5.6)extcmd('video')
    cls(1)
    rectfill(0,0,128,6,8)
    local curve=curves[currentcurve]
    local ease=curve.func
    local label="⬅️ "..curve.name.." ➡️  "
    local eq=curve.eq
    rectfill(40,9,88,57,3)
    draw_graph(
        40,9,48,48,
        0,1,"t",7,
        curve.low,curve.high,"output",7,
        label,7,
        ease,11
    )
    local t=mid(0,t()/2%1.4-.2,1)
    print("t:",1,76,7)
    print(0,6,70,7)
    print(1,119,70,7)
    line(8,78,lerp(8,120,t),78,12)
    line(120,78,lerp(8,120,t),78,13)
    pset(lerp(8,120,t),78,7)
    rectfill(4,81,124,88,2)
    circfill(
        lerp(8,120,ease(t)),
        85,3,8)
    rectfill(4,91,124,126,2)
    local w=lerp(2,14,ease(t))
    rectfill(36-w,109-w,
        36+w,109+w,8)
    local d=ease(t)
    line(92+cos(d)*12,109+sin(d)*12,
        92-cos(d)*12,109-sin(d)*12,7)
    printequation(eq,
        64-formattedlen(eq)*2,68,
        7)
    print("❎",119,1,7)
end

function drawselect()
    cls(1)
    for i=0,#curves-1 do
        local curve=curves[i+1]
        local x,y=i%3*42+2,i\3*48+9-scroll
        clip(x,0,39,128)
        rectfill(x,y+1,x+38,y+39,3)
        draw_graph(
            x,y,38,38,
            0,1,"",7,
            curve.low,curve.high,"",7,
            "",7,
            curve.func,11
        )
        clip()
        if i+1==currentcurve then
            rect(x-2,y-1,x+40,y+47,13)
            print("🅾️",x+16,y+41,btn(🅾️) and 13 or 7)
            print("⬅️",x+8,y+41,btn(⬅️) and 13 or 7)
            print("➡️",x+24,y+41,btn(➡️) and 13 or 7)
        end
    end
    camera()
    rectfill(0,0,128,6,8)
    name=curves[currentcurve].name
    print(name,
        64-#(name)*2,1,
        7)
    print("made by @valeradhd",28,ceil(#curves/3)*42+64-scroll)
end

function _update60()
    if(btnp(⬅️)) currentcurve-=1
    if(btnp(➡️)) currentcurve+=1
    if(btnp(⬆️) and currentcurve>3) currentcurve-=3
    if(btnp(⬇️) and currentcurve<=#curves-3) currentcurve+=3
    if(btn(🅾️)) mode="curve"
    if(btn(❎)) mode="select"
    currentcurve=mid(1,currentcurve,#curves)
    if(abs((currentcurve-1)\3*48+9-scroll-40)>.3) then
        --ironically not using the easing methods
        scroll=lerp(scroll,(currentcurve-1)\3*48-31,.1)
    end
    scroll=max(-.5,scroll)
end


-->8
--drawing utilities
function draw_graph(
    x,y,w,h,
    xlow,xhigh,xlabel,xcol,
    ylow,yhigh,ylabel,ycol,
    label,labelcol,
    func,funccol
)
    ylow=ylow or 0
    yhigh=yhigh or 1
    --change coordinates so that
    --0,0 is at the bottom left of
    --the graph.
    camera(-x,-y-h)
   
    --dashed line at y=1
    local oney=invlerp(ylow,yhigh,1)*h
    dashline(0,-oney,w,-oney)
   
    --graph of the function
    local lval=0
    for t=0,w do
        local val=(func(t/w*(xhigh-xlow))-ylow)/(yhigh-ylow)*h
        rectfill(t,-lval,t,-val,funccol)
        lval=val
    end
    --y axis, negative to account
    --for pico-8's y down screen
    line(0,0,0,-h,ycol)
    print(ylabel,
        -#ylabel*4,-h/2,
        labelcol)
    print(ylow,
        -#tostr(ylow)*4,-2,
        labelcol)
    print(yhigh,
        -#tostr(yhigh)*4,-h-2,
        labelcol)
    print(1,-4,-oney-2,labelcol)
    --x axis
    if ylow!=0 then
        local zeroy=invlerp(ylow,yhigh,0)*h
        line(0,-zeroy,w,-zeroy,7)
        print("0",-4,-zeroy-3,labelcol)
    else
        line(0,0,w,0,xcol)
    end
    print(xlabel,
        w/2-#xlabel*2,2,
        labelcol)
    print(xlow,
        0,2,
        labelcol)
    print(xhigh,
        w-#tostr(xhigh)*2,2,
        labelcol)
    --graph label
    print(label,
        w/2-#label*2,-h-8,
        labelcol)
   
    camera()
end

function printshadow(text,
    x,y,
    col,shadowcol,
    shadowdist
)
    x=x or 0
    y=y or 0
    col=col or 6
    shadowcol=shadowcol or 13
    shadowdist=shadowdist or 1
    print(text,
        x+shadowdist,y+shadowdist,
        shadowcol)
    print(text,
        x,y,
        col)
end

function printsmall(text,x,y,col)
    if(type(text)!="string")text=tostring(text)
    pal(6,col)
    local cx,cy=x,y
    for i=1,#text do
        local char=ord(text,i)
        if char>=ord('0') and char<=ord('9') then
            spr(char-ord('0')+32,cx,cy)
        elseif char>=ord('a') and char<=ord('z') then
            spr(char-ord('a'),cx,cy)
        else
            print(chr(char),cx,cy,6)
        end
        cx+=4
    end
    pal()
end

function printequation(text,x,y,col)
    local parts=split(text,"^",false)
    local cx,cy=x,y
    for i=1,#parts do
        if i%2==1 then
            print(parts[i],cx,cy,col)
            cx+=#parts[i]*4
        else
            printsmall(parts[i],cx,cy-2,col)
            cx+=#parts[i]*4
        end
    end
end

function formattedlen(text)
    local parts=split(text,"^",false)
    local len=0
    for str in all(parts) do
        len+=#str
    end
    return len
end

curves={
    {
        name="linear",
        func=linear,
        eq="f(t)=t"
    },
    {
        name="ease in quadratic",
        func=easeinquad,
        eq="f(t)=t^2^"
    },
    {
        name="ease out quadratic",
        func=easeoutquad,
        eq="f(t)=1-(t-1)^2^"
    },
    {
        name="ease in/out quadratic",
        func=easeinoutquad,
        eq="(piecewise)"
    },
    {
        name="ease in quartic",
        func=easeinquart,
        eq="f(t)=t^4^"
    },
    {
        name="ease out quartic",
        func=easeoutquart,
        eq="f(t)=1-(t-1)^4^"
    },
    {
        name="ease in/out quartic",
        func=easeinoutquart,
        eq="(piecewise)"
    },
    {
        name="ease in overshoot",
        func=easeinovershoot,
        eq="f(t)=2.7t^3^-1.7t^2^",
        low=-.1
    },
    {
        name="ease out overshoot",
        func=easeoutovershoot,
        eq="f(t)=1-2.7(t-1)^3^+1.7(t-1)^2^",
        high=1.2
    },
    {
        name="ease in/out overshoot",
        func=easeinoutovershoot,
        eq="(piecewise)",
        high=1.18,
        low=-.13
    },
    {
        name="ease in elastic",
        func=easeinelastic,
        eq="f(t)=2^10t-10^cos(2t-2)",
        low=-.23
    },
    {
        name="ease out elastic",
        func=easeoutelastic,
        eq="f(t)=1-2^10t^cos(2t)",
        high=1.27
    },
    {
        name="ease in/out elastic",
        func=easeinoutelastic,
        eq="(piecewise)",
        high=1.18,
        low=-.13
    },
    {
        name="ease in bounce",
        func=easeinbounce,
        eq="(piecewise)"
    },
    {
        name="ease out bounce",
        func=easeoutbounce,
        eq="(piecewise)"
    },
    {
        name="ease out/in quadratic",
        func=easeoutinquad,
        eq="(piecewise)"
    },
    {
        name="ease out/in quartic",
        func=easeoutinquart,
        eq="(piecewise)"
    },
    {
        name="ease out/in overshoot",
        func=easeoutinovershoot,
        eq="(piecewise)"
    },
    {
        name="ease out/in elastic",
        func=easeoutinelastic,
        eq="(piecewise)"
    }
}
-->8

-->8
--subpixel drawing functions
_circfill=circfill
function circfill(x,y,r,c)
    x=x or 0 y=y or 0
    r=r or 4
    c=c or 6
    local p=6.3*r
    for i=-.001,.25,1/p do
        rect(x+cos(i)*r,y+sin(i)*r,x-cos(i)*r,y+sin(i)*r,c)
        rect(x+cos(i)*r,y-sin(i)*r,x-cos(i)*r,y-sin(i)*r,c)
    end
end

_line=line
function line(x1,y1,x2,y2,c)
    x1=x1 or 0 y1=y1 or 0 
    x2=x2 or 0 y2=y2 or 0 
    c=c or 6
    local dx,dy=x2-x1,y2-y1
    local llen=max(abs(dx),abs(dy))
    local sx,sy=dx/llen,dy/llen
    local cx,cy=x1,y1
    for i=0,max(abs(dx),abs(dy)) do
        pset(cx,cy,c)
        cx+=sx cy+=sy
    end
end

function dashline(x1,y1,x2,y2,c)
    x1=x1 or 0 y1=y1 or 0 
    x2=x2 or 0 y2=y2 or 0 
    c=c or 6
    local dx,dy=x2-x1,y2-y1
    local llen=max(abs(dx),abs(dy))
    local sx,sy=dx/llen,dy/llen
    local cx,cy=x1,y1
    for i=0,max(abs(dx),abs(dy)) do
        local t=cx/sx
        if(abs(dy)>abs(dx))t=cy/sy
        if(t%5<2.5)pset(cx,cy,c)
        cx+=sx cy+=sy
    end
end
