<?php

namespace app\api\controller\v1;

use app\lib\exception\proCreateException;
use think\Controller;
use think\Request;
use app\api\model\Image as ImageModel;

class Image extends Controller
{
    public $uploadReplace = false;
    public $saveRule = '';
    public function upload() {
        $file = Request::instance()->file('file');
        $fileName = addslashes($file->getInfo('name'));
        $fileExist = file_exists('images/'.$fileName);
        if($fileExist){
            $fileName = ImageModel::getRandName($fileName);
        }
        // 给定一个目录
        $info = $file->move('images',$fileName,false);
        if($info) {
            return[
                'code'=>200,
                'imgname'=>$fileName,
            ];
        }else{
            return[
                'code'=>201,
            ];
        }
    }

}
