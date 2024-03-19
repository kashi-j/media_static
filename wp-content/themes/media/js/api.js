/**
 * 
 */
 var FrontAPI = {

    cnst: {
    },

	// 初期化
	init: function() {
		'use strict';
	},

	// 記事のお気に入り登録
    savePostFavoriteAjax: function(params) {
		var defer = new $.Deferred();
        $.ajax({
            type: 'POST',
            url: '/store/post/favorite',
            data: {
                post_id: params.post_id
            },
            dataType: 'json',
            success: function(data){
                defer.resolve(data);
            },
            error: function(jqXHR, textStatus, errorThrown){
                defer.reject(jqXHR, textStatus, errorThrown);
            }
        });

        return defer.promise(this);
    },

    savePostFavorite: function($obj) {

        // 投稿ID
        var postId = $obj.attr('data-post-id');
        
        var params = {};
        params.post_id = postId;
        
        // ajax実行結果
        var promise = this.savePostFavoriteAjax(params);

        // ajax処理が成功した場合
        promise.done(function(data) {
            console.log(data.status);
			// 成功
            if (data.status == 'success'){
                $('.add-favorite').each(function(i, e){
                    $(e).addClass('is-favorite');
                });
                $obj.addClass('active');
                return true;
            }

			// 未ログイン
			if (data.status == 'nonmember'){
                if (confirm('お気に入りに保存するためには、ログインが必要です。\nログイン後に再度「お気に入りに保存」ボタンをクリックしてください。\nログイン画面に移動しますか?')) {
                    // リダイレクトURL付でECログイン画面に遷移する
                    var redirectUrl = $(location).attr('href');
                    location.href = '/store/mypage/login?redirect_url=' + encodeURIComponent(redirectUrl);
                } else {
                    return false
                }
                
                return true;
            }

			// エラー
			if (data.status == 'error'){
                
                return false;
            }

			return false;
        });

        // ajax処理が失敗した場合
        promise.fail(function(jqXHR, textStatus, errorThrown) {
            var errorMsg = '<p>'+ jqXHR.status +'</p>';
            errorMsg += '<p>'+ textStatus +'</p>';
            errorMsg += '<p>'+ errorThrown +'</p>';
            // $errorMain.append(errorMsg);
            // $errorMain.addClass('is-show');
        });
    },

	// 記事の評価
	savePostEnqueteAjax: function(params) {
		var defer = new $.Deferred();
        $.ajax({
            type: 'POST',
            url: '/store/post/enquete',
            data: {
                post_id: params.post_id,
				value: params.value
            },
            dataType: 'json',
            success: function(data){
                defer.resolve(data);
            },
            error: function(jqXHR, textStatus, errorThrown){
                defer.reject(jqXHR, textStatus, errorThrown);
            }
        });

        return defer.promise(this);
    },

    savePostEnquete: function($obj) {

        // 評価済みの投稿ID
        var enqansCookie = $.cookie('kh_enqans');
        var enqans = [];
        if (enqansCookie != undefined) {
            enqans = enqansCookie.split(',');
        }

        // 投稿ID
        var postId = $obj.attr('data-post-id');

		// 評価
        var enqueteValue = $obj.attr('data-enquete-value');

        var params = {};
        params.post_id = postId;
		params.value = enqueteValue;
        
        // ajax実行結果
        var promise = this.savePostEnqueteAjax(params);

        // ajax処理が成功した場合
        promise.done(function(data) {
			// 成功
            if (data.status == 'success'){
                $('.answer-enquete').each(function(i, e){
                    $(e).addClass('is-answered');
                });

                // 評価ボタン削除
                $('.evaluation_btn_area').remove();

                // 評価済み投稿IDを記録
                if ($.inArray(postId, enqans) == -1) {
                    enqans.push(postId);
                }
                $.cookie('kh_enqans', enqans, { expires: 3650, path: '/' });

                // メッセージ表示
                $('.evaluation_message').addClass('is-show').html('評価ありがとうございます');

                return true;
            }

			// エラー
			if (data.status == 'error'){

                return false;
            }

			return false;
        });

        // ajax処理が失敗した場合
        promise.fail(function(jqXHR, textStatus, errorThrown) {
            var errorMsg = '<p>'+ jqXHR.status +'</p>';
            errorMsg += '<p>'+ textStatus +'</p>';
            errorMsg += '<p>'+ errorThrown +'</p>';
            // $errorMain.append(errorMsg);
            // $errorMain.addClass('is-show');
        });
    }
};



/**
 * フロントアクション
 */
$(document).ready(function () {

    // インスタンス作成
	var frontAPI = $.extend(true, {}, FrontAPI);

	// 初期化
    frontAPI.init();

    if ($('.evaluation_btn_area').length > 0) {
        // 評価済みの投稿ID
        var enqansCookie = $.cookie('kh_enqans');
        if (enqansCookie != undefined) {
            var enqans = enqansCookie.split(',');
            var postId = $('.evaluation_btn_area').attr('data-post-id');
            if ($.inArray(postId, enqans) != -1) {
                // 評価済み
                $('.answer-enquete').each(function(i, e){
                    $(e).addClass('is-answered');
                });
                // 評価ボタン削除
                $('.evaluation_btn_area').addClass('is-hide');
                // メッセージ表示
                $('.evaluation_message').addClass('is-show-overflow').html('この記事は評価済です');
            }
        }
    }

    // 投稿のお気に入り追加　クリック
    $(document).on('click', '.add-favorite', function(){
        var $obj = $(this);
        if ($obj.hasClass('is-favorite')) {
            return false;
        }

        frontAPI.savePostFavorite($obj);

        return false;
    });

    // 投稿の評価登録　クリック
    $(document).on('click', '.answer-enquete', function(){
        var $obj = $(this);
        if ($obj.hasClass('is-answered')) {
            return false;
        }

        frontAPI.savePostEnquete($obj);
        
        return false;
    });
});
