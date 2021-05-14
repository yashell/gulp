let ChooseID = -1;

let order0 = -1;
let order1 = -1;
let order2 = -1;


let group0 = 0;
let group1 = 0;
let group2 = 0;

let search = {
    factory: '',dealer:'',hospital:''
}

let i = 0;
let font =true
let ctx
let canvasA
let canvasB

let canvasNum


let leftCanvasStatus = {
    direction:0,  // 0左 1右
    count:1  //数量
}
let rightCanvasStatus = {
    direction:1,  // 0左 1右
    count:1  //数量
}

function changeText(isf,code) {
    if(ChooseID !== -1 && ChooseID === code) {
        if(isf){
            if(code === 0) {
                if((group0 * 5+ 5) / data[0].data.length < 1) group0 ++
            } else if(code === 1) {
                if((group1 * 5 + 5) / data[1].data.length < 1) group1 ++
            } else if(code === 2) {
                if((group2 * 5 + 5) / data[2].data.length < 1) group2 ++
            }
        } else {
            if(code === 0) {
                if(group0 > 0) group0--
            } else if(code === 1) {
                if(group1 > 0) group1 --
            } else if(code === 2) {
                if(group2 > 0) group2 --
            }
        }
        let mainDiv = document.getElementById('msc_main'+code)
        mainDiv.innerHTML=''
        let num = 0
        for(let i=0;i<5;i++){
            if ((eval("group"+code) * 5) +i < data[code].data.length ) {
                num++
                let s = (eval("group"+code) * 5) +i
                mainDiv.innerHTML+= '<div class="mscreen_end_main mscreen_border move'+i+'" onclick="choose('+code+','+s+')">'+data[code].data[(eval("group"+code) * 5) +i].title;+'</div>'

            }
        }
        if(code === 0) {
            lineLeft('CanvasA',num)
        } else if (code === 1) {
            lineLeft('CanvasB',num)
            lineRight('CanvasA',num)
        } else if (code === 2) {
            lineRight('CanvasB',num)
        }

        return
    }
    if(isf){
        if(code === 0) {
            if(order0 < data[0].data.length-1) order0 ++
        } else if(code === 1) {
            if(order1 < data[1].data.length-1) order1 ++
        } else if(code === 2) {
            if(order2 < data[2].data.length-1) order2 ++
        }
    } else {
        if(code === 0) {
            if(order0 >= 0) order0--
        } else if(code === 1) {
            if(order1 >= 0) order1 --
        } else if(code === 2) {
            if(order2 >= 0) order2 --
        }
    }
    if (eval("order"+code) !== -1 ) {
        let imgHtml = '<i class="yrt yrt-kuang" style=" position: absolute; font-size:10rem; margin-left: -6.9rem; color: #00ffff" ></i>'
        document.getElementById('msc_main'+code).innerHTML=imgHtml+ '<span title="'+data[code].data[eval("order"+code)].title+'">'+data[code].data[eval("order"+code)].title+'</span>'
        if (code === 0 ){
            search.factory = data[code].data[eval("order"+code)].id
        } else if (code === 1){
            search.dealer = data[code].data[eval("order"+code)].id
        }else if (code === 2){
            search.hospital = data[code].data[eval("order"+code)].id
        }
    }
}


