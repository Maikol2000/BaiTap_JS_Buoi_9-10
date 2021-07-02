

function Validator() {
    this.kiemTraRong = function(value, spanId, mess) {
        if(!value) {
            getElm(spanId).style.display = 'block'
            getElm(spanId).innerHTML = mess
            return false
        }
        getElm(spanId).innerHTML = ''
        return true
    }

    this.kiemTraChuoi = function(value, spanId, mess) {
        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$");

        if (pattern.test(value)) {
            getElm(spanId).innerHTML = '';
            return true;
        }
        getElm(spanId).style.display = 'block';
        getElm(spanId).innerHTML = mess;
        return false;
    }

    this.kiemTraDoDaiKiTu = function(value, spanId, mess, min, max) {
        if (value.length >= min && value.length <= max) {
            getElm(spanId).innerHTML = ''
            return true;
        }
        getElm(spanId).style.display = 'block';
        getElm(spanId).innerHTML = mess;
        return false;
    }

    this.kiemTraKiTuEmail = function(value, spanId, mess) {
        var filter = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

        if (filter.test(value)) {
            getElm(spanId).innerHTML = '';
            getElm(spanId).style.display = 'none'
            return true;
        }
        getElm(spanId).style.display = 'block'
        getElm(spanId).innerHTML = mess;
        return false;
    }
    this.kiemTraKyTuMK = function(value, spanId, mess) {
        var filter1 = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        // /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$/
        if(filter1.test(value)) {
            getElm(spanId).style.display = 'none'
            getElm(spanId).innerHTML = ''
            return true
        }
        getElm(spanId).style.display = 'block'
        getElm(spanId).innerHTML = mess
        return false
    }
    this.kiemTraKiTuNL = function(value, spanId, mess) {
        var filter2 = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/

        if(filter2.test(value)) {
            getElm(spanId).style.display = 'none'
            getElm(spanId).innerHTML = ''
            return true
        }
        getElm(spanId).style.display = 'block'
        getElm(spanId).innerHTML = mess
        return false
    }
    this.kiemTraLuongCB= function(value, spanId, mess) {
        var filter3 = new RegExp('^[0-9]+$');
        if(filter3.test(value)) {
            getElm(spanId).innerHTML = ''
            return true
        }
        getElm(spanId).style.display = 'block'
        getElm(spanId).innerHTML = mess
        return false
    }
    this.kiemTraDoDaiSO = function(value, spanId, mess, min, max) {
        if(value >= min && value <= max) {
            getElm(spanId).innerHTML = ''
            return true
        }
        getElm(spanId).style.display = 'block'
        getElm(spanId).innerHTML = mess
        return false
    }
    this.kiemTraOP = function(value, spanId, mess) {
        if(value === 'selectOP') {
            getElm(spanId).style.display = 'block'
            getElm(spanId).innerHTML = mess
            return false
        }
            getElm(spanId).innerHTML = ''
            return true
    }
}
