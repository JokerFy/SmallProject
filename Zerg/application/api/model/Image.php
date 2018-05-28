<?php

namespace app\api\model;

class Image extends BaseModel
{
    protected $hidden = ['delete_time', 'id', 'from'];

    public function getUrlAttr($value, $data)
    {
        return $this->prefixImgUrl($value, $data);
    }

    public function addImage($fileName)
    {
        $data = [
            'url'=>'/'.$fileName
        ];
        $this->save($data);
        return $this->id;
    }

    public static function getRandName($filename){
        $Achars = array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
        $chars = array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
        $number = array('0','1','2','3','4','5','6','7','8','9');
        $AcharsLen = count($Achars) - 1;
        $charsLen = count($chars) - 1;
        $numberLen = count($number) - 1;
        $fileName = $Achars[mt_rand(0, $AcharsLen)].$chars[mt_rand(0, $charsLen)].$number[mt_rand(0, $numberLen)].$filename;
        return $fileName;
    }

}

