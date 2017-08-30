/**
 * Created by Administrator on 2017/8/8 0008.
 */
angular.module("myApp")
.controller("listController",["$scope","httpServer",'urls','pageServer',function($scope,httpServer,urls,pageServer){
    $scope.hots=null;
    $scope.pageArr=[];
    var showPageBetween=2;
    //数据
    var obj={
        init:function(){
            $scope.cid=0;
            $scope.status=0;
            $scope.timeStatus=0;
            $scope.page=1;
            $scope.count=9;
        },
        getData:function(){
            httpServer.useHttp(urls.listUrl,"get",{
                cid:$scope.cid,
                status:$scope.status,
                timeStatus:$scope.timeStatus,
                page:$scope.page,
                count:$scope.count
            },function(res){
                $scope.hots=res.data.result.list;
                $scope.pageNum=Math.ceil(res.data.result.countAll/$scope.count);
                $scope.pageArr=pageServer.pageComponent($scope.pageArr,$scope.page,$scope.pageNum,showPageBetween)
            });
        }
    };
    obj.init();
    obj.getData();
    $scope.changeCid=function(x){
        if($scope.cid!=x){
            $scope.cid=x;
            obj.getData();
        }

    };
    $scope.changeStatus=function(x){
        if($scope.status!=x){
            $scope.status=x;
            obj.getData()
        }

    };
    $scope.changeTimeStatus=function(x){
        if($scope.timeStatus!=x){
            $scope.timeStatus=x;
            obj.getData()
        }

    };
    $scope.changePage=function(index){
        if(index=="..."||index=="...."){
            return
        }
        if($scope.page!=index){
            $scope.page=index;
            obj.getData();
        }
    };
    $scope.prev=function(){
        if($scope.page>1){
            $scope.page--;
            obj.getData()
        }
    };
    $scope.next=function(){
        if($scope.page<$scope.pageNum){
            $scope.page++;
            obj.getData()
        }
    };
    $scope.allType1=['全部','微电影', '电视剧', '话剧', '电影', '戏曲', '书画', '相声', '戏剧', '音乐剧'];
    $scope.allType2=["筹资中","即将结束","已成功"];
    $scope.allType3=["最新","热门","结束时间"];
}]);