$(function(){

    if(!window.base.getLocalStorage('token')){
        window.location.href = 'login.html';
    }

    var pageIndex=1,
        moreDataFlag=true;
    getProducts(pageIndex);

    /*
    * 获取数据 分页
    * params:
    * pageIndex - {int} 分页下表  1开始
    */

    function getProducts(pageIndex){
        var params={
            url:'product/paginate',
            data:{page:pageIndex,size:20},
            tokenFlag:true,
            sCallback:function(res) {
                var str = getProductHtmlStr(res);console.log(res);
                $('#order-table').append(str);
            }
        };
        window.base.getData(params);
    }

    /*拼接html字符串*/
    function getProductHtmlStr(res){
        var data = res.data;
        if (data){
            var len = data.length,
                str = '', item;
            if(len>0) {
                for (var i = 0; i < len; i++) {
                    item = data[i];
                    str += '<tr>' +
                        '<td>' + item.id + '</td>' +
                        '<td>' + item.name + '</td>' +
                        '<td>' + item.price + '</td>' +
                        '<td>￥' + item.stock + '</td>' +
                        '<td>' + getCategoryName(item.category_id) + '</td>' +
                        '<td><image style="vertical-align: middle;width: 50px;height: 50px" src="' + item.main_img_url + '">'+'</image></td>' +
                        '<td>'+item.create_time+'</td>' +
                        '<td data-id="' + item.id + '"><span class="order-btn done">编辑</span><span class="order-btn unstock">删除</span></td>' +
                        '</tr>';
                }
            }
            else{
                ctrlLoadMoreBtn();
                moreDataFlag=false;
            }
            return str;
        }
        return '';
    }

    /*根据订单状态获得标志*/
    function getCategoryName(cate_id){
        switch(cate_id){
            case 2:
                return '果味';
                break;
            case 3:
                return '蔬菜';
                break;
            case 4:
                return '炒货';
                break;
            case 5:
                return '点心';
                break;
            case 6:
                return '粗茶';
                break;
            case 7:
                return '淡饭';
                break;
        }
    }

    /*控制加载更多按钮的显示*/
    function ctrlLoadMoreBtn(){
        if(moreDataFlag) {
            $('.load-more').hide().next().show();
        }
    }

    /*加载更多*/
    $(document).on('click','.load-more',function(){
        if(moreDataFlag) {
            pageIndex++;
            getProducts(pageIndex);
        }
    });
    /*发货*/
    $(document).on('click','.order-btn.unstock',function(){
        var $this=$(this),
            $td=$this.closest('td'),
            $tr=$this.closest('tr'),
            id=$td.attr('data-id'),
            $tips=$('.global-tips'),
            $p=$tips.find('p');
        var params={
            url:'product/'+id,
            type:'delete',
            data:{id:id},
            tokenFlag:true,
            sCallback:function(res) {
                if(res){
                    $p.text('操作成功');
                }else{
                    $p.text('操作失败');
                }
                $tips.show().delay(1500).hide(0);
                window.setTimeout("window.location='product.html'",2000);
            },
            eCallback:function(){
                $p.text('操作失败');
                $tips.show().delay(1500).hide(0);
            }
        };
        window.base.getData(params);
    });

    /*退出*/
    $(document).on('click','#login-out',function(){
        window.base.deleteLocalStorage('token');
        window.location.href = 'login.html';
    });

});