function animation(code){
    if (code === 0 ){
        if (search.dealer!= '' && search.hospital!= '') {
            data[0].data = []
            factory.forEach(item => {
                if(item.role.indexOf(search.dealer)!= -1 && item.role.indexOf(search.hospital)!= -1  )
                {
                    data[0].data.push(item)
                }
            })
            $setJumpNumber(0, data[0].data.length, 100, 'pNumA');
        }

    } else if (code === 1){
        if (search.factory!= '' && search.hospital!= '') {
            data[1].data = []
            dealer.forEach(item => {
                if(item.role.indexOf(search.factory)!= -1 && item.role.indexOf(search.hospital)!= -1  )
                {
                    data[1].data.push(item)
                }
            })
            $setJumpNumber(0, data[1].data.length, 100, 'pNumB');
        }

    }else if (code === 2){
        if (search.factory!= '' && search.dealer!= '') {
            data[2].data = []
            hospital.forEach(item => {
                if(item.role.indexOf(search.factory)!= -1 && item.role.indexOf(search.dealer)!= -1  )
                {
                    data[2].data.push(item)
                }
            })
            $setJumpNumber(0, data[2].data.length, 100, 'pNumC');
        }
    }



    let mainDiv = document.getElementById('msc_main'+code)

    let imgHtml = '<i class="yrt yrt-kuang" style=" position: absolute; font-size:10rem; margin-left: -6.9rem; color: #00ffff" ></i>'

    if (ChooseID !== -1 && ChooseID != code) {
        let textHtml = data[ChooseID].data[eval("order"+ChooseID)] ? data[ChooseID].data[eval("order"+ChooseID)].title : data[ChooseID].title
        document.getElementById('msc_main'+ChooseID).className = 'mscreen_start'
        document.getElementById('msc_main'+ChooseID).innerHTML=imgHtml+ '<span title="'+textHtml+'">'+textHtml+'</span>'
        document.getElementsByClassName('mscreen_up')[ChooseID].style.opacity = 0
        document.getElementsByClassName('mscreen_down')[ChooseID].style.opacity = 0
        lineLeft('CanvasA',1)
        lineRight('CanvasB',1)
    }

    if (mainDiv.className === 'mscreen_start') {
        ChooseID = code
        mainDiv.className='mscreen_end'
        mainDiv.innerHTML=''
        let num = 0
        for(let i=0;i<5;i++){
            if ((eval("group"+code) * 5) +i < data[code].data.length) {
                num++
                let s = Number((eval("group"+code) * 5)) +Number(i)
                mainDiv.innerHTML += '<div class="mscreen_end_main mscreen_border move'+i+'" onclick="choose('+code+','+s+')">'+data[code].data[(eval("group"+code) * 5) +i].title;+'</div>'

            }
        }
        if(code === 0) {
            lineLeft('CanvasA',num)
        } else if (code === 1) {
            lineLeft('CanvasB',num)
            lineRight('CanvasA',num)
        } else if (code === 2) {
            lineRight('CanvasB',num)
        }
    } else {
        lineLeft('CanvasA',1)
        lineRight('CanvasB',1)
        mainDiv.className = 'mscreen_start'
        let textHtml
        if (ChooseID != -1){
        textHtml = data[ChooseID].data[eval("order"+ChooseID)] ? data[ChooseID].data[eval("order"+ChooseID)].title : data[ChooseID].title
        mainDiv.innerHTML=imgHtml+ '<span title="'+textHtml+'">'+textHtml+'</span>'
        }
    }


}

function choose(code,num){

    let mainDiv = document.getElementById('msc_main'+code)

    let imgHtml = '<i class="yrt yrt-kuang" style=" position: absolute; font-size:10rem; margin-left: -6.9rem; color: #00ffff" ></i>'
    let textHtml = data[code].data[num].title
    mainDiv.innerHTML=imgHtml+ '<span title="'+textHtml+'">'+textHtml+'</span>'
    ChooseID = -1


    if (code === 0 ){
        search.factory = data[code].data[num].id
    } else if (code === 1){
        search.dealer = data[code].data[num].id
    }else if (code === 2){
        search.hospital = data[code].data[num].id
    }
}


function msc_show(code){
    document.getElementsByClassName('mscreen_up')[code].style.opacity = 1
    document.getElementsByClassName('mscreen_down')[code].style.opacity = 1
}
function msc_hide(code){
    let oDiv = document.getElementsByClassName('mscreen_main')[code]
    if(oDiv.getElementsByClassName('mscreen_end').length === 0){

        document.getElementsByClassName('mscreen_up')[code].style.opacity = 0
        document.getElementsByClassName('mscreen_down')[code].style.opacity = 0
    } else {
        document.getElementsByClassName('mscreen_up')[code].style.opacity = 1
        document.getElementsByClassName('mscreen_down')[code].style.opacity = 1
    }
}


function getWidth(){
    document.getElementById('CanvasA').width = 0
    document.getElementById('CanvasB').width = 0
    mainDiv=document.getElementsByClassName('mscreen_line')[0]

    document.getElementById('CanvasA').width = mainDiv.offsetWidth - 10
    document.getElementById('CanvasB').width = mainDiv.offsetWidth - 10

    if (leftCanvasStatus.direction === 0) {
        lineLeft('CanvasA',leftCanvasStatus.count)
    } else {
        lineRight('CanvasA',leftCanvasStatus.count)
    }


    if (rightCanvasStatus.direction === 0) {
        lineLeft('CanvasB',rightCanvasStatus.count)
    } else {
        lineRight('CanvasB',rightCanvasStatus.count)
    }


}




