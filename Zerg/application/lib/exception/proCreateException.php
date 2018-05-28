<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2018/5/17
 * Time: 15:57
 */
namespace app\lib\exception;

class proCreateException extends BaseException{
    public $msg = '创建商品失败';
    public $code = 999;
    public $errorCode = 10006;
}