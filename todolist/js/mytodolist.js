$(function () {
    var data = [];
    render();
    $('#title').on('keydown', function (e) {
        if (e.keyCode == 13 && $('#title').val() != '') {
            // 初始化新待办
            data.push({
                title: $('#title').val(),
                done: false
            });
            localStorage.setItem('todo', JSON.stringify(data));
            $('#title').val('');
            render();
        }
    });
    $('body').on('click', '.del', function (e) {
        data = JSON.parse(localStorage.getItem('todo')) || [];
        var index = $(this).parent().attr('index');
        data.splice(index, 1);
        localStorage.setItem('todo', JSON.stringify(data));
        render();
    });
    $('body').on('change', '.check', function () {
        data = JSON.parse(localStorage.getItem('todo')) || [];
        var index = $(this).parent().attr('index');
        data[index].done = this.checked;
        localStorage.setItem('todo', JSON.stringify(data));
        render();
    });

    function render() {
        data = JSON.parse(localStorage.getItem('todo')) || [];
        $('#todolist').empty();
        $('#donelist').empty();
        $.each(data, function (index, value) {
            var li = $('<li></li>');
            var check = $('<input type="checkbox" class="check">');
            var del = $('<a href="javascript:;" class="del"></a>');
            var txt = $('<p></p>');
            txt.text(value.title);
            check.prop('checked', value.done);
            li.attr('index', index);
            li.append(check, txt, del);
            if (value.done) {
                $('#donelist').prepend(li);
            } else {
                $('#todolist').prepend(li);
            }
        });
        $('#todocount').text($('#todolist li').length);
        $('#donecount').text($('#donelist li').length);
    }
    $('html').on('mousedown', 'li', function (e) {
        var startX = e.pageX;
        var startY = e.pageY;
        $(this).on('mousemove', function (e) {
            this.style.left = (e.pageX - startX) + 'px';
            this.style.top = (e.pageY - startY) + 'px';
        });
    });
    $('html').parent().on('mouseup', function () {
        $('li').off('mousemove');

    });
})