function NowTime(){
    //获取年月日
    var time=new Date();
    var year=time.getFullYear();
    var month=time.getMonth();
    var day=time.getDate();
    if (month< 10) month= '0'+ month
    if (day< 10) day= '0'+ day

    //获取时分秒
    var h=time.getHours();
    var m=time.getMinutes();
    var s=time.getSeconds();
    if (h< 10) h= '0'+ h
    if (m< 10) m= '0'+ m
    if (s< 10) s= '0'+ s

    var myddy=time.getDay();//获取存储当前日期
    var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];


    document.getElementById("timeA").innerHTML=year+"."+month+"."+day +" "+ weekday[myddy]
    document.getElementById("timeB").innerHTML=h+":"+m+":"+s;

}

/**
 *
 * @param startNum 代表要跳动的初始数字
 * @param targetNum 代表要跳动到的数字
 * @param time 代表要跳动需要花费的时间
 * @param selector 代表要跳动元素的选择器
 */
const $setJumpNumber = (startNum, targetNum, time = 1, selector) => {
    let dom = document.getElementById(selector);
    let originNum = startNum;
    let stepNum = 0;
    let timeNum = time;
    dom.innerHTML = startNum;

    let timeId = setInterval(() => {
        if (originNum < targetNum) {
            timeNum -= 0.001;
            let strNum = originNum.toString();
            // 数字比较少的时候直接用 + 1; 数字很大直接 +1 要很久才能调到最对应的数字，所有后三位数随机跳动的方式进行模拟生成
            if (targetNum.toString().length < 6) {
                stepNum += 1; // 这样才可以实现越跳越快的效果
                originNum = originNum + stepNum;
                dom.innerHTML = originNum;
            } else {
                stepNum += 500; // 这样才可以实现越跳越快的效果
                originNum = originNum + stepNum;
                dom.innerHTML = strNum.substr(0, strNum.length - 3) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10);
            }
        } else {
            dom.innerHTML = targetNum;
            clearInterval(timeId);
        }
    }, timeNum);
};

/**
 * 绘制向左边散开的线
 * @param id div_id
 * @param num 几条线
 */

function lineLeft(id,num){

    // 这类型是针对canvas判断
    if(id === 'CanvasA') {
        leftCanvasStatus.count = num
        leftCanvasStatus.direction = 0
    } else if (id === 'CanvasB') {
        rightCanvasStatus.count = num
        rightCanvasStatus.direction = 0
    }


    canvas = document.getElementById(id);


    canvasNum = num
    if(canvas.getContext){
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);//每绘制一次就清空一次画布

        if (num === 5) {
            drawArrow(ctx, 5, 15, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5,15,20,10,2,'#d75f39');


            drawArrow(ctx, 5, 100, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5,100,20,10,2,'#d75f39');


            drawArrow(ctx, 5, 180, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5,180,20,10,2,'#d75f39');

            drawArrow(ctx, 5, 260, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5,260,20,10,2,'#d75f39');

            drawArrow(ctx, 5, 320, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5,320,20,10,2,'#d75f39');
        } else if (num === 3){
            drawArrow(ctx, 5, 15, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5,15,20,10,2,'#d75f39');

            drawArrow(ctx, 5, 180, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5,180,20,10,2,'#d75f39');

            drawArrow(ctx, 5, 320, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5,320,20,10,2,'#d75f39');
        }else if (num === 4) {
            drawArrow(ctx, 5, 15, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5,15,20,10,2,'#d75f39');


            drawArrow(ctx, 5, 130, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5,130,20,10,2,'#d75f39');


            drawArrow(ctx, 5, 235, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5,235,20,10,2,'#d75f39');

            drawArrow(ctx, 5, 320, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5,320,20,10,2,'#d75f39');
        }else if (num === 2) {
            drawArrow(ctx, 5, 15, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5,15,20,10,2,'#d75f39');

            drawArrow(ctx, 5, 320, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5,320,20,10,2,'#d75f39');
        }
        else if (num === 1) {
            drawArrow(ctx, 5, 180, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5,180,20,10,2,'#d75f39');
        }


        // clearInterval(lineLeftAnm)
        // i = 0;
        // font =true
        // setInterval(lineLeftAnm, 100);


    }
}



