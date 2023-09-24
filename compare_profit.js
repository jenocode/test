/** Javascript **/
$(function() {

    // Modalポイント計算
    const modalPointCalc = new bootstrap.Modal($("#modal-point-calc"));

    //  利益計算
    $("#button-profit-calc").click(function(){
        let itemPrice = parseInt($("#input-price").val()) || 0;
        let point = parseInt($("#input-point").val()) || 0;
        let sellPrice = parseInt($("#input-selling-price").val()) || 0;
        let errorMessage = $("#error-calc");
        let profitAmount = 0;
        let profitRate = 0;
        // 初期化
        errorMessage.text("");
        // 入力チェック
        if (!itemPrice){
            errorMessage.text("商品価格が0円です。");
            return false;
        }

        // 利益額
        profitAmount = sellPrice + point - itemPrice;
        $("#result-profit-amount").text(profitAmount);

        // 利益率計算
        profitRate = profitAmount / itemPrice;
        profitRate = Math.floor(profitRate * 10000) / 100;
        $("#result-profit-rate").text(profitRate);
    });

    // メモする
    $("#set-remainder").click(function(){
        let memoName = $("#input-memo-name").val().trim();
        let errorMessage = $("#error-memo");
        let addHtml = "";
        // 初期化
        errorMessage.text("");
        
        // 入力チェック
        if (memoName == "") {
            errorMessage.text("メモ名を入れてね");
            return false;
        }

        // メモ追加
        addHtml = '<ul class="list-group mb-1 appended-remainder">';
        addHtml+= '<li class="list-group-item active">';
        addHtml+= memoName;
        addHtml+= '<div class="float-right">';
        addHtml+= '<button class="btn btn-list-delete btn-secondary btn-delete-memo">';
        addHtml+= '<i class="bi bi-x-lg"></i></button>';
        addHtml+= '</div>';
        addHtml+= '</li>';
        addHtml+= '<li class="list-group-item">価格:' + $("#input-price").val();
        addHtml+= '円&nbsp;利益額:' + $("#result-profit-amount").text();
        addHtml+= '円&nbsp;利益率:' + $("#result-profit-rate").text();
        addHtml+= '%</li>';
        addHtml+= '</ul>';
       $("#block-remainder").append(addHtml);

    });

    // メモ削除
    $(document).on('click', '.appended-remainder', function(){
        $(this).remove();
    });

    // Modal ポイント計算
    $("#button-point-calc").click(function(){
        let calcMode = $('input:radio[name="point-calculation-method"]:checked').val();
        let calcPercent = $("#input-point-percent").val();
        let itemPrice = parseInt($("#input-price").val()) || 0;
        let errorMessage = $("#error-modal-point-calc");
        let getPoint = 0;
        // フォーム初期化
        errorMessage.text("");

        // 数値チェック
        if (!$.isNumeric(calcPercent)) {
            errorMessage.text("還元率を数値入力してください");
            return false;
        }
        // ポイント0％の時は処理抜け
        if (calcPercent == 0) return false;

        // 獲得ポイント計算
        switch (calcMode){
            // 税込み
            case "0":
                getPoint = itemPrice;
                break;
            // 税抜き
            case "1":
                getPoint = itemPrice / 11 * 10;
                break;
            // 100円毎
            case "2":
                getPoint = Math.floor(itemPrice / 100) * 100;
                break;
            // 200円毎
            case "3":
                getPoint = Math.floor(itemPrice / 200) * 200;
                break;
        }
        getPoint = Math.floor(getPoint * calcPercent / 100);

        // 計算結果を戻す
        $("#input-point").val(getPoint);
        modalPointCalc.hide();
//        $("#modal-point-calc").hide();

    });
});

