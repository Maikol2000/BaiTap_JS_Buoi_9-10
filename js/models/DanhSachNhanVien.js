function DanhSachNhanVien() {
    this.arr = [];
    this.themNhanVien = function(nhanVien) {
        this.arr.push(nhanVien)
    }
    this.timKiemNV = function(dsnv, mangTimKiem) {
    return dsnv.filter(function(arr) {
        return arr.xepLoai.toLowerCase().indexOf(mangTimKiem.toLowerCase()) !== -1;
    })
}
}

DanhSachNhanVien.prototype.timViTri = function(taiKhoanNV) {
    return this.arr.findIndex(function(item) {
        return taiKhoanNV === item.taiKhoan;
    });
}

DanhSachNhanVien.prototype.xoaNhanVien = function(taiKhoanNV) {
        var viTri = this.timViTri(taiKhoanNV);
        if (viTri !== -1) {
            this.arr.splice(viTri, 1);
        }
}