function  lineLeftAnm() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);//每绘制一次就清空一次画布

        if(font) {
            i+=0.2;
        } else {
            i-=0.2;
        }

        if(i>= 10){
            font =false
        } else if (i <=0 ) {
            font =true
        }
  let num = canvasNum
        if (num === 5) {
            drawArrow(ctx, 5+i, 15+i, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5+i,15+i,20,10,2,'#d75f39');

            drawArrow(ctx, 5+i, 100, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5+i,100,20,10,2,'#d75f39');


            drawArrow(ctx, 5, 180+i, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5,180+i,20,10,2,'#d75f39');

            drawArrow(ctx, 5+i, 260+i, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5+i,260+i,20,10,2,'#d75f39');

            drawArrow(ctx, 5, 320+i, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5,320+i,20,10,2,'#d75f39');
        } else if (num === 3) {
            drawArrow(ctx, 5+i, 15+i, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5+i,15+i,20,10,2,'#d75f39');



            drawArrow(ctx, 5, 180+i, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5,180+i,20,10,2,'#d75f39');

            drawArrow(ctx, 5, 320+i, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5,320+i,20,10,2,'#d75f39');
        }
        else if (num === 4) {
            drawArrow(ctx, 5+i, 15, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5+i,15,20,10,2,'#d75f39');


            drawArrow(ctx, 5, 130+i, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5,130+i,20,10,2,'#d75f39');


            drawArrow(ctx, 5+i, 235+i, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5+i,235+i,20,10,2,'#d75f39');

            drawArrow(ctx, 5+i, 320, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5+i,320,20,10,2,'#d75f39');
        }
        else if (num === 2) {
            drawArrow(ctx, 5+i, 15, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5+i,15,20,10,2,'#d75f39');


            drawArrow(ctx, 5+i, 320, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5+i,320,20,10,2,'#d75f39');
        }
}


/**
 * 绘制向右边散开的线
 * @param id div_id
 */

function lineRight(id,num){
    // 这类型是针对canvas判断
    if(id === 'CanvasA') {
        leftCanvasStatus.count = num
        leftCanvasStatus.direction = 1
    } else if (id === 'CanvasB') {
        rightCanvasStatus.count = num
        rightCanvasStatus.direction = 1
    }
    canvas = document.getElementById(id);
    if(canvas.getContext){
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);//每绘制一次就清空一次画布

        if (num === 5) {
            drawArrow(ctx, canvas.width, 15, 5, 180, 20, 10, 2, '#d75f39');
            drawArrow(ctx, 5, 180, canvas.width, 15, 20, 10, 2, '#d75f39');


            drawArrow(ctx, canvas.width, 100, 5, 180, 20, 10, 2, '#d75f39');
            drawArrow(ctx, 5, 180, canvas.width, 100, 20, 10, 2, '#d75f39');


            drawArrow(ctx, 5, 180, canvas.width, 180, 20, 10, 2, '#d75f39');
            drawArrow(ctx, canvas.width, 180, 5, 180, 20, 10, 2, '#d75f39');

            drawArrow(ctx, canvas.width, 260, 5, 180, 20, 10, 2, '#d75f39');
            drawArrow(ctx, 5, 180, canvas.width, 260, 20, 10, 2, '#d75f39');

            drawArrow(ctx, canvas.width, 320, 5, 180, 20, 10, 2, '#d75f39');
            drawArrow(ctx, 5, 180, canvas.width, 320, 20, 10, 2, '#d75f39');
        } else if (num === 3) {
            drawArrow(ctx, canvas.width, 15, 5, 180, 20, 10, 2, '#d75f39');
            drawArrow(ctx, 5, 180, canvas.width, 15, 20, 10, 2, '#d75f39');

            drawArrow(ctx, 5, 180, canvas.width, 180, 20, 10, 2, '#d75f39');
            drawArrow(ctx, canvas.width, 180, 5, 180, 20, 10, 2, '#d75f39');

            drawArrow(ctx, canvas.width, 320, 5, 180, 20, 10, 2, '#d75f39');
            drawArrow(ctx, 5, 180, canvas.width, 320, 20, 10, 2, '#d75f39');
        } else if (num === 4) {
            drawArrow(ctx, canvas.width, 15, 5, 180, 20, 10, 2, '#d75f39');
            drawArrow(ctx, 5, 180, canvas.width, 15, 20, 10, 2, '#d75f39');


            drawArrow(ctx, canvas.width, 125, 5, 180, 20, 10, 2, '#d75f39');
            drawArrow(ctx, 5, 180, canvas.width, 125, 20, 10, 2, '#d75f39');

            drawArrow(ctx, canvas.width, 230, 5, 180, 20, 10, 2, '#d75f39');
            drawArrow(ctx, 5, 180, canvas.width, 230, 20, 10, 2, '#d75f39');

            drawArrow(ctx, canvas.width, 320, 5, 180, 20, 10, 2, '#d75f39');
            drawArrow(ctx, 5, 180, canvas.width, 320, 20, 10, 2, '#d75f39');
        }else if (num === 2) {
            drawArrow(ctx, canvas.width, 15, 5, 180, 20, 10, 2, '#d75f39');
            drawArrow(ctx, 5, 180, canvas.width, 15, 20, 10, 2, '#d75f39');

            drawArrow(ctx, canvas.width, 320, 5, 180, 20, 10, 2, '#d75f39');
            drawArrow(ctx, 5, 180, canvas.width, 320, 20, 10, 2, '#d75f39');
        }
        else if (num === 1) {
            drawArrow(ctx, 5, 180, canvas.width,180,20,10,2,'#d75f39');
            drawArrow(ctx,  canvas.width, 180, 5,180,20,10,2,'#d75f39');
        }

    // clearInterval(lineRightAnm)
    //
    // i = 0;
    // font =true
    // setInterval(lineRightAnm, 100);


    }
}




