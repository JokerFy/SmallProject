function letTimeout() {
    var index = parent.layer.getFrameIndex(window.name);
    parent.layui.layer.close(index);
}
layui.use(['form','upload'], function() {
    /*        var form = layui.form;
            var layer = layui.layer;*/
    var $ = layui.jquery, upload = layui.upload, layer = layui.layer, form = layui.form;
    //监听提交
    form.on('submit(formDemo)', function(data){
        var params = {
            url: 'product/create',
            type: 'post',
            data: data.field,
            tokenFlag: true,
            sCallback: function (res) {
                layer.msg('添加成功');
                setTimeout(letTimeout,1500)
            },
            eCallback: function (res) {
                layer.msg('添加失败');
            }
        };
        window.base.getData(params);
        return false;
    });

    //普通图片上传
    var uploadInst = upload.render({
        elem: '#test1'
        ,url: 'http://z.cn/api/v1/image/toupload'
        ,before: function(obj){
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result){
                $('#demo1').attr('src', result); //图片链接（base64）
                $('#demo1').attr('width', '100px');
                $('#demo1').attr('height', '100px');
            });
        }
        ,done: function(res){
            if(res.code === 200){
                $("#imgName").val(res.imgname);
                console.log(res);
                return layer.msg('上传成功');
            } else if(res.code === 201){
                console.log(res);
                return layer.msg('上传失败，该图片名已存在');
            }else{
                return layer.msg('上传失败');
            }
        }

        ,error: function(){
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> ');
        }
    });
});

