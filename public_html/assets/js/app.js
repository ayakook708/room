(() => {
    //要素の取得
    const elements = document.getElementsByClassName('items');

    //要素内のクリックされた位置を取得するグローバル（のような）変数
    let x;
    let y;
    
    //カーソルを合わせたらアイテム名を表示
//    console.log(elements[0].id);
//    for (let i = 0; i < elements.length; i++) {
//        elements.addEventListener('mouseover',() => {
//            elements[i].id.style.display = 'block';
//        },false);
//    }
    
    //マウスが要素内で押されたとき、又はタッチされたとき発火
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('mousedown', mdown, false);
        elements[i].addEventListener('touchstart', mdown, false);
        elements[i].style.left = i * 120 + 'px';
//        elements[i].style.top = Math.floor(i/10) * 100 + 'px';
    }

    //マウスが押された際の関数
    function mdown(e) {
        //クラス名に .drag を追加
        this.classList.add('drag');

        //タッチデイベントとマウスのイベントの差異を吸収
        if (e.type === 'mousedown') {
            let event = e;
        } else {
            let event = e.changedTouches[0];
        }

        //要素内の相対座標を取得
        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;

        //ムーブイベントにコールバック
        document.body.addEventListener('mousemove', mmove, false);
        document.body.addEventListener('touchmove', mmove, false);
    }

    //マウスカーソルが動いたときに発火
    function mmove(e) {
        //ドラッグしている要素を取得
        const drag = document.getElementsByClassName('drag')[0];

        //同様にマウスとタッチの差異を吸収
        if (e.type === 'mousemove') {
            let event = e;
        } else {
            let event = e.changedTouches[0];
        }

        //フリックしたときに画面を動かさないようにデフォルト動作を抑制
        e.preventDefault();

        //マウスが動いた場所に要素を動かす
        drag.style.top = event.pageY - y + 'px';
        drag.style.left = event.pageX - x + 'px';

        //マウスボタンが離されたとき、またはカーソルが外れたとき発火
        drag.addEventListener('mouseup', mup, false);
        document.body.addEventListener('mouseleave', mup, false);
        drag.addEventListener('touchend', mup, false);
        document.body.addEventListener('touchleave', mup, false);
    }

    //マウスボタンが上がったら発火
    function mup(e) {
        const drag = document.getElementsByClassName('drag')[0];

        //ムーブベントハンドラの消去
        document.body.removeEventListener('mousemove', mmove, false);
        drag.removeEventListener('mouseup', mup, false);
        document.body.removeEventListener('touchmove', mmove, false);
        drag.removeEventListener('touchend', mup, false);

        //クラス名 .drag も消す
        drag.classList.remove('drag');
    }
})();
