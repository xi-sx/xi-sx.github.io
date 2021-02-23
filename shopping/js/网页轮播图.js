window.addEventListener('load', function() {
    var arrow_l = document.querySelector('.arrow_l');
    var arrow_r = document.querySelector('.arrow_r');
    var div = document.querySelector('.focus');
    div.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    div.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            arrow_r.click();
        }, 2000)
    })
    var ul = document.querySelector('.banner_items');
    var ol = document.querySelector('.banner_circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('data-index', i);
        ol.appendChild(li);
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('data-index');
            num = index;
            circle = index;
            animate(ul, -index * div.offsetWidth);
        })
    }
    ol.children[0].className = 'current';
    ul.appendChild(ul.children[0].cloneNode(true));
    var num = 0; //控制图片位置
    var circle = 0; //控制小圆点位置


    var flag = true; //节流阀
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * div.offsetWidth, function() {
                flag = true;
            })
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            clearOther();
        }

    })
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = 0;
            }
            num--;
            animate(ul, -num * div.offsetWidth, function() {
                flag = true;
            })
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            clearOther();
        }
    })

    function clearOther() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

    var timer = setInterval(function() {
        arrow_r.click();
    }, 2000)
})