function lineRightAnm (ctx) {//不停的去绘制一个图案
    ctx.clearRect(0, 0, canvas.width, canvas.height);//每绘制一次就清空一次画布

    if(font) {
        i+=0.2;
    } else {
        i-=0.2;
    }

    if(i>= 10){
        font =false
    } else if (i <=0 ) {
        font =true
    }
    if (num === 5) {
        drawArrow(ctx, canvas.width+i, 15, 5, 180, 20, 10, 2, '#d75f39');
        drawArrow(ctx, 5, 180, canvas.width+i, 15, 20, 10, 2, '#d75f39');


        drawArrow(ctx, canvas.width, 100+i, 5, 180, 20, 10, 2, '#d75f39');
        drawArrow(ctx, 5, 180, canvas.width, 100+i, 20, 10, 2, '#d75f39');


        drawArrow(ctx, 5+i, 180+i, canvas.width, 180, 20, 10, 2, '#d75f39');
        drawArrow(ctx, canvas.width, 180, 5+i, 180+i, 20, 10, 2, '#d75f39');

        drawArrow(ctx, canvas.width, 260+i, 5, 180, 20, 10, 2, '#d75f39');
        drawArrow(ctx, 5, 180, canvas.width, 260+i, 20, 10, 2, '#d75f39');

        drawArrow(ctx, canvas.width+i, 320+i, 5, 180, 20, 10, 2, '#d75f39');
        drawArrow(ctx, 5, 180, canvas.width, 320+i, 20, 10, 2, '#d75f39');
    } else if (num === 3) {
        drawArrow(ctx, canvas.width+i, 15, 5, 180, 20, 10, 2, '#d75f39');
        drawArrow(ctx, 5, 180, canvas.width+i, 15, 20, 10, 2, '#d75f39');

        drawArrow(ctx, 5+i, 180+i, canvas.width, 180, 20, 10, 2, '#d75f39');
        drawArrow(ctx, canvas.width, 180, 5+i, 180+i, 20, 10, 2, '#d75f39');

        drawArrow(ctx, canvas.width+i, 320+i, 5, 180, 20, 10, 2, '#d75f39');
        drawArrow(ctx, 5, 180, canvas.width, 320+i, 20, 10, 2, '#d75f39');
    } else if (num === 4) {
        drawArrow(ctx, canvas.width+i, 15, 5, 180, 20, 10, 2, '#d75f39');
        drawArrow(ctx, 5, 180, canvas.width+i, 15, 20, 10, 2, '#d75f39');


        drawArrow(ctx, canvas.width, 125+i, 5, 180, 20, 10, 2, '#d75f39');
        drawArrow(ctx, 5, 180, canvas.width, 125+i, 20, 10, 2, '#d75f39');

        drawArrow(ctx, canvas.width+i, 230+i, 5, 180, 20, 10, 2, '#d75f39');
        drawArrow(ctx, 5, 180, canvas.width+i, 230+i, 20, 10, 2, '#d75f39');

        drawArrow(ctx, canvas.width+i, 320, 5, 180, 20, 10, 2, '#d75f39');
        drawArrow(ctx, 5, 180, canvas.width+i, 320, 20, 10, 2, '#d75f39');
    }else if (num === 2) {
        drawArrow(ctx, canvas.width+i, 15, 5, 180, 20, 10, 2, '#d75f39');
        drawArrow(ctx, 5, 180, canvas.width+i, 15, 20, 10, 2, '#d75f39');

        drawArrow(ctx, canvas.width+i, 320, 5, 180, 20, 10, 2, '#d75f39');
        drawArrow(ctx, 5, 180, canvas.width+i, 320, 20, 10, 2, '#d75f39');
    }


}



function drawArrow(ctx, fromX, fromY, toX, toY,theta,headlen,width,color) {
    var theta = theta || 30,
        headlen = headlen || 10,
        width = width || 1,
        color = color || '#000',
        angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
        angle1 = (angle + theta) * Math.PI / 180,
        angle2 = (angle - theta) * Math.PI / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);
    ctx.save();
    ctx.beginPath();
    var arrowX, arrowY;
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    arrowX = toX + topX;
    arrowY = toY + topY;
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(toX, toY);
    arrowX = toX + botX;
    arrowY = toY + botY;
    ctx.lineTo(arrowX, arrowY);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}


/**
 * 初始化数字
 */
function setNumber(){
    $setJumpNumber(0, product[0].data[0].quantity, 2, 'numA');
    $setJumpNumber(0, product[0].data[1].quantity, 1, 'numB');
    $setJumpNumber(0, product[0].data[2].quantity, 1, 'numC');

    $setJumpNumber(0, product[1].data[0].quantity, 20, 'numD');
    $setJumpNumber(0, product[1].data[1].quantity, 20, 'numE');
    $setJumpNumber(0, product[1].data[2].quantity, 20, 'numF');
    $setJumpNumber(0, product[1].data[3].quantity, 20, 'numG');

    $setJumpNumber(0, product[2].data[0].quantity, 20, 'numH');
    $setJumpNumber(0, product[2].data[1].quantity, 20, 'numI');
    $setJumpNumber(0, product[2].data[2].quantity, 20, 'numJ');
    $setJumpNumber(0, product[2].data[3].quantity, 20, 'numK');


    data[0].data = factory
    data[1].data = dealer
    data[2].data = hospital


    $setJumpNumber(0, data[0].data.length, 100, 'pNumA');
    $setJumpNumber(0, data[1].data.length, 100, 'pNumB');
    $setJumpNumber(0, data[2].data.length, 100, 'pNumC');

}

/**
 * 间隔一段时间后刷新数字
 */
function updateNumber(){


        // let numA= Number(document.getElementById('numA').innerHTML)
        // let numB= Number(document.getElementById('numB').innerHTML)
        let numC= Number(document.getElementById('numC').innerHTML)

        // let addnumA = Math.floor(Math.random()*50);
        // let addnumB = Math.floor(Math.random()*50);
        let addnumC = Math.floor(Math.random()*100);

        // $setJumpNumber(numA, numA+addnumA, 20, 'numA');
        // $setJumpNumber(numB, numB+addnumB, 20, 'numB');
        $setJumpNumber(numC, numC+addnumC, 20, 'numC');

}


/**
 * onload方法
 */
window.onload = function () {
    setNumber() //初始化数字
    setInterval(updateNumber,15000);


    updateNumber()

    getWidth()
    NowTime()
    setInterval("NowTime()",1000);




}

window.onresize = function(){
    getWidth()